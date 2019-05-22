'use strict';

Polymer({
    is: 'sacs-list-items',
    properties: {
        listitems: {
            type: Array,
            value: []
        },
        listtitle: {
            type: String,
            value: "Title"
        },
        datatofilter: {
            type: Array,
            value: []
        },
        label: {
            type: String,
            value: ""
        },
        dataToRender: {
            type: Array,
            value: []
        },
        value: {
            type: Object,
            value: []
        },

        observerExecute: {
            type: Boolean,
            value: false
        }

    },

    listeners: {
        'icon_click.click': '__listenerIcon'
    },
    observers: [
        'handleDataToFilter(datatofilter.*)',
        'handleListItems(listitems.*)'
    ],

    handleDataToFilter: function (data, other) {

        if (data.base.length > 0 && this.listitems.length > 0 && !this.observerExecute) {

            this.__observerDataToFilter();
        }


    },

    handleListItems: function (data) {

        if (data.base.length > 0 && this.datatofilter.length > 0 && !this.observerExecute) {

            this.__observerDataToFilter();
        }

    },

    __listenerIcon: function (e) {

        const icon = e.target;

        const container = this.$$('.container_items');

        if (container.style.display === "none") {
            container.style.display = "block";
            icon.style.transform = "rotate(360deg)";

        } else {
            container.style.display = "none";
            icon.style.transform = "rotate(180deg)";
        }

    },

    __observerDataToFilter: function () {

        this.set('observerExecute', true)

        if (this.get('value').length > 0) {
            //console.log("YA TIENE VALORES");

        }

        const filter = this.listitems.filter(obj => {
            for (let element of this.datatofilter) {
                for (let key in obj) {

                    if (key === element.type && element.id === obj[key]) {
                        return obj;
                    }
                }
            }
        });

        this.__createDataToRender(filter);

    },

    __createDataToRender: function (data) {

        this.set('value', []);


        this.__getVariants()
            .then(variants => {

                data.map(obj => {

                    const { $key } = obj;

                    for (let key in obj) {
                        if (key === this.get("label")) {

                            //filtrado de productos con variantes
                            const productsVariants = variants.filter(elem => $key === elem.id_producto);

                            //filtrado de productos sin variantes
                            const productsNoVariants = data.filter(obj => {
                                for (let variant of productsVariants) {
                                    //console.log("VATIANTES", variant)
                                    if (variant.id_producto !== obj.$key) {
                                        return obj;
                                    }
                                }

                            });


                            //Render de productos sin variantes
                            productsNoVariants.map(objNoVariant => {
                                this.push('dataToRender', objNoVariant.nombre);

                                const { categoria, costo, marca, marcaNombre, nombre, precio, proveedor, proveedorNombre, sku, $key } = objNoVariant;
                                this.push('value', {
                                    $key,
                                    categoria,
                                    costo,
                                    marca,
                                    marcaNombre,
                                    nombre,
                                    precio,
                                    proveedor,
                                    proveedorNombre,
                                    sku,
                                    status: "pendiente"
                                });
                            });


                            //Render de productos con variantes
                            productsVariants.map(objVariant => {

                                const { categoria, costo, marca, marcaNombre, nombre, precio, proveedor, proveedorNombre, sku, $key } = objVariant;

                                for (let key in objVariant) {

                                    if (key.includes("variante") && objVariant[key] !== "" && objVariant[key] !== " ") {

                                        this.push('dataToRender', `${obj.nombre} / ${objVariant[key]}`);

                                        this.push('value', {
                                            $key,
                                            categoria,
                                            costo,
                                            marca,
                                            marcaNombre,
                                            nombre,
                                            precio,
                                            proveedor,
                                            proveedorNombre,
                                            sku,
                                            status: "pendiente",
                                            variante: objVariant.$key
                                        });

                                    }
                                }

                            });



                        }
                    }


                });
            });
    },



    __getVariants: function (keyProduct) {
        const db = firebase.database().ref('/accounts/sacsretailpruebas/variantes');
       
        return db.once("value").then(snap => this.__snapshotToArray(snap));
    },

    __snapshotToArray: function (snapshot) {
        const returnArr = [];

        snapshot.forEach(function (childSnapshot) {
            const item = childSnapshot.val();
            item.$key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    },
});