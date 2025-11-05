<template>
    <v-dialog
        v-model="dialogAbonar"
        max-width="800"
        persistent
    >
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    {{abono.cliente}}
                </h4>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-between my-5">
                    <div>
                        <h4 class="card-title">Factura No. {{(abono.electronica === '0')?abono.num_factura:abono.electronica}}</h4>
                        <h5>Valor factura: {{ abono.total | currency }}</h5>
                    </div>
                    <div>
                        <h4 class="card-title">Recibo No. {{ abono.num_recibo_caja }}</h4>
                    </div>
                </div>
                
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="abono" v-model="abono.abono" @change="cambiar_estado">
                    <label class="form-check-label" for="abono" >Abono</label>
                </div>
                <div class="row">
                    <div class="col-sm form-group">
                        <label for="fecha">Fecha</label>
                        <input type="date" class="form-control" id="fecha_abono" v-model="abono.fecha">
                    </div>
                    <div class="col-sm form-group">
                        <label for="valor">Valor abono</label>
                        <input type="number" class="form-control" id="valor" v-model.number="abono.valor" :readonly="!abono.abono">
                    </div>
                    <div class="col-sm form-group" v-if="!abono.abono" >
                        <label for="retencion">Retención</label>
                        <input type="number" class="form-control" id="retencion" v-model.number="abono.retencion" readonly>
                    </div>
                    <div class="col-sm form-group" v-if="!abono.abono" >
                        <label for="Descuento">Descuento</label>
                        <input type="number" class="form-control" id="Descuento" v-model.number="abono.descuento" @blur="calcularSaldo" @focus="resetSaldo">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm form-group">
                        <label for="observaciones">Observaciones</label>
                        <textarea id="observaciones" class="form-control" v-model="abono.observacion"></textarea>
                    </div>
                </div>

                <!-- Historial de abonos -->
                <v-row justify="center">
                    <v-expansion-panels accordion>
                        <v-expansion-panel
                        >
                            <v-expansion-panel-header>Historial de abonos</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Valor</th>
                                            <th>Observacion</th>
                                            <th>Imprimir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in cobros" :key="index">
                                            <td>{{new Date(item.created_at)}}</td>
                                            <td>{{item.valor | currency}}</td>
                                            <td>{{(item.tipo)?item.tipo+' - '+item.concepto:item.observacion}}</td>
                                            <td>
                                                <a :href="'/recibo-caja/'+item.id" target="_blank">{{item.num_recibo_caja}}</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a :href="'/comprobante/'+ abono.id" v-if="abono.saldo === 0" target="_blank">Comprobante de pago</a>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-row>

                <!-- Botones -->
                <div class="d-flex justify-content-center my-10">
                    <button class="btn btn-primary mr-1" v-if="user.role_id === 1 && abono.saldo > 0" @click="saveAbono">Guardar abono</button>
                    <button class="btn btn-secondary"  @click="dialogAbonar = false">Cancelar</button>
                </div>
            </div>
        </div>
        <!-- <v-card>
            
            <v-card-text>
                <v-row v-if="user.role_id === 1">
                    <v-col cols="12" md="6">
                        <h4><strong>No. factura: </strong>{{(abono.electronica === '0')?abono.num_factura:abono.electronica}}</h4>
                    </v-col>
                    <v-col cols="12" md="6">
                        <h4>Fecha: </h4>
                        <v-text-field
                            type="date"
                            v-model="abono.fecha_abono"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <h4>Recibo de caja</h4>
                        <v-text-field
                            type="number"
                            v-model.number="abono.num_recibo_caja"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <h4>Valor</h4>
                        <v-text-field
                            type="number"
                            v-model.number="abono.valor"
                            min="0"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <h4>Descuento factura</h4>
                        <v-text-field
                            type="number"
                            v-model.number="abono.descuento"
                            min="0"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <h4>Observaciones: </h4>
                        <v-text-field
                            v-model="abono.observacion"
                        >
                        </v-text-field>
                    </v-col>

                    <v-container
                        class="px-0"
                        fluid
                    >
                        <v-checkbox
                        v-model="abono.abono"
                        label="Abono"
                        ></v-checkbox>
                    </v-container>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        {{errores}}
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-expansion-panels accordion>
                        <v-expansion-panel
                        >
                            <v-expansion-panel-header>Historial de abonos</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Valor</th>
                                            <th>Observacion</th>
                                            <th>Imprimir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in cobros" :key="index">
                                            <td>{{new Date(item.created_at)}}</td>
                                            <td>{{item.valor | currency}}</td>
                                            <td>{{(item.tipo)?item.tipo+' - '+item.concepto:item.observacion}}</td>
                                            <td>
                                                <a :href="'/recibo-caja/'+item.id" target="_blank">{{item.num_recibo_caja}}</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a :href="'/comprobante/'+ abono.id" v-if="abono.saldo === 0" target="_blank">Comprobante de pago</a>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
                <div class="text-center" v-if="loading">
                    <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                    ></v-progress-circular>
                </div>
                <div v-else>
                    <v-btn
                        v-if="user.role_id === 1 && abono.saldo > 0"
                        color="primary"
                        dark
                        @click="saveAbono"
                    >Guardar</v-btn>
                    <v-btn
                        color="secondary"
                        dark
                        @click="dialogAbonar = false"
                    >Cancelar</v-btn>
                </div>
            </v-card-actions>

        </v-card> -->
    </v-dialog>
</template>
<script>
    export default{
        
        data (){
            return{
                abono: {},
                cobros: [],
                dialogAbonar: false,
                errores: null,
                loading: false,
                user: {role_id: null}
            }
        },
        mounted() {
            
        },
        methods:{
            add(abono, user){
                this.cobros = abono.cobros
                this.abono = abono
                this.abono.abono = false;
                this.user = user
                this.dialogAbonar = true
                this.cambiar_estado()
                // console.log(abono)
            },
            calcularSaldo(){
                console.log(this.abono)
                if(this.abono.descuento > 0){
                    this.abono.valor -= this.abono.descuento
                }else{
                    this.abono.valor = this.abono.total
                    this.cambiar_estado()
                }
            },
            cambiar_estado(){
                console.log(this.abono)
                if(!this.abono.abono){
                    this.abono.valor = this.abono.valor - this.abono.retencion
                }else{
                    this.abono.valor = this.abono.valor + this.abono.retencion
                }
            },
            resetSaldo(){
                this.abono.valor = this.abono.total
                this.cambiar_estado()
                this.abono.descuento = 0
            },
            saveAbono(){
                this.loading = true
                if(this.abono.fecha === '' || (this.abono.valor === 0 && this.abono.descuento === 0)){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campos vacios'
                    });
                    this.loading = false
                    return;
                }

                if(this.abono.saldo < this.abono.valor){
                    Swal.fire({
                        icon: 'warning',
                        title: 'El valor del abono excede el saldo, revisar'
                    });
                    this.loading = false
                    return;
                }
                // this.abono.fecha = this.abono.fecha_abono;
                if(this.abono.abono) {
                    this.abono.retencion = 0;
                    this.abono.descuento = 0;
                }
                axios.post('/cobros', this.abono)
                    .then(res => {
                        console.log(res.data)
                        if(res.data.status === 'success'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Abono guardado con exito',
                                // <a :href="'/recibo-caja/'+item.id" target="_blank">{{item.num_recibo_caja}}</a>
                                html:
                                    `<a href="/recibo-caja/${res.data.abono.id}" target="_blank">Descargar recibo</a>`,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }else{
                            this.errores = res.data;
                            this.loading = false
                        }
                    })
            }
        }
    }

</script>
