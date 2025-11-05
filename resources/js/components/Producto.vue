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
                <modalproducto-component ref="modalProducto"/>
                <v-card>
                    <v-card-title>
                        <v-btn
                            color="primary"
                            dark
                            class="ma-2"
                            @click="nuevoProducto"
                        >Nuevo producto
                            <v-icon right>
                                mdi-checkbox-marked-circle
                            </v-icon>
                        </v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Buscar"
                        single-line
                        hide-details
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                    :headers="headers"
                    :items="products"
                    :search="search"
                    >
                        <template v-slot:item.producto="{item}">
                            <a :href="'/productos/'+ item.id">{{item.producto}}</a>
                        </template>
                        <template v-slot:item.acciones="{item}">
                            <v-btn
                                color="indigo"
                                dark
                                outlined
                                @click="editarProducto(item)"
                            >
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </div>
        </div>
    </v-app>
</template>
<script>
    export default {
        props: ['productos'],
        data() {
            return {
                headers: [
                    {text: 'Categoria', value: 'categoria'},
                    {text: 'Producto', value: 'producto'},
                    {text: 'Descripcion', value: 'descripcion'},
                    {text: 'Accion', value: 'acciones'},
                ],
                loader: true,
                products: [],
                search: ''
            }
        },
        mounted() {
            this.setProductos()
            // console.log(this.productos)
        },
        methods: {
            editarProducto(item){
                this.$refs.modalProducto.editProduct(item);
            },
            nuevoProducto(){
                this.$refs.modalProducto.newProduct();
            },
            setProductos(){
                this.productos.map((el) => {
                    this.products.push({
                        id: el.id,
                        categoria_id: el.categoria_id,
                        categoria: el.categorias.categoria,
                        producto: el.producto,
                        descripcion: el.descripcion,
                        imagen: el.imagen,
                        indicaciones: el.indicaciones,
                        precauciones: el.precauciones,
                        laboratorio_id: el.laboratorio_id
                    });
                });
                this.loader = false;
            }
        },
    }
</script>