<template>
    <b-modal ref="adicional-factura" no-close-on-backdrop scrollable centered hide-footer :title="factura.cliente.razon_social">
        <div class="row factura-formulario">
            <div class="col-12 factura-identificacion">
                <p>Nit. {{ factura.cliente.nit }}</p>
            </div>
            <div class="col-12 col-sm-6 factura-campo">
                <label for="factura_electronica"><strong>Fact. electronica *</strong></label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">CVL -</span>
                    </div>
                    <input
                        type="text"
                        id="factura_electronica"
                        class="form-control"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        maxlength="14"
                        required
                        aria-required="true"
                        :value="informacionAdicional.factura_electronica_numero"
                        @input="actualizarFacturaElectronica"
                    >
                </div>
            </div>
            <div class="col-12 col-sm-6 factura-campo">
                <label for="tipo_factura"><strong>Tipo de factura</strong></label>
                <b-form-select id="tipo_factura" v-model="informacionAdicional.tipo_factura" :options="tiposFactura"></b-form-select>
            </div>
            <div class="col-12 col-sm-6 factura-campo">
                <label for="forma_pago"><strong>Forma de pago</strong></label>
                <b-form-select id="forma_pago" v-model="informacionAdicional.forma_pago" :options="formaspago"></b-form-select>
            </div>
            <div class="col-12 col-sm-6 factura-campo">
                <label for="medio_pago"><strong>Medio de pago</strong></label>
                <b-form-select id="medio_pago" v-model="informacionAdicional.medio_pago" :options="mediospago"></b-form-select>
            </div>
            <div class="col-12 factura-campo">
                <label for="observaciones"><strong>Observaciones</strong></label>
                <textarea class="form-control" v-model="informacionAdicional.observaciones" id="observaciones"></textarea>
            </div>
            <div class="col-12 factura-alerta" v-if="erroresValidacion">
                <b-alert show variant="danger">
                    {{ erroresValidacion }}
                </b-alert>
            </div>
            <div class="col-12 factura-acciones">
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
                informacionAdicional: {tipo_factura: 1, forma_pago: 2, medio_pago: 1, factura_electronica_numero: ''},
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
                this.informacionAdicional.factura_electronica_numero = '';
                this.erroresValidacion = '';
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
            actualizarFacturaElectronica(event) {
                const soloNumeros = event.target.value.replace(/\D/g, '').slice(0, 14);
                this.informacionAdicional.factura_electronica_numero = soloNumeros;
                event.target.value = soloNumeros;

                if (soloNumeros) {
                    this.erroresValidacion = '';
                }
            },
            save(){
                this.saving = true;
                this.erroresValidacion = '';

                const numeroElectronico = this.informacionAdicional.factura_electronica_numero.trim();
                if (!/^\d+$/.test(numeroElectronico)) {
                    this.saving = false;
                    this.erroresValidacion = 'La factura electronica es requerida y debe contener solo numeros.';
                    return;
                }
                
                this.factura.electronica = `CVL ${numeroElectronico}`;
                this.factura.requiere_electronica_cvl = true;
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

<style scoped>
    .factura-identificacion p {
        margin-bottom: 0.85rem;
    }

    .factura-campo {
        margin-bottom: 1rem;
    }

    .factura-campo label {
        display: block;
        margin-bottom: 0.45rem;
    }

    .factura-campo .form-control,
    .factura-campo .custom-select,
    .factura-campo .input-group-text {
        height: 46px;
    }

    .factura-campo .input-group-text {
        display: flex;
        align-items: center;
        padding-right: 0.85rem;
        padding-left: 0.85rem;
    }

    .factura-campo .input-group {
        flex-wrap: nowrap;
        gap: 0.5rem;
    }

    .factura-campo .input-group-prepend {
        margin-right: 0;
    }

    .factura-campo .input-group-text,
    .factura-campo .input-group > .form-control {
        border-radius: 0.25rem;
    }

    .factura-campo textarea.form-control {
        min-height: 88px;
        height: 88px;
        resize: vertical;
    }

    .factura-alerta .alert {
        margin-bottom: 1rem;
    }

    .factura-acciones .btn {
        min-height: 48px;
    }

    @media (max-width: 575.98px) {
        .factura-campo {
            margin-bottom: 0.85rem;
        }
    }
</style>
