'use strict';

Polymer({
    is:'sacs-list-items',
    properties:{
        listItems:{
            type:Array,
            value:[]
        },
        listTitle:{
            type:String,
            value:"Title"
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
        
    }
});