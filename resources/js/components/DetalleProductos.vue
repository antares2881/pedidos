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
                <v-breadcrumbs
                    :items="itemsBreadcrumbs"
                    divider=" / "
                ></v-breadcrumbs>
                <modaldetalleproducto-component ref="modalDetalleProducto"/>
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
                        <template v-slot:item.precio="{item}">
                            {{item.precio | currency}}
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
                    {text: 'Producto', value: 'producto'},
                    {text: 'Presentacion', value: 'presentacion'},
                    {text: 'Codigo', value: 'codigo'},
                    {text: 'Precio', value: 'precio'},
                    {text: 'stock', value: 'stock'},
                    {text: 'Accion', value: 'acciones'},
                ],
                itemsBreadcrumbs: [],
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
                this.$refs.modalDetalleProducto.editProduct(item);
            },
            nuevoProducto(){
                this.$refs.modalDetalleProducto.newProduct(this.productos.id, this.productos.producto);
            },
            setProductos(){
                console.log(this.productos)
                for (let i = 0; i < this.productos.detalle.length; i++) {
                    this.products.push({
                        id: this.productos.detalle[i].id,
                        codigo: this.productos.detalle[i].codigo,
                        producto_id: this.productos.detalle[i].producto_id,
                        producto: this.productos.producto,
                        presentacione_id: this.productos.presentaciones[i].id,
                        presentacion: this.productos.presentaciones[i].presentacion,
                        precio: this.productos.detalle[i].precio,
                        stock: this.productos.detalle[i].stock,
                    });
                    
                }
                
                this.itemsBreadcrumbs = [
                    {text: 'Regresar', href: '../productos', disabled: false},
                    {text: this.productos.producto, href: 'productos', disabled: true},
                ]
                this.loader = false;
            }
        },
    }
</script>