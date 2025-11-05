<template>
    <b-modal id="modal-item" no-close-on-backdrop scrollable centered hide-footer :title="title" v-model="dialogClient" >
        <div class="row">
            <div class="col-12">
                <model-select 
                    :options="municipios"
                    v-model="cliente.municipio_id"
                    placeholder="Buscar Municipio"
                    :class="{'is-invalid': hasError('municipio_id')}"
                ></model-select>
                <div class="invalid-feedback" v-if="hasError('municipio_id')">{{ firstError('municipio_id') }}</div>
            </div>
            <div class="col-6">
                <label for="tipocliente_id">Tipo de cliente</label>
                <b-form-select id="tipocliente_id" v-model="cliente.tipocliente_id" :options="tipoClientes" :class="{'is-invalid': hasError('tipocliente_id')}"></b-form-select>
                <div class="invalid-feedback" v-if="hasError('tipocliente_id')">{{ firstError('tipocliente_id') }}</div>
            </div>
            <div class="col-4">
                <label for="nit">Nit.</label>
                <input type="number" id="nit" class="form-control" v-model.number="cliente.nit" :class="{'is-invalid': hasError('nit')}">
                <div class="invalid-feedback" v-if="hasError('nit')">{{ firstError('nit') }}</div>
            </div>
            <div class="col-2">
                <label for="dv">D.V</label>
                <input type="number" id="dv" class="form-control" v-model.number="cliente.dv" :class="{'is-invalid': hasError('dv')}">
                <div class="invalid-feedback" v-if="hasError('dv')">{{ firstError('dv') }}</div>
            </div>
            <div class="col-12">
                <label for="razon_social">Razon social</label>
                <input type="text" class="form-control" id="razon_social" v-model="cliente.razon_social" :class="{'is-invalid': hasError('razon_social')}">
                <div class="invalid-feedback" v-if="hasError('razon_social')">{{ firstError('razon_social') }}</div>
            </div>
            <div class="col-6">
                <label for="contacto_comercial">Contacto comercial</label>
                <input type="text" id="contacto_comercial" class="form-control" v-model="cliente.contacto_comercial" :class="{'is-invalid': hasError('contacto_comercial')}">
                <div class="invalid-feedback" v-if="hasError('contacto_comercial')">{{ firstError('contacto_comercial') }}</div>
            </div>
            <div class="col-6">
                <label for="direccion">Dirección</label>
                <input type="text" id="direccion" class="form-control" v-model="cliente.direccion" :class="{'is-invalid': hasError('direccion')}">
                <div class="invalid-feedback" v-if="hasError('direccion')">{{ firstError('direccion') }}</div>
            </div>
            <div class="col-6">
                <label for="telefono">Telefono</label>
                <input type="text" id="telefono" class="form-control" v-model="cliente.telefono" :class="{'is-invalid': hasError('telefono')}">
                <div class="invalid-feedback" v-if="hasError('telefono')">{{ firstError('telefono') }}</div>
            </div>
            <div class="col-6">
                <label for="email">Correo electronico</label>
                <input type="email" id="email" class="form-control" v-model="cliente.email" :class="{'is-invalid': hasError('email')}">
                <div class="invalid-feedback" v-if="hasError('email')">{{ firstError('email') }}</div>
            </div>
            <div class="col-6" v-if="editar">
                <label for="estado_id">Estado</label>
                <b-select :options="estados" v-model="cliente.estado_id" :class="{'is-invalid': hasError('estado_id')}"></b-select>
                <div class="invalid-feedback" v-if="hasError('estado_id')">{{ firstError('estado_id') }}</div>
            </div>
            <div class="col-12">                
                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="aplicaretencion" v-model="cliente.aplicaretencion">
                    <label class="form-check-label" for="aplicaretencion">Aplica retención</label>
                </div>
            </div>
            <div class="col-6">
                <button class="btn btn-outline-primary btn-block" @click="dialogClient = false" :disabled="saving">
                    <i class="fas fa-window-close mr-2"></i>Cancelar
                </button>
            </div>
            <div class="col-6">
                <button 
                    class="btn btn-warning btn-block" 
                    @click="updateCliente" 
                    v-if="editar"
                    :disabled="saving"
                >
                    <span v-if="saving">
                        <i class="fas fa-spinner fa-spin"></i> Guardando...
                    </span>
                    <span v-else>
                        <i class="far fa-save"></i> Guardar cambios
                    </span>
                </button>
                <button 
                    class="btn btn-primary btn-block" 
                    @click="saveCliente" 
                    v-else
                    :disabled="saving"
                >
                    <span v-if="saving">
                        <i class="fas fa-spinner fa-spin"></i> Creando...
                    </span>
                    <span v-else>
                        <i class="far fa-save"></i> Crear cliente
                    </span>
                </button>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import { ModelSelect } from 'vue-search-select';
    export default {
        data() {
            return {
                cliente: {},
                cliente_id: null,
                editar: false,
                saving: false,
                erroresCliente: {}, // ahora objeto con errores por campo
                estados: [
                    {text: 'Activo', value: 9},
                    {text: 'Inactivo', value: 10},
                ],
                dialogClient: false,
                municipios: [],
                tipoClientes: [
                    {value: 1, text: 'Indirecto'},
                    {value: 2, text: 'Directo'}
                ],
                title: null
            }
        },
        methods: {
            hasError(field){
                return !!(this.erroresCliente && this.erroresCliente[field] && this.erroresCliente[field].length);
            },
            firstError(field){
                return this.hasError(field) ? this.erroresCliente[field][0] : null;
            },
            editCliente(item){
                this.title = 'Editar cliente';
                this.editar = true;
                this.saving = false;
                this.erroresCliente = {};
                this.getMunicipios();
                this.cliente = Object.assign({}, item);
                this.cliente.aplicaretencion = (item.aplicaretencion === 1) ? true : false;                
                this.dialogClient = true;
            },
            getMunicipios(){
                axios.get('/municipios')
                    .then(res => {
                        this.municipios = [];
                        // console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            this.municipios.push({
                                value: res.data[i].id,
                                text: res.data[i].mcpio +' - '+res.data[i].departamentos.nombre_dpto
                            });                         
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            newCliente(){
                this.title = 'Nuevo cliente';
                this.editar = false;
                this.saving = false;
                this.erroresCliente = {};
                this.getMunicipios();
                this.cliente = {};
                this.dialogClient = true;
            },
            saveCliente(){
                this.saving = true;
                this.erroresCliente = {};
                
                console.log(this.cliente)
                axios.post('/clientes', this.cliente)
                    .then(res => {
                        this.saving = false;
                        if(res.data.id){
                            this.$emit('cliente_id', res.data)
                            this.dialogClient = false;
                        }else{
                            // backend puede devolver errors o directamente un objeto con mensajes
                            this.erroresCliente = res.data.errors || res.data || {};
                        }
                    })
                    .catch(err => {
                        this.saving = false;
                        // captura validación 422 de Laravel
                        if (err.response && err.response.status === 422) {
                            this.erroresCliente = err.response.data.errors || {};
                        } else {
                            console.log(err)
                        }
                    })
            },
            updateCliente(){
                this.saving = true;
                this.erroresCliente = {};
                
                axios.put(`/clientes/${this.cliente.id}`, this.cliente)
                    .then(res => {
                        this.saving = false;
                        if (res.data === 'ok') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Cliente actualizado',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })     
                        } else {
                            this.erroresCliente = res.data.errors || res.data || {};
                        }
                    })
                    .catch(err => {
                        this.saving = false;
                        if (err.response && err.response.status === 422) {
                            this.erroresCliente = err.response.data.errors || {};
                        } else {
                            console.log(err)
                        }
                    })
            },
        },
        components:{
            ModelSelect
        }
    }
</script>