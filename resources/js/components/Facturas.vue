<template>
    <div class="text-center" >
        <v-dialog
            v-model="dialogFactura"
            width="900"
            persistent
        >
            <v-card
            id="factura">
                <v-card-title>

                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="12">
                            <h3><strong>{{datosCliente.razon_social}}</strong></h3>
                            <h4><strong>Nit: </strong>{{datosCliente.nit}} - {{datosCliente.dv}}</h4>
                            <h6>{{datosCliente.municipios.mcpio}} - {{datosCliente.departamentos.nombre_dpto}}</h6>
                            <h6><strong>Direccion: </strong>{{datosCliente.direccion}}</h6>
                            <h6><strong>Telefono: </strong>{{datosCliente.telefono}}</h6>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-container
                                class="px-0"
                                fluid
                            >
                                <v-checkbox
                                v-model="datosFactura.fact_electronic"
                                label="Electronica"
                                ></v-checkbox>
                            </v-container>                            
                            
                        </v-col>
                        <v-col cols="12" md="6" v-if="datosFactura.fact_electronic">
                            <h6><strong>Electronica: </strong></h6>
                            <v-text-field
                                type="text"
                                v-model="datosFactura.electronica"
                            ></v-text-field>  
                        </v-col>
                        <v-col cols="12" md="6">                           
                            <h6><strong>No. Factura: </strong></h6>
                            <v-text-field
                                type="number"
                                v-model="datosFactura.numero_factura"
                            ></v-text-field>                            
                            <p class="text-danger">{{erroresValidacion.numero_factura}}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <h6 for="">Tipo factura</h6>
                            <v-select
                                v-model="datosFactura.tipofactura_id"
                                :items="tiposFactura"
                            ></v-select>
                            <p class="text-danger">{{erroresValidacion.tipofactura_id}}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <h6>Forma de pago</h6>
                            <v-select
                                v-model="datosFactura.formapago_id"
                                :items="formaspago"
                            ></v-select>
                            <p class="text-danger">{{erroresValidacion.formapago_id}}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <h6>Medio de pago</h6>
                            <v-select
                                v-model="datosFactura.mediopago_id"
                                :items="mediospago"
                            ></v-select>
                            <p class="text-danger">{{erroresValidacion.mediopago_id}}</p>
                        </v-col>
                        <v-col cols="12" md="6">
                            <h6>No. de rotulos</h6>
                            <v-text-field type="number" v-model.number="datosFactura.rotulos"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Producto
                                </th>
                                <th class="text-left">
                                    Cantidad
                                </th>
                                <th class="text-left">
                                    Bon.
                                </th>
                                <th class="text-left">
                                    Vl. Unitario
                                </th>
                                <th class="text-left">
                                    Vl. Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                            v-for="item in datosFactura.pedidos"
                            :key="item.id"
                            >
                                <td>{{ item.producto }}</td>
                                <td>{{ item.cantidad }}</td>
                                <td>{{ item.bonifica }}</td>
                                <td>{{ item.precio | currency}}</td>
                                <td>{{ item.total | currency}}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                    <v-row class="mt-3">
                        <v-col cols="12" md="6" v-if="datosFactura.total > 980000 && datosCliente.aplicaretencion === 1">
                            <h6>Retencion</h6>
                            <v-select
                                :items="retenciones"
                                label="Elija retencion"
                                v-model="datosFactura.calidad_retenedor"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            md="12"
                        >
                            <v-textarea
                            v-model="datosFactura.observaciones"
                            label="Observaciones"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-container
                        class="px-0"
                        fluid
                    >
                        <v-checkbox
                        v-model="datosFactura.checkbox"
                        label="Afectar inventario"
                        ></v-checkbox>
                    </v-container>
                    <h4><strong>Total factura: </strong>{{datosFactura.total | currency}}</h4>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="guardarFactura"
                        dark
                    >Facturar</v-btn>
                    <v-btn
                        color="secondary"
                        dark
                        @click="dialogFactura = false"
                    >Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                contadorErrores: 0,
                dialogFactura: false,
                datosCliente: {municipios: {}, departamentos: {}},
                datosFactura: {mayoristas: {}, productos: [], formapago_id: '', mediopago_id: '', numero_factura: '', fecha_vencimiento: '', fecha_factura: '', hora_factura: '', checkbox: true, fact_electronic: false, calidad_retenedor:0
                },
                erroresValidacion: {numero_factura: '', fecha_factura: ''},
                mediospago: [
                    {text: 'Efectivo', value: 1 },
                    {text: 'Tarjeta debito', value: 2 },
                    {text: 'Tarjeta de credito', value: 3 },
                    {text: 'Transferencia electronica', value: 4 },
                ],
                formaspago: [
                    {text: 'Contado', value: 1},
                    {text: 'Credito', value: 2}
                ],
                retenciones: [2.5, 3.5],
                tiposFactura: [
                    {text: 'Factura de venta nacional', value: 1},
                    {text: 'Factura de exportacion', value: 2},
                    {text: 'Factura de contingencia', value: 3},
                    {text: 'Nota credito', value: 4},
                    {text: 'Nota debito', value: 5},
                    {text: 'ZIP', value: 6},
                ]
            }
        },
        mounted() {
            
        },
        methods: {
            baseRetenciones(anio){
                axios.get('/baseretenciones/'+anio)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
            },  
            confirmFactura(item){

                console.log(item)
                this.datosFactura = Object.assign({}, item);
                this.datosFactura.tipofactura_id = 1
                this.datosFactura.rotulos = 1
                axios.get(`/clientes/${item.cliente_id}`)
                    .then(res => {
                        this.datosCliente = Object.assign({}, res.data)
                        this.numFactura();
                        this.dialogFactura = true;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            
            guardarFactura(){

                this.validaciones();
                if(this.contadorErrores > 0)return;
                Swal.showLoading();
                this.datosFactura.valor = this.datosFactura.total
                this.datosFactura.numero_transferencia = this.datosFactura.numero
                axios.post('/facturas', this.datosFactura)
                    .then(res => {
                        console.log(res.data)
                        if(typeof res.data === 'number'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Factura guardada con exito',
                                html:
                                    `<a href="/imprimir-factura/${res.data}/${this.datosFactura.rotulos}" target="_blank">Descargar Factura</a>`,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }else{
                            this.erroresValidacion = res.data
                        }
                    })
            },
            numFactura(){
                axios.get('/num-factura')
                    .then(res => {
                        this.datosFactura.numero_factura = parseInt(res.data[0].numero) + 1;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            validaciones(){
                this.erroresValidacion = {};
                if (this.datosFactura.numero_factura === '') {
                    this.erroresValidacion.numero_factura = 'El numero de factura es obligatorio'
                    this.contadorErrores ++;
                }
                if (this.datosFactura.formapago_id === '') {
                    this.erroresValidacion.formapago_id = 'La forma de pago es obligatoria'
                    this.contadorErrores ++;
                }
                if (this.datosFactura.mediopago_id === '') {
                    this.erroresValidacion.mediopago_id = 'El medio de pago es obligatorio'
                    this.contadorErrores ++;
                }

            }
        },
    }
</script>
