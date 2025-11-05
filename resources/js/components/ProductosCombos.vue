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
            <div v-else>
                <template>
                    <v-dialog
                    v-model="dialog"
                    max-width="700"
                    >                    
                    <v-card>
                        <v-card-title class="headline">
                            <h4>Productos: </h4>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">                                    
                                    <basic-select :options="productos"
                                        placeholder="Buscar producto"
                                        :selected-option="item"
                                        @select="selectedOption"
                                    ></basic-select> 
                                </v-col>
                                <v-col cols="12">
                                    {{error}}
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            dark
                            @click="dialog = false"
                        >
                            Cerrar
                        </v-btn>
                        <v-btn
                            color="primary"
                            dark
                            @click="saveProducto"
                        >
                            Agregar
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </template>
                <template>
                    <v-card>
                        <v-card-title>
                            <v-btn
                                color="primary"
                                dark
                                @click="newProducto"
                            >
                                NUevo producto combo
                            </v-btn>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Filtrar"
                            single-line
                            hide-details
                        ></v-text-field>
                        </v-card-title>
                        <v-data-table
                        :headers="headers"
                        :items="productoscombos"
                        :search="search"
                        ></v-data-table>
                    </v-card>
                </template>                
            </div>
        </div>
    </v-app>
</template>
<script>
    import { BasicSelect, ModelSelect } from 'vue-search-select';
    export default {
        data() {
            return {
                dialog: false,
                error: '',
                headers: [
                    {text: 'Producto', value: 'producto'},
                    {text: 'Presentacion', value: 'presentacion'},
                ],
                item: {
                    value: '',
                    text: ''
                },
                loader: true,
                producto: {},
                productos: [],
                productoscombos: [],
                search: ''
            }
        },
        mounted() {
            this.getProductoscombo()
        },
        methods: {
            getProductos(){
                axios.get('/detalleproductos')
                    .then(res => {
                        // console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            this.productos.push({
                                value: res.data[i].id,
                                text: res.data[i].productos.producto +' - '+  res.data[i].presentaciones.presentacion,
                                producto: res.data[i].productos.producto,
                                presentacion: res.data[i].presentaciones.presentacion,
                                precio: res.data[i].precio,
                                stock: res.data[i].stock
                            });                            
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            newProducto(){
                
                this.getProductos();
                this.dialog = true;
            },
            getProductoscombo(){
                axios.get('/productos-combo')
                    .then(res => {
                        for (let i = 0; i < res.data.length; i++) {
                            this.productoscombos.push({
                                producto: res.data[i].productos.producto,
                                presentacion: res.data[i].presentaciones.presentacion
                            })
                        }
                        this.loader = false;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            saveProducto(){
                this.producto.detalleproducto_id = this.item.value;

                if(this.producto.detalleproducto_id === ''){
                    Swal.fire({
                        icon: 'warning',
                        title: 'El campo producto esta vacio'
                    });
                    return;
                }
                axios.post('/productos-combo', this.producto)
                    .then(res => {
                        if(res.data === 'ok'){
                            this.productoscombos.unshift(this.item);                    
                            this.item = {value: '', text: ''};
                            this.dialog = false;
                        }else{
                            this.error = res.data;
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            selectedOption(item){  
                this.error = '';              
                this.item = item;
            }
        },
        components: {
            BasicSelect,
            ModelSelect
        }
    }
</script>