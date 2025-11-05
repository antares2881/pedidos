<template>
    <b-modal ref="abonosCobros" no-close-on-backdrop scrollable centered hide-footer title="Historial de pagos" size="xl">
        <div class="text-center">

            <h6>{{ factura.cliente }}</h6>
            <p>{{ factura.factura }} ({{ factura.total | currency }})</p>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Recibo</th>
                        <th>Saldo</th>
                        <th>Abono</th>
                        <th>Retención</th>
                        <th>Descuento</th>
                        <th>NC</th>
                        <th>Pendiente</th>
                        <th>Observacion</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, index in historial" :key="index">
                        <td>{{ item.num_recibo_caja }}</td>
                        <td>{{ item.saldo | currency }}</td>
                        <td>{{ (factura.tipo_cliente === 1) ? item.valor  : item.valor_abono | currency }}</td>
                        <td>{{ item.retencion | currency }}</td>
                        <td>{{ item.descuento | currency }}</td>
                        <td>{{ item.valor_nota | currency }}</td>
                        <td>{{ item.pendiente | currency }}</td>
                        <td>{{ item.observacion }}</td>
                        <td>{{ item.fecha }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </b-modal>
</template>
<script>
    export default {
        data(){
            return{
                factura: {},
                historial: []
            }
        },
        methods: {
            getHistorialPagos(tipo_cliente, data){

                this.factura.cliente = data.cliente;
                this.factura.factura = (data.electronica == 0)? data.numero_factura : data.electronica;
                this.factura.total = (tipo_cliente === 1) ? data.total : data.total_factura;
                this.factura.tipo_cliente = tipo_cliente;

                const url = (tipo_cliente === 1) ? `cobros/${data.id}` : `abonos/${data.id}`;
                axios.get(url)
                    .then(res => {
                        // console.log(res.data)
                        this.historial = res.data;
                        this.$refs['abonosCobros'].show();
                    })
                    .catch(err => console.log(err))
            }
        },
    }
</script>