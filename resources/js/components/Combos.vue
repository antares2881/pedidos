<template>
    <v-app>
         <div class="container-fluid  dashboard-content">
            <div class="row" v-if="loader">
                <div class="offset-5 col-md-6 col-sm-12">
                    <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
                </div>
            </div>
            <div class="row" v-else>
                <div class="col-md-6 col-sm-12">
                    <div class="card">
                        <h5 class="card-header">Productos</h5>
                        <div class="card-body border-top">
                            <div class="col-md-12">
                                <h4>Combo</h4>
                                <basic-select
                                    :options="productos"
                                    :selected-option="item"
                                    @select="selected"
                                ></basic-select>
                            </div>
                            <div class="col-md-12">
                                <h4>Productos</h4>
                                <multi-select :options="productosCombos"
                                    :selected-options="items"
                                    placeholder="Seleccionar productos"
                                    @select="onSelect">
                                </multi-select>
                            </div>
                            <div class="col-md-12">
                                <v-btn
                                    color="primary"
                                    dark
                                    @click="saveCombo"
                                >Guardar combo</v-btn>
                            </div>
                        </div>
                        <p>{{error}}</p>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="card">
                        <h5 class="card-header">Combos</h5>
                        <div class="card-body border-top">
                            <template>
                                <v-card>
                                    <v-card-title>
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Search"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                    </v-card-title>
                                    <v-data-table
                                    :headers="headers"
                                    :items="combos"
                                    :search="search"
                                    >
                                        <template v-slot:item.productos="{item}">
                                            <p v-for="(i, index) in item.productos" :key="index">{{i.text}}</p>
                                        </template>
                                    </v-data-table>
                                </v-card>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </v-app>
</template>
<script>
    import { MultiSelect, BasicSelect } from 'vue-search-select'
    export default {
        data() {
            return {
                combos: [],
                error: '',
                headers: [
                    {text: 'Combo', value: 'combo'},
                    {text: 'Productos', value: 'productos'}
                ],
                item: {
                    value: '',
                    text: ''
                },
                items: [],
                lastSelectItem: {},
                loader: true,
                posicionProdcutoDetalleCombo: 0,
                productos: [],
                productosCombos: [],
                productosDetalleCombo: [],
                search: ''
            }
        },
        mounted() {
            this.getCombos()
            this.getProductos()
            this.getProductosCombos()
        },
        methods: {
            getCombos(){
                axios.get('/combos')
                    .then(res => {
                        console.log(res.data)
                        let j = -1;
                        for (let i = 0; i < res.data.length; i++) {                            
                                                        
                            if(i > 0 && res.data[i].detalleproducto_id === res.data[j].detalleproducto_id){                                
                                // this.combos[0].productos.push(this.productosDetalleCombo)
                            }else{
                                this.combos.push({
                                    combo: res.data[i].producto+' - '+res.data[i].presentacion,
                                    productos: this.productosDetalleCombo
                                });  
                            }

                                /* this.productosDetalleCombo[this.posicionProdcutoDetalleCombo] = {
                                    text: res.data[i].nombre_producto+' - '+res.data[i].presentacion_producto
                                }; */
                            j++;

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getProductos(){
                axios.get('/detalleproductos')
                    .then(res => {
                        // console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].productos.categoria_id === 6) {
                                this.productos.push({
                                    value: res.data[i].id,
                                    text: res.data[i].productos.producto +' - '+  res.data[i].presentaciones.presentacion
                                });   
                            }
                        }
                        this.loader = false;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getProductosCombos(){
                axios.get('/productos-combo')
                    .then(res => {
                        // console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            this.productosCombos.push({
                                value: res.data[i].id,
                                text: res.data[i].productos.producto +' - '+res.data[i].presentaciones.presentacion
                            })
                        }
                        this.loader = false;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onSelect (items, lastSelectItem) {
                this.items = items
                this.lastSelectItem = lastSelectItem
            },
            saveCombo(){
                if(this.item.detalleproducto_id === ''){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atencion',
                        text: 'Debes elegir el combo'
                    });
                    return;
                }
                if(this.items.length < 2){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atencion',
                        text: 'Debe elegir minimo 2 productos'
                    });
                    return;
                }
                this.item.items = this.items;
                axios.post('/combos', this.item)
                    .then(res => {
                        if(res.data === 'ok'){
                            this.combos.unshift({                                
                                combo: this.item.text,
                                productos: this.items
                            })
                            this.item = {}
                            this.items = [];
                            this.lastSelectItem = {};
                        }else{
                            this.error = res.data
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            selected(item){
                this.item = item;
                this.item.detalleproducto_id = item.value;
            }
        },
        components:{
            MultiSelect,
            BasicSelect
        }
    }
</script>