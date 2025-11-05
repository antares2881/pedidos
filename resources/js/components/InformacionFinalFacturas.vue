<template>
    <b-modal ref="adicional-factura" no-close-on-backdrop scrollable centered hide-footer :title="factura.cliente.razon_social">
        <div class="row">
            <div class="col-12">
                <p>Nit. {{ factura.cliente.nit }}</p>
            </div>
            <div class="col-sm-6 col-6">
                <label for="fecha"><strong>Fact. electronica</strong></label>
                <input type="text" id="fecha" class="form-control"  v-model="informacionAdicional.factura_electronica">
            </div>
            <div class="col-sm-6 col-6">
                <label for="tipo_factura"><strong>Tipo de factura</strong></label>
                <b-form-select id="tipo_factura" v-model="informacionAdicional.tipo_factura" :options="tiposFactura" class="mb-3"></b-form-select>
            </div>
            <div class="col-sm-6 col-6">
                <label for="forma_pago"><strong>Forma de pago</strong></label>
                <b-form-select id="forma_pago" v-model="informacionAdicional.forma_pago" :options="formaspago" class="mb-3"></b-form-select>
            </div>
            <div class="col-sm-6 col-6">
                <label for="medio_pago"><strong>Medio de pago</strong></label>
                <b-form-select id="medio_pago" v-model="informacionAdicional.medio_pago" :options="mediospago" class="mb-3"></b-form-select>
            </div>
            <div class="col-12">
                <label for="observaciones"><strong>Observaciones</strong></label>
                <textarea class="form-control" v-model="informacionAdicional.observaciones" id="observaciones"></textarea>
            </div>
            <div class="col-12" v-if="erroresValidacion">
                <b-alert show variant="danger">
                    {{ erroresValidacion }}
                </b-alert>
            </div>
            <div class="col-12">
                <!-- <a href="#" class="btn btn-danger btn-block"><i class="fas fa-file-pdf"></i> Visualizar factura</a> -->
                <button 
                    class="btn btn-primary btn-block" 
                    @click="save" 
                    :disabled="saving"
                >
                    <span v-if="saving">
                        <i class="fas fa-spinner fa-spin"></i> Guardando...
                    </span>
                    <span v-else>
                        <i class="fas fa-save"></i> Guardar
                    </span>
                </button>
            </div>
        </div>
    </b-modal>
</template>
<script>
    export default {
        data() {
            return {
                erroresValidacion: '',
                saving: false,
                factura: {cliente: {razon_social: null, nit: null}},
                formaspago: [
                    {text: 'Contado', value: 1},
                    {text: 'Credito', value: 2}
                ],
                informacionAdicional: {tipo_factura: 1, forma_pago: 2, medio_pago: 1, factura_electronica: 0},
                mediospago: [
                    {text: 'Efectivo', value: 1 },
                    {text: 'Tarjeta debito', value: 2 },
                    {text: 'Tarjeta de credito', value: 3 },
                    {text: 'Transferencia electronica', value: 4 },
                ],
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
        methods: {
            facturar(item) {
                console.log(item)
                // this.factura = Object.assign({}, item);
                this.factura = {
                    cliente: {
                        razon_social: item.datos.cliente.text, nit: item.datos.nit
                    },
                    cliente_id: item.datos.cliente.value,
                    numero_factura: item.datos.num_factura + 1,
                    numero_transferencia: parseInt(item.datos.numero),
                    valor: item.total,
                    pedidos: item.productos
                }
                this.ordenarProductos();
                this.$refs['adicional-factura'].show();
            },
            ordenarProductos() {
                this.factura.pedidos.sort((a, b) => {
                    const nameA = a.producto.toUpperCase(); 
                    const nameB = b.producto.toUpperCase(); 
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
            },
            save(){
                this.saving = true;
                this.erroresValidacion = '';
                
                this.factura.electronica = this.informacionAdicional.factura_electronica;
                this.factura.formapago_id = this.informacionAdicional.forma_pago;
                this.factura.mediopago_id = this.informacionAdicional.medio_pago;
                this.factura.tipofactura_id = this.informacionAdicional.tipo_factura;
                this.factura.observaciones = this.informacionAdicional.observaciones;
                this.ordenarProductos();
                
                axios.post('/facturas', this.factura)
                    .then(res => {
                        this.saving = false;
                        console.log(res.data)
                        if(typeof res.data === 'number'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Factura guardada con éxito',
                                html:
                                    `<a href="/imprimir-factura/${res.data}" target="_blank">Descargar Factura</a>`,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    window.location.href = '/gestionar-indirectos';
                                }
                            })
                        }else{
                            this.erroresValidacion = res.data
                        }
                    })
                    .catch(error => {
                        this.saving = false;
                        console.error('Error al guardar factura:', error);
                        this.erroresValidacion = 'Error al guardar la factura. Por favor, inténtelo de nuevo.';
                    })
            }
        },
    }
</script>