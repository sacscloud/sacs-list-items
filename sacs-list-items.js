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
            value:[],
            observer:"__observerDataToFilter",
            reflectToAttribute:true
        },
        label:{
            type:String,
            value:"aaa"
        },
        dataToRender:{
            type:Array,
            value:[]
        }

    },

    listeners:{
        'icon_click.click':'__listenerIcon'
    },

    __listenerIcon: function(e){
        console.log("Dando click", e.target);

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

          //console.log("FILTER",filter);

    },

    __createDataToRender: function(data){

        data.map( obj => {
            for( let key in obj){
               if(key === this.label) {
                   this.push('dataToRender', obj[key])
               }
            }
        });
    }
});