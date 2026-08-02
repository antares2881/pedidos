<template>
    <b-modal
        ref="abonosCobros"
        no-close-on-backdrop
        scrollable
        centered
        hide-footer
        title="Historial de pagos"
        size="xl"
        modal-class="payment-history-modal"
        dialog-class="payment-history-dialog"
    >
        <div class="text-center payment-history-content">

            <h6>{{ factura.cliente }}</h6>
            <p>{{ factura.factura }} ({{ factura.total | currency }})</p>
            <div class="payment-history-table-wrapper">
                <table class="table table-sm payment-history-table">
                <thead>
                    <tr>
                        <th>Recibo</th>
                        <th>Saldo</th>
                        <th>Abono</th>
                        <th>Retención</th>
                        <th>Descuento</th>
                        <th>NC</th>
                        <th>Pendiente</th>
                        <th class="payment-history-observation">Observaci&oacute;n</th>
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
                        <td class="payment-history-observation">{{ item.observacion }}</td>
                        <td>{{ item.fecha }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
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

<style>
.payment-history-modal .payment-history-dialog {
    width: 94vw !important;
    max-width: 1500px !important;
    margin-left: auto !important;
    margin-right: auto !important;
}

.payment-history-modal .modal-content,
.payment-history-modal .modal-body,
.payment-history-content {
    min-width: 0;
    max-width: 100%;
}

.payment-history-modal .modal-body {
    padding: 1.75rem 2rem 2rem;
    overflow-x: hidden;
}

.payment-history-table-wrapper {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    border-radius: 0.75rem;
    -webkit-overflow-scrolling: touch;
}

.payment-history-table {
    width: 100%;
    min-width: 1050px;
    margin-bottom: 0;
    table-layout: fixed;
}

.payment-history-table th,
.payment-history-table td {
    padding: 1rem 0.75rem;
    vertical-align: middle;
    white-space: normal;
    overflow-wrap: anywhere;
}

.payment-history-table th:not(.payment-history-observation),
.payment-history-table td:not(.payment-history-observation) {
    white-space: nowrap;
}

.payment-history-table .payment-history-observation {
    width: 24%;
    min-width: 220px;
    text-align: left;
}

.payment-history-table th:last-child,
.payment-history-table td:last-child {
    width: 120px;
}

@media (max-width: 767.98px) {
    .payment-history-modal .payment-history-dialog {
        width: calc(100vw - 1rem) !important;
        max-width: calc(100vw - 1rem) !important;
        margin: 0.5rem auto !important;
        height: auto !important;
    }

    .payment-history-modal .modal-content {
        height: auto !important;
        max-height: calc(100vh - 1rem);
    }

    .payment-history-modal .modal-body {
        padding: 1rem;
    }
}
</style>
