<template>
    <v-app>
        <div class="nota-container">     
            <div v-if="errores.length > 0" class="alert-container">
                <div class="alert alert-danger professional-alert">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    {{ errores }}
                </div>
            </div>
            
            <items-component :esNota="true" @guardar="crearNota">
                <template #title>Agregar nota</template>
                <template #opcionesExtras>
                    
                        <div class="fields-container">
                            <div class="row">
                                <div class="col-12 col-md-4 mb-4">
                                    <div class="form-group-modern">
                                        <label for="tipofactura_id" class="form-label-modern">Tipo</label>
                                        <div class="input-group-modern">
                                            <b-select 
                                                :options="tiponotas" 
                                                v-model="nota.tipofactura_id" 
                                                id="tipofactura_id" 
                                                @input="getConsecutivo"
                                                class="modern-select"
                                            ></b-select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4 mb-4">
                                    <div class="form-group-modern">
                                        <label for="numero" class="form-label-modern">No. Nota</label>
                                        <div class="input-group-modern">
                                            <input 
                                                type="number" 
                                                class="form-control modern-input" 
                                                id="numero" 
                                                v-model="nota.numero"
                                                placeholder="Número de nota"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4 mb-4">
                                    <div class="form-group-modern">
                                        <label for="fecha" class="form-label-modern">Fecha</label>
                                        <div class="input-group-modern">
                                            <input 
                                                type="date" 
                                                id="fecha" 
                                                class="form-control modern-input" 
                                                v-model="nota.fecha"
                                            >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12" v-if="errores">
                                    <div class="alert alert-danger professional-alert">
                                        <i class="fas fa-exclamation-circle mr-2"></i>
                                        {{ errores }}
                                    </div>
                                </div>
                            </div>
                        </div>
                </template>
            </items-component>
            
        </div>
    </v-app>
</template>
<script>
    export default {
        data(){
            return{
                errores: '',
                nota: {referencia: 'Sin referencia', esDebito: false, numero_referencia: null, fecha_referencia: null, numero: null},
                tiponotas: [
                    {text: 'NC', value: 4},
                    {text: 'Otra', value: 5},
                ],
            }
        },
        mounted() {
            this.nota.fecha = this.formatingDate(new Date());
        },
        methods: {
            formatingDate(dateToFormat) {
                const d = new Date(dateToFormat);
                const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
                const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const year = d.getFullYear();
                return `${year}-${month}-${day}`;
            },
            crearNota(nota){
                // Probar guardado.
                Swal.showLoading();
                this.nota.cliente_id = nota.cliente_id;
                this.nota.tipo_factura = nota.tipo_factura;
                this.nota.valor_nota = nota.valor_nota;
                this.nota.numero_referencia = nota.numero_referencia;
                this.nota.fecha_referencia = nota.fecha_referencia;
                this.nota.razon_referencia = nota.razon_referencia;
                this.nota.productos = nota.pedidos;
                // console.log(this.nota);
                axios.post('/notas', this.nota)
                    .then(res => {
                        Swal.hideLoading();
                        if(res.data.code === 200){
                            Swal.fire({
                                icon: 'success',
                                title: 'Nota creada con exito',
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
                        }
                    })
                    .catch(err => console.log(err))
            },
            getConsecutivo(){
                axios.get(`consecutivo-nota/${this.nota.tipofactura_id}`)
                    .then(res => {
                        
                        this.nota.numero = parseInt(res.data[0].consecutivo) + 1;
                    })
                    .catch(err => console.log(err))
            }
        },
    }
</script>

<style scoped>
/* Container principal */
.nota-container {
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
}

/* Alertas profesionales */
.alert-container {
    margin-bottom: 20px;
}

.professional-alert {
    border-radius: 12px;
    border: none;
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.15);
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
    color: #721c24;
    font-weight: 500;
    padding: 15px 20px;
}

.professional-alert i {
    color: #dc3545;
}

/* Card de opciones */
.nota-options-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.03);
    border: 1px solid rgba(255,255,255,0.8);
    position: relative;
    overflow: hidden;
}

/* Contenedor de campos con margen superior */
.fields-container {
    margin-top: 20px;
}

.nota-options-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #17a2b8 0%, #138496 50%, #f093fb 100%);
}

/* Grupos de formulario modernos */
.form-group-modern {
    margin-bottom: 0;
}

.form-label-modern {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 12px;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: block;
}

.input-group-modern {
    position: relative;
    display: flex;
    align-items: center;
}

/* Inputs modernos */
.modern-input {
    border-radius: 8px;
    border: 2px solid #e9ecef;
    padding: 14px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    height: 48px;
    width: 100%;
}

.modern-input:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), inset 0 2px 4px rgba(0,0,0,0.05);
    outline: none;
    background: #ffffff;
}

.modern-input:hover {
    border-color: #ced4da;
}

/* Select moderno */
.modern-select {
    border-radius: 8px;
    border: 2px solid #e9ecef;
    padding: 14px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    width: 100%;
    height: 48px;
}

.modern-select:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), inset 0 2px 4px rgba(0,0,0,0.05);
    outline: none;
    background: #ffffff;
}

/* Espaciado personalizado */
.row {
    margin-left: -15px;
    margin-right: -15px;
}

.row > [class*="col-"] {
    padding-left: 15px;
    padding-right: 15px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .nota-container {
        padding: 15px;
    }
    
    .nota-options-card {
        padding: 20px 15px;
        margin-bottom: 20px;
    }
    
    .fields-container {
        margin-top: 15px;
    }
    
    .form-group-modern {
        margin-bottom: 0;
    }
    
    .modern-input,
    .modern-select {
        padding: 12px;
        font-size: 0.85rem;
        height: 44px;
    }
    
    .col-12.col-md-4.mb-4 {
        margin-bottom: 20px !important;
    }
}

/* Animation for form elements */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.form-group-modern {
    animation: fadeInUp 0.6s ease-out;
}

.form-group-modern:nth-child(1) { animation-delay: 0.1s; }
.form-group-modern:nth-child(2) { animation-delay: 0.2s; }
.form-group-modern:nth-child(3) { animation-delay: 0.3s; }
</style>
