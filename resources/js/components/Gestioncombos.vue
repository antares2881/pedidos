<template>
    <v-app>
        <div class="container-fluid  dashboard-content">
            <v-row>
                <v-col cols="12" md="6">
                    <h4>Combo: </h4>
                    <basic-select
                        :options="productos"
                        :selected-option="item"
                        @select="selected"
                    ></basic-select>
                </v-col>  
            </v-row>
            <div v-if="loader">
                <v-row>
                    <v-col cols="12" md="6">
                        <div class="offset-5 col-md-6 col-sm-12">
                            <v-progress-circular
                            :size="70"
                            :width="7"
                            color="primary"
                            indeterminate
                            ></v-progress-circular>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <v-row>
                    <v-col cols="12" md="6">
                        <h4>Stock combo: </h4><p>{{producto.stockCombo}}</p>
                    </v-col>          
                </v-row>
                <v-row>
                    <v-col cols="12" md="3">                        
                        <h4>Cantidad</h4>
                        <v-text-field 
                            type="number" 
                            v-model.number="producto.cantidad"
                        ></v-text-field>
                    </v-col>   
                </v-row>
                <template>
                    <v-container
                        class="px-0"
                        fluid
                    >
                        <v-checkbox
                        v-model="producto.checkbox"
                        label="Repartir combo"
                        ></v-checkbox>
                    </v-container>
                </template>
                <v-row>
                    <v-col cols="12">
                        <v-btn
                            :color="producto.checkbox?'indigo':'primary'"
                            dark
                            @click="save"
                        >
                            {{(producto.checkbox)?'Repartir combo':'Armar combo'}}
                            <v-icon right>
                                mdi-content-save
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
    </v-app>
</template>
<script>
    import { BasicSelect } from 'vue-search-select'
    export default {
        data() {
            return {
                combo: {},
                item: {
                    text: '',
                    value: ''
                },
                loader: false,
                producto: {cantidad: 0, cantidadMaxima: 0, combo: '', productos: [], checkbox: false, stockCombo: 0},
                productos: [],
                productosCombo: [],
                
            }
        },
        mounted() {
            this.getCombos()
        },
        methods: {
            getCombos(){
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
            save(){
                // console.log(this.producto)
                if(this.producto.cantidadMaxima === 0 && !this.producto.checkbox){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atencion',
                        text: 'La cantidad en stock debe ser mayor a 0',
                    })
                    return;
                }
                if(this.producto.cantidad > this.producto.cantidadMaxima && !this.producto.checkbox){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atencion',
                        text: 'La cantidad no puede exceder el stock de los productos',
                    })
                    return;
                }

                if(this.producto.cantidad > this.producto.stockCombo && this.producto.checkbox){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atencion',
                        text: 'La cantidad no puede exceder el stock de los combos',
                    })
                    return;
                }

                let url;
                if(this.producto.checkbox) url = '/dividir-combo'
                if(!this.producto.checkbox) url = '/armar-combo'

                axios.post(`${url}`, this.producto)
                    .then(res => {
                        if(res.data === 'ok'){
                             Swal.fire({
                                icon:'success',
                                title: 'La gestion del combo fue exitosa',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Ooppss.',
                                text: 'No se pudo completar la accion, comunicate con el administrador del sistema'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })

            },
            selected(item){

                this.loader = true;
                this.item = item;
                this.producto.combo = item.value;

                axios.get(`/combos/${item.value}`)
                    .then(res => {   
                        
                        this.producto.stockCombo = res.data[0].detalle.stock;                        

                        res.data.sort(function(a,b){
                            if (a.detalleproductos.stock > b.detalleproductos.stock) {
                                return 1;
                            }
                            if (a.detalleproductos.stock < b.detalleproductos.stock) {
                                return -1;
                            }
                            // a must be equal to b
                            return 0;
                        })

                        res.data.map((el) => {
                            this.producto.productos.push({
                                id: el.detalleproductos.id,
                                stock: el.detalleproductos.stock
                            });
                        });

                        this.producto.cantidad = res.data[0].detalleproductos.stock;
                        this.producto.cantidadMaxima = res.data[0].detalleproductos.stock;

                        this.loader = false;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        components:{
            BasicSelect
        }
    }
</script>