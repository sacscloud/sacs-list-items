'use strict';

Polymer({
    is:'sacs-list-items',
    properties:{
        listitems:{
            type:Array,
            value:[]
        },
        listtitle:{
            type:String,
            value:"Title"
        },
        datatofilter:{
            type:Array,
            value:[]
        },
        label:{
            type:String,
            value:""
        },
        dataToRender:{
            type:Array,
            value:[]
        }

    },

    listeners:{
        'icon_click.click':'__listenerIcon'
    },
    observers:[
        'handleDataToFilter(datatofilter.*)',
        'handleListItems(listitems.*)'
    ],

    handleDataToFilter: function(data){
       
        if(data.base.length > 0 && this.listitems.length > 0){
            this.__observerDataToFilter();
        }
    
        
    },
    handleListItems:function(data){
 
        if(data.base.length > 0 && this.datatofilter.length > 0){
            this.__observerDataToFilter();
        }
        
    },

    __listenerIcon: function(e){

        const icon = e.target;
        
        const container = this.$$('.container_items');
         
        if(container.style.display === "none"){
            container.style.display = "block";
            icon.style.transform = "rotate(360deg)";
          
        }else{
            container.style.display = "none";
            icon.style.transform = "rotate(180deg)";
        }
        
    },

    __observerDataToFilter: function (){

          const filter = this.listitems.filter( obj => {
             for( let element of this.datatofilter){
                 for( let key in obj){

                     if(key === element.type && element.id === obj[key]){
                         return obj;
                     }
                 }
             }
          });

          this.__createDataToRender(filter);

    },

    __createDataToRender: function(data){

        this.debounce('action', ()=>{
            this.set('dataToRender',[]);
            data.map( obj => {
                for( let key in obj){
                   if(key === this.get("label")) {
                       this.push('dataToRender', obj[key])
                   }
                }
            });

        }, 1000)
  
    }
});