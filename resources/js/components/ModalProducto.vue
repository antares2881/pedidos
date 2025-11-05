<template>
    <b-modal id="modal-item" no-close-on-backdrop scrollable centered hide-footer :title="titleModal" v-model="dialogProductos" >
        <div class="row">
            <div class="col-12">
                <label for="producto">Nombre del producto</label>
                <input 
                    type="text" 
                    id="producto" 
                    class="form-control" 
                    v-model="producto.producto"
                    :class="{ 'is-invalid': hasError('producto') }"
                    @input="clearError('producto')"
                >
                <div v-if="hasError('producto')" class="invalid-feedback">
                    {{ firstError('producto') }}
                </div>
            </div>
            <div class="col-6">
                <label for="laboratorio_id">Laboratorio</label>
                <b-form-select 
                    v-model="producto.laboratorio_id" 
                    id="laboratorio_id" 
                    :options="laboratorios"
                    :class="{ 'is-invalid': hasError('laboratorio_id') }"
                    @change="clearError('laboratorio_id')"
                ></b-form-select>
                <div v-if="hasError('laboratorio_id')" class="invalid-feedback">
                    {{ firstError('laboratorio_id') }}
                </div>
            </div>
            <div class="col-6">
                <label for="categoria_id">Categoria</label>
                <b-form-select 
                    v-model="producto.categoria_id" 
                    id="categoria_id" 
                    :options="categorias"
                    :class="{ 'is-invalid': hasError('categoria_id') }"
                    @change="clearError('categoria_id')"
                ></b-form-select>
                <div v-if="hasError('categoria_id')" class="invalid-feedback">
                    {{ firstError('categoria_id') }}
                </div>
            </div>
            <div class="col-12">
                <label for="descripcion">Descripción del producto</label>
                <textarea 
                    id="descripcion" 
                    class="form-control" 
                    v-model="producto.descripcion"
                    :class="{ 'is-invalid': hasError('descripcion') }"
                    @input="clearError('descripcion')"
                ></textarea>
                <div v-if="hasError('descripcion')" class="invalid-feedback">
                    {{ firstError('descripcion') }}
                </div>
            </div>
            <div class="col-12">
                <label for="indicaciones">Indicaciones</label>
                <input 
                    type="text" 
                    id="indicaciones" 
                    class="form-control" 
                    v-model="producto.indicaciones"
                    :class="{ 'is-invalid': hasError('indicaciones') }"
                    @input="clearError('indicaciones')"
                >
                <div v-if="hasError('indicaciones')" class="invalid-feedback">
                    {{ firstError('indicaciones') }}
                </div>
            </div>
            <div class="col-12">
                <label for="precauciones">Precauciones</label>
                <input 
                    type="text" 
                    id="precauciones" 
                    class="form-control" 
                    v-model="producto.precauciones"
                    :class="{ 'is-invalid': hasError('precauciones') }"
                    @input="clearError('precauciones')"
                >
                <div v-if="hasError('precauciones')" class="invalid-feedback">
                    {{ firstError('precauciones') }}
                </div>
            </div>
            <div class="col-12" v-if="hasError('general')">
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        <li v-for="error in validationErrors.general" :key="error">{{ error }}</li>
                    </ul>
                </div>
            </div>
            <div class="col-12">
                <button 
                    class="btn btn-secondary btn-block" 
                    @click="updateProducto" 
                    v-if="showSelectComposicion"
                    :disabled="saving"
                >
                    <span v-if="saving">
                        <i class="fas fa-spinner fa-spin"></i> Guardando...
                    </span>
                    <span v-else>
                        <i class="far fa-save"></i> Actualizar producto
                    </span>
                </button>
                <button 
                    class="btn btn-primary btn-block" 
                    @click="saveProducto" 
                    v-else
                    :disabled="saving"
                >
                    <span v-if="saving">
                        <i class="fas fa-spinner fa-spin"></i> Guardando...
                    </span>
                    <span v-else>
                        <i class="far fa-save"></i> Guardar producto
                    </span>
                </button>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import {ModelSelect} from 'vue-search-select'
    export default {
        data() {
            return {
                categorias: [],
                composiciones: [],
                dialogProductos: false,
                errorValidacionProducto: false,
                saving: false,
                validationErrors: {},
                laboratorios: [],
                producto: {id: '', categoria_id: '', composicion: '', composicione_id: '', producto: '', descripcion: '', indicaciones: '', administracion: '', precauciones: '', imagen: ''},
                showSelectComposicion: false,
                titleModal: '',
                variableVacia: []
            }
        },
        mounted() {
            this.getCategorias();
            this.getLaboratorios();
        },
        methods: {
            close(){
                this.dialogProductos = false;
                this.$nextTick(() => {
                    this.producto = {id: '', categoria_id: '', composicion: '', composicione_id: '', producto: '', descripcion: '', indicaciones: '', administracion: '', precauciones: '', imagen: ''};
                    this.variableVacia = [];
                    this.errorValidacionProducto = false;
                    this.saving = false;
                    this.validationErrors = {};
                })
            },
            editProduct(item){
                this.producto = Object.assign({}, item);
                this.dialogProductos = true;
                this.titleModal = 'Editar producto';
                this.showSelectComposicion = true;
            },
            getCategorias(){
                axios.get('/categorias')
                    .then(res => {
                        res.data.map((el) => {
                            this.categorias.push({
                                text: el.categoria,
                                value: el.id
                            });
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getLaboratorios(){
               
                axios.get('/laboratorios')
                    .then(res => {
                        // console.log(res.data)
                        res.data.map((el) => {
                            this.laboratorios.push({
                                text: el.Laboratorio,
                                value: el.id
                            });
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            newProduct(){
                this.showSelectComposicion = false;
                this.dialogProductos = true;
                this.titleModal = 'Nuevo producto';
            },
            saveProducto(){
                this.saving = true;
                this.errorValidacionProducto = false;

                if (!this.validarFormProducto()) {
                    this.saving = false;
                    return;
                }

                axios.post('/productos', this.producto)
                    .then(res => {
                        this.saving = false;
                        if(res.data === 'ok'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Guardado',
                                text: 'El producto fue agregado con éxito',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }else{
                            // Manejar errores del servidor
                            if (Array.isArray(res.data) && res.data.length > 0) {
                                this.$set(this.validationErrors, 'general', res.data);
                            }
                        }
                    })
                    .catch(error => {
                        this.saving = false;
                        if (error.response && error.response.status === 422) {
                            this.validationErrors = error.response.data.errors;
                        } else {
                            this.$set(this.validationErrors, 'general', ['Error al guardar el producto. Por favor, inténtelo de nuevo.']);
                        }
                    })
            },
            updateProducto(){
                this.saving = true;
                this.errorValidacionProducto = false;

                if (!this.validarFormProducto()) {
                    this.saving = false;
                    return;
                }

                axios.put(`/productos/${this.producto.producto_id}`, this.producto)
                    .then(res => {
                        this.saving = false;
                        if(res.data === 'ok'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Modificado',
                                text: 'El producto fue modificado con éxito',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })
                        }else{
                            // Manejar errores del servidor
                            if (Array.isArray(res.data) && res.data.length > 0) {
                                this.$set(this.validationErrors, 'general', res.data);
                            }
                        }
                    })
                    .catch(error => {
                        this.saving = false;
                        if (error.response && error.response.status === 422) {
                            this.validationErrors = error.response.data.errors;
                        } else {
                            this.$set(this.validationErrors, 'general', ['Error al actualizar el producto. Por favor, inténtelo de nuevo.']);
                        }
                    })
            },
            validarFormProducto(){
                this.variableVacia = [];
                this.validationErrors = {};
                
                if(this.producto.categoria_id === '' || this.producto.categoria_id === null){
                    this.$set(this.validationErrors, 'categoria_id', ['La categoría del producto es requerida']);
                }
                if(this.producto.producto === '' || this.producto.producto === null){
                    this.$set(this.validationErrors, 'producto', ['El nombre del producto es requerido']);
                }
                if(this.producto.descripcion === '' || this.producto.descripcion === null){
                    this.$set(this.validationErrors, 'descripcion', ['La descripción del producto es requerida']);
                }
                
                // Verificar si hay errores
                const hasErrors = Object.keys(this.validationErrors).some(key => 
                    this.validationErrors[key] && this.validationErrors[key].length > 0
                );
                
                return !hasErrors;
            },
            hasError(field) {
                return this.validationErrors[field] && this.validationErrors[field].length > 0;
            },
            firstError(field) {
                return this.hasError(field) ? this.validationErrors[field][0] : '';
            },
            clearError(field) {
                if (this.validationErrors[field]) {
                    this.$set(this.validationErrors, field, []);
                }
            }
        },
        watch: {
            dialogProductos (val) {
                val || this.close()
            }
        },
        components:{
            ModelSelect
        }
    }
</script>
<style >
    div.v-dialog__content.v-dialog__content--active{
        top: 30px;
    }
</style>