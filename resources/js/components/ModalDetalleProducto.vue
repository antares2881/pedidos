<template>
    <div class="text-center">
        <v-dialog
            v-model="dialogProductos"
            width="800"
            content-class="dialog-producto"
            persistent
        >
            <v-card>
                <v-card-title class="headline">
                    <h4>{{producto.producto}}</h4>
                </v-card-title>

                <v-card-text>
                    
                    <v-row>
                        <v-alert
                            dense
                            outlined
                            type="error"
                            v-if="errorValidacionProducto"
                            >{{variableVacia}}
                        </v-alert>
                        <v-col cols="12" md="12">
                            <h5>Presentacion</h5>
                            <model-select
                                :options="presentaciones"
                                v-model="producto.presentacione_id"
                                placeholder="Presentacion"
                            ></model-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="producto.codigo"
                                label="Codigo del producto"
                                ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                type="number"
                                v-model.number="producto.precio"
                                label="Precio"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-text-field
                                type="number"
                                v-model.number="producto.stock"
                                label="Stock"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="secondary"
                        @click="dialogProductos = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="primary"
                        dark
                        @click="updateProducto"
                        v-if="btnEdit"
                    >
                        Actualizar
                    </v-btn>
                    <v-btn
                        color="indigo"
                        dark
                        @click="saveProducto"
                        v-else
                    >
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
            
        </v-dialog>
    </div>
</template>
<script>
    import {ModelSelect} from 'vue-search-select'
    export default {
        data() {
            return {
                btnEdit: false,                
                dialogProductos: false,
                errorValidacionProducto: false,
                presentaciones: [],
                producto: {id: '', producto_id: '', producto: '', presentacione_id: '', codigo: '', precio: '', stock: ''},
                variableVacia: []
            }
        },
        mounted() {
            this.getPresentaciones();
        },
        methods: {
            close(){
                this.dialogProductos = false;
                this.$nextTick(() => {
                    this.producto = {};
                    this.variableVacia = [];
                    this.errorValidacionProducto = false;
                })                
            },
            editProduct(item){
                console.log(item)
                this.producto = Object.assign({}, item);
                this.dialogProductos = true;
                this.btnEdit = true;
            },
            getPresentaciones(){
                axios.get('/presentaciones')
                    .then(res => {
                        res.data.map((el) => {
                            this.presentaciones.push({
                                text: el.presentacion,
                                value: el.id
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            newProduct(id, producto){
                this.producto.producto_id = id;
                this.producto.producto = producto;
                this.dialogProductos = true;
                this.btnEdit = false;
            },
            saveProducto(){
                this.errorValidacionProducto = false;
                this.validarFormProducto();
                if (this.variableVacia.length > 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos vacios'
                    })
                    this.errorValidacionProducto = true;
                    return;
                }

                axios.post('/detalle-productos', this.producto)
                    .then(res => {
                        if(res.data === 'ok'){
                            Swal.fire({
                                icon:'success',
                                title: 'El producto fue agregado',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                            this.close();
                        }else{
                            this.errorValidacionProducto = true;
                            this.variableVacia = res.data;
                        }
                    })
            },
            updateProducto(){
                this.errorValidacionProducto = false;
                this.validarFormProducto();
                if (this.variableVacia.length > 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos vacios'
                    })
                    this.errorValidacionProducto = true;
                    return;
                }

                axios.put(`/detalle-productos/${this.producto.id}`, this.producto)
                    .then(res => {
                        if(res.data === 'ok'){
                            Swal.fire({
                                icon:'success',
                                title: 'El producto fue actualizado', 
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                            this.close();
                        }else{
                            this.errorValidacionProducto = true;
                            this.variableVacia = res.data;
                        }
                    })
            },
            validarFormProducto(){
                this.variableVacia = [];
                if(this.producto.presentacione_id === ''){
                    this.variableVacia.push('La presentacion del producto es requerida')                    
                }
                if(this.producto.codigo === ''){
                    this.variableVacia.push('El codigo del producto es requerido')
                }
                if(this.producto.precio === ''){
                    this.variableVacia.push('El precio del producto es requerido')
                }
                if(this.producto.stock === ''){
                    this.variableVacia.push('El stock del producto es requerido')
                }
            }
        },
        watch: {
            dialogProductos (val) {
                val || this.close()
            }
        },
        components:{
            ModelSelect
        }
    }
</script>
<style >
    div.v-dialog__content.v-dialog__content--active{
        top: 30px;
    }
</style>