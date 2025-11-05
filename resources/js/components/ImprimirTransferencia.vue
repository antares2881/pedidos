<template>
    <div>
        <v-dialog
            v-model="dialogTransferencia"
            max-width="900px"
            >
            <v-card>
                <v-card-title class="headline">
                    <v-row>
                        <v-col cols="12" md="8">
                            Transferencia No. {{transferencia.numero}}
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-btn
                                outlined
                                color="indigo"
                                small
                                v-if="transferencia.factura !== null"
                            >
                                <a :href="'/imprimir-factura/' + transferencia.factura.id " target="_blank" style="text-decoration:none;">Imprimir fac No. {{transferencia.factura.numero_factura}}
                                    <v-icon>
                                        mdi-printer
                                    </v-icon>
                                </a>
                            </v-btn>
                        </v-col>
                    </v-row>
                        
                </v-card-title>

                <v-card-text>
                    <h4>{{transferencia.cliente}}</h4>
                    <p><strong>Nit: </strong>{{`${transferencia.nit} - ${transferencia.dv}`}}</p>
                    <p>Fecha: {{transferencia.fecha}}</p>
                    <template>
                        <v-simple-table width="100%">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Producto
                                        </th>
                                        <th class="text-left">
                                            Cant.
                                        </th>
                                        <th class="text-left">
                                            Entregados.
                                        </th>
                                        <th class="text-left">
                                            Bonificacion.
                                        </th>
                                        <th class="text-left">
                                            V. Unit
                                        </th>
                                        <th class="text-left" width="20%">
                                            V. Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in detalleProductos" :key="index">
                                        <td>{{item.producto}}</td>
                                        <td>{{item.cantidad}}</td>
                                        <td>{{item.entregados}}</td>
                                        <td>{{item.bonifica}}</td>
                                        <td>{{item.precio | currency}}</td>
                                        <td>{{item.total | currency}}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template> 
                    <v-row class="mt-3">
                        <v-col
                            cols="12"
                            md="12"
                        >
                            <h4><Strong>Total pedido</Strong></h4>{{transferencia.valor | currency}}
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>                
                <a :href="'/imprimir-transferencia/' + transferencia.id" class="btn btn-success mr-2 text-white" target="_blank">Imprimir</a>
                <a :href="'/imprimir-remision/' + transferencia.factura.id" class="btn btn-danger mr-2 text-white" target="_blank" v-if="transferencia.factura !== null">Remision</a>
                <button class="btn btn-secondary" @click="dialogTransferencia = false">Cerrar</button>
                </v-card-actions>
            </v-card>
        </v-dialog>  
    </div>   
</template>
<script>
    export default {
        data() {
            return {
                detalleProductos: [],                
                dialogTransferencia: false,
                transferencia: {factura: {id: null, numero_factura: null}}
            }
        },
        mounted() {
        },
        methods: {
            showTransferencia(item){
                this.detalleProductos = [];
                this.transferencia = Object.assign({}, item);
                // console.log(this.transferencia)
                axios.get(`/producto-transferencias/${item.id}`)
                    .then(res => {
                        console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            
                            // let vUnit = (res.data[i].detalleproductos.precio*0.17) + res.data[i].detalleproductos.precio;
                            let vUnit = res.data[i].precio;
                            let vTotal = res.data[i].cantidad * vUnit;

                           this.detalleProductos.push({
                               producto: res.data[i].productos.producto+' - '+res.data[i].presentaciones.presentacion,
                               cantidad: res.data[i].cantidad,
                               bonifica: res.data[i].bonificacion,
                               entregados: res.data[i].entregados+' ('+res.data[i].observacion+')',
                               precio: vUnit,
                               total: vTotal
                           })
                        }
                        // Swal.hideLoading() 
                        this.dialogTransferencia = true;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
    }
</script>