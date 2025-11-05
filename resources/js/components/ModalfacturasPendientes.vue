<template>
    <b-modal ref="facturasClientes" no-close-on-backdrop centered hide-footer scrollable title="Facturas pendientes x cliente" size="lg">
        <div class="row">
            <div class="col-md-6">
                <label for="tiposfactura">Buscar en:</label>
                <b-select :options="tiposfactura" v-model="factura.tiposfactura"></b-select>
            </div>
            <div class="col-12">
                <div class="btn btn-success" @click="buscarFacturas"><i class="fas fa-search"></i> Buscar</div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Factura</th>
                            <th>Fecha</th>
                            <th>Valor</th>
                            <th>Pagado</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item, index in facturas" :key="index">
                            <td>
                                <b-form-checkbox
                                    :id="'id'+index"
                                    :value="item"
                                    @input="selectFactura(index)"
                                    ></b-form-checkbox>
                            </td>
                            <td>{{ (item.electronica == 0) ? item.numero_factura : item.electronica }}</td>
                            <td>{{ item.fecha_factura }}</td>
                            <td>{{ item.total_factura | currency}}</td>
                            <td>{{ item.pagado | currency}}</td>
                            <td>{{ item.total_factura - item.pagado | currency}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-12" v-if="mensaje">
                <b-alert show variant="danger">No hay facturas asocidas.</b-alert>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import { ModelSelect } from 'vue-search-select';
    export default {
        data(){
            return{
                nota: {},
                factura: {},
                facturas: [],
                mensaje: false,
                registrarAbono: null,
                tiposfactura: [
                    {text: 'Facturas CVL', value: 1},
                    {text: 'Ventas', value: 2},
                ]
            }
        },
        mounted() {
        },
        methods: {            
            
            buscarFacturas(){
                if(this.factura.cliente_id === null || this.factura.cliente_id === undefined || this.factura.cliente_id === ''){
                    Swal.fire({
                        title: 'Atención',
                        text: 'Debe elegir un cliente',
                        icon: 'warning'
                    })
                    return;
                }
                if(this.factura.tiposfactura === null || this.factura.tiposfactura === undefined || this.factura.tiposfactura === ''){
                    Swal.fire({
                        title: 'Atención',
                        text: 'Debe elegir en donde buscar la factura',
                        icon: 'warning'
                    })
                    return;
                }
                this.facturas = [];
                if(this.factura.tiposfactura === 1){
                    this.facturasCVL();
                }else{
                    this.facturasVentas();
                }                
            },
            facturasCVL(){
                axios.get(`/facturas-indirectos-consaldo/${this.factura.cliente_id}`)
                    .then(res => {
                        if(res.data.length > 0){
                            this.llenarFacturas(res.data, 1);
                        }
                    })
                    .catch(err => console.log(err))
            },
            facturasVentas(){
                axios.get(`/facturas-directos-consaldo/${this.factura.cliente_id}`)
                    .then(res => {
                        if(res.data.length > 0){
                            this.llenarFacturas(res.data, 2);
                        }
                        
                    })
                    .catch(err => console.log(err))
            },
            llenarFacturas(items, tipo_factura){
                for (let i = 0; i < items.length; i++) {
                    this.facturas.push({
                        aplicaretencion: items[i].aplicaretencion,
                        descuento: items[i].descuento,
                        estado: items[i].estado,
                        estado_id: items[i].estado_id,
                        fecha_factura: items[i].fecha_factura,
                        id: items[i].id,
                        numero_factura: items[i].numero_factura,
                        electronica: (tipo_factura === 1) ? items[i].electronica : 0,
                        pagado: items[i].pagado,
                        razon_social: items[i].razon_social,
                        total_factura: items[i].total_factura,
                        tipo_factura: tipo_factura
                    });
                }
            },
            mostrarModalFacturas(cliente){
                // console.log(cliente)
                this.facturas = [];
                this.factura = {};
                this.factura.cliente_id = cliente;
                this.$refs['facturasClientes'].show();
            },
            selectFactura(index){

                this.nota.cliente = this.facturas[index].razon_social;
                this.nota.tipo_factura = this.facturas[index].tipo_factura;

                let saldo = this.facturas[index].total_factura - this.facturas[index].pagado;                

                this.nota.numero_factura = this.facturas[index].numero_factura;
                this.nota.electronica = this.facturas[index].electronica;
                this.nota.fecha_factura = this.facturas[index].fecha_factura;
                this.nota.id_factura = this.facturas[index].id;
                this.nota.saldo = saldo;
                this.$refs['facturasClientes'].hide();
                this.$emit('seleccionar', this.nota);
            }
        },        
        components: {
            ModelSelect
        }
    }
</script>