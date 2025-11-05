<template>
    <b-modal id="modal-item" no-close-on-backdrop scrollable centered hide-footer :title="titleModal" v-model="dialogProductos" >
        <div class="row">
            <div class="col-12" v-if="!edit">
                <label for="tipolista_id"><strong>Tipo de lista</strong> <i class="fas fa-info-circle text-primary" data-toggle="tooltip" data-placement="top" title="Elija la lista para el item afectado."></i></label>
                <select id="tipolista_id" class="form-control" :class="{ 'is-invalid': hasError('tipolista_id') }" v-model="producto.tipolista_id" @change="clearError('tipolista_id')">
                    <option value="">Seleccione tipo de lista</option>
                    <option :value="item.id" v-for="item, index in listaPrecios" :key="index">{{ item.tipo_lista }}</option>
                </select>
                <div v-if="hasError('tipolista_id')" class="invalid-feedback">
                    {{ firstError('tipolista_id') }}
                </div>
            </div>
            <div class="col-6" v-if="!edit">
                <label for="producto_id"><strong>Asociar a producto</strong> <i class="fas fa-info-circle text-primary" data-toggle="tooltip" data-placement="top" title="Elija un producto existente."></i></label>
                <model-select
                    :options="productos"
                    v-model="producto.producto_id"
                    placeholder="Producto"
                    :class="{ 'is-invalid': hasError('producto_id') }"
                    @input="clearError('producto_id')"
                ></model-select>
                <div v-if="hasError('producto_id')" class="invalid-feedback d-block">
                    {{ firstError('producto_id') }}
                </div>
            </div>
            <div class="col-6" v-if="!edit">
                <label for="presentacione_id"><strong>Presentación</strong> <i class="fas fa-info-circle text-primary" data-toggle="tooltip" data-placement="top" title="Elija la presentación del item a crear."></i></label>
                <model-select
                    :options="presentaciones"
                    v-model="producto.presentacione_id"
                    placeholder="Presentacion"
                    :class="{ 'is-invalid': hasError('presentacione_id') }"
                    @input="clearError('presentacione_id')"
                ></model-select>
                <div v-if="hasError('presentacione_id')" class="invalid-feedback d-block">
                    {{ firstError('presentacione_id') }}
                </div>
            </div>
            <div class="col-12 text-center" v-if="edit">
                <h6>{{ producto.producto }}</h6>
                <p>{{ producto.presentacion }}</p>
            </div>
            <div class="col-6">
                <label for="codigo"><strong>Codigo</strong></label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="codigo" 
                    v-model="producto.codigo" 
                    :readonly="edit"
                    :class="{ 'is-invalid': hasError('codigo') }"
                    @input="clearError('codigo')"
                >
                <div v-if="hasError('codigo')" class="invalid-feedback">
                    {{ firstError('codigo') }}
                </div>
            </div>
            <div class="col-6">
                <label for="fecha_vence"><strong>Fecha de vencimiento</strong></label>
                <input 
                    type="date" 
                    class="form-control" 
                    id="fecha_vence" 
                    v-model="producto.fecha_vence"
                    :class="{ 'is-invalid': hasError('fecha_vence') }"
                    @input="clearError('fecha_vence')"
                >
                <div v-if="hasError('fecha_vence')" class="invalid-feedback">
                    {{ firstError('fecha_vence') }}
                </div>
            </div>
            <div class="col-4">
                <label for="precio"><strong>Precio</strong></label>
                <input 
                    type="number" 
                    class="form-control" 
                    id="precio" 
                    v-model.number="producto.precio"
                    :class="{ 'is-invalid': hasError('precio') }"
                    @input="clearError('precio')"
                >
                <div v-if="hasError('precio')" class="invalid-feedback">
                    {{ firstError('precio') }}
                </div>
            </div>
            <div class="col-4">
                <label for="impuesto"><strong>Impuesto</strong></label>
                <input 
                    type="number" 
                    class="form-control" 
                    id="impuesto" 
                    v-model.number="producto.impuesto"
                    :class="{ 'is-invalid': hasError('impuesto') }"
                    @input="clearError('impuesto')"
                >
                <div v-if="hasError('impuesto')" class="invalid-feedback">
                    {{ firstError('impuesto') }}
                </div>
            </div>
            <div class="col-4">
                <label for="stock"><strong>Stock</strong></label>
                <input 
                    type="number" 
                    class="form-control" 
                    id="stock" 
                    v-model.number="producto.stock"
                    :class="{ 'is-invalid': hasError('stock') }"
                    @input="clearError('stock')"
                >
                <div v-if="hasError('stock')" class="invalid-feedback">
                    {{ firstError('stock') }}
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
                    @click="updateItem" 
                    v-if="edit"
                    :disabled="saving"
                >
                    <span v-if="saving">
                        <i class="fas fa-spinner fa-spin"></i> Guardando...
                    </span>
                    <span v-else>
                        <i class="far fa-save"></i> Editar item
                    </span>
                </button>
                <button 
                    class="btn btn-primary btn-block" 
                    @click="saveItem" 
                    v-else
                    :disabled="saving"
                >
                    <span v-if="saving">
                        <i class="fas fa-spinner fa-spin"></i> Guardando...
                    </span>
                    <span v-else>
                        <i class="far fa-save"></i> Crear item
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
                edit: false,
                errorValidacionProducto: false,
                saving: false,
                validationErrors: {},
                laboratorios: [],
                listaPrecios: [],
                producto: {id: '', categoria_id: '', composicion: '', composicione_id: '', producto: '', descripcion: '', indicaciones: '', administracion: '', precauciones: '', imagen: '', tipolista_id: null, producto_id: null, presentacione_id: null, codigo: null, fecha_vence: null, precio: 0, impuesto: 0.00, stock: 0},
                presentaciones: [],
                productos: [],
                showSelectComposicion: false,
                titleModal: '',
                variableVacia: []
            }
        },
        mounted() {
            this.getCategorias();
            this.getLaboratorios();
            this.getProductos();
            this.getPresentaciones();
        },
        methods: {
            close(){
                this.dialogProductos = false;
                this.$nextTick(() => {
                    this.producto = {id: '', categoria_id: '', composicion: '', composicione_id: '', producto: '', descripcion: '', indicaciones: '', administracion: '', precauciones: '', imagen: '', tipolista_id: null, producto_id: null, presentacione_id: null, codigo: null, fecha_vence: null, precio: 0, impuesto: 0.00, stock: 0};
                    this.variableVacia = [];
                    this.errorValidacionProducto = false;
                    this.saving = false;
                    this.validationErrors = {};
                })
            },
            editProduct(item, listas){
                this.edit = true
                this.listaPrecios = listas
                this.producto = Object.assign({}, item);
                this.dialogProductos = true;
                this.titleModal = 'Editar Item';
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
            getPresentaciones(){
                axios.get('/presentaciones')
                    .then(res => {
                        res.data.map((el) => {
                            this.presentaciones.push({
                                text: el.presentacion,
                                value: el.id
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            getProductos(){
                axios.get('/productos')
                .then(res => {
                        res.data.map((el) => {
                            this.productos.push({
                                text: el.producto,
                                value: el.id
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            newProduct(listas){
                this.edit = false;
                this.listaPrecios = listas
                this.showSelectComposicion = false;
                this.dialogProductos = true;
                this.titleModal = 'Nuevo Item';
            },
            saveItem(){
                this.saving = true;
                this.errorValidacionProducto = false;

                if (!this.validarFormProducto()) {
                    this.saving = false;
                    return;
                }

                axios.post('/new-item', this.producto)
                    .then(res => {
                        this.saving = false;
                        if(res.data.length > 0){
                            Swal.fire({
                                icon: 'success',
                                title: 'Guardado',
                                text: 'El item fue agregado con exito',
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
                            this.$set(this.validationErrors, 'general', ['Error al guardar el item. Por favor, inténtelo de nuevo.']);
                        }
                    })
            },
            updateItem(){
                this.saving = true;
                this.errorValidacionProducto = false;

                if (!this.validarFormProducto()) {
                    this.saving = false;
                    return;
                }

                axios.put(`/update-item/${this.producto.codigo}`, this.producto)
                    .then(res => {
                        this.saving = false;
                        if(res.data === 'ok'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Modificado',
                                text: 'El item fue modificado con exito',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    this.dialogProductos = false;
                                    this.$emit('updateItems', this.producto)
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
                            this.$set(this.validationErrors, 'general', ['Error al actualizar el item. Por favor, inténtelo de nuevo.']);
                        }
                    })
            },
            validarFormProducto(){
                this.variableVacia = [];
                this.validationErrors = {};
                
                if(this.producto.tipolista_id === null){
                    this.$set(this.validationErrors, 'tipolista_id', ['Debe elegir la lista para crear un nuevo item']);
                }
                if(this.producto.producto_id === null){
                    this.$set(this.validationErrors, 'producto_id', ['Debe asociar un producto existente']);
                }
                if(this.producto.presentacione_id === null){
                    this.$set(this.validationErrors, 'presentacione_id', ['Elija la presentación del producto']);
                }
                if(this.producto.codigo === null || this.producto.codigo === "" || this.producto.codigo === undefined){
                    this.$set(this.validationErrors, 'codigo', ['El código del item no es válido']);
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