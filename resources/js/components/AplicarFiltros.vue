<template>
    <b-modal v-model="modalFiltrar" no-close-on-backdrop scrollable centered hide-footer title="Opciones de Filtrado">
        <div class="filtros-container">
            <h6 class="filtros-title">Selecciona el tipo de registros a mostrar:</h6>
            
            <div class="opciones-grupo">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="inlineRadio1" name="filtroOpciones" v-model="selectedOption" value="canceladas">
                    <label class="form-check-label" for="inlineRadio1">
                        <span class="option-icon">❌</span>
                        {{ opcion1 }}
                    </label>
                </div>
                
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="inlineRadio2" name="filtroOpciones" v-model="selectedOption" value="pagadas">
                    <label class="form-check-label" for="inlineRadio2">
                        <span class="option-icon">✅</span>
                        {{ opcion2 }}
                    </label>
                </div>
                
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" id="inlineRadio3" name="filtroOpciones" v-model="selectedOption" value="pendientes">
                    <label class="form-check-label" for="inlineRadio3">
                        <span class="option-icon">⏰</span>
                        {{ opcion3 }}
                    </label>
                </div>
            </div>
        </div>
        
        <div class="acciones-container">
            <button class="btn btn-primary" @click="filtrar">
                <span class="btn-icon">🔍</span>
                Aplicar Filtro
            </button>
        </div>
    </b-modal>
</template>
<script>
    export default {
        data() {
            return {
                selectedOption: 'pendientes',
                modalFiltrar: false,
                opcion1: 'Canceladas',
                opcion2: 'Pagadas',
                opcion3: 'Pendientes',
            }
        },
        methods: {
            filtrar(){
                this.modalFiltrar = false;
                // Convertir la selección de radio a formato de checkbox para compatibilidad
                const filtros = {
                    canceladas: this.selectedOption === 'canceladas',
                    pagadas: this.selectedOption === 'pagadas',
                    pendientes: this.selectedOption === 'pendientes'
                };
                this.$emit('aplicarFiltros', filtros);
            },
            showFiltros(id){
                
                if(id === 3){
                    this.opcion2 = 'Facturados';
                }else if(id === 2){
                    this.opcion2 = 'Pagados';
                    this.opcion1 = 'Cancelados';
                }else{
                    this.opcion2 = 'Pagadas';
                    this.opcion1 = 'Canceladas';
                }

                this.modalFiltrar = true;
            }
        },
    }
</script>

<style scoped>
/* Container principal */
.filtros-container {
    padding: 1rem 0;
}

.filtros-title {
    color: #374151;
    font-weight: 600;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    text-align: center;
}

.opciones-grupo {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
}

/* Estilos mejorados para radio buttons */
.form-check {
    margin-bottom: 0;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    border: 2px solid #e5e7eb;
    background: #f8fafc;
    cursor: pointer;
    position: relative;
}

.form-check:hover {
    background: #f1f5f9;
    border-color: #d1d5db;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form-check:has(.form-check-input:checked) {
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.form-check-input:checked + .form-check-label {
    color: #1e40af;
    font-weight: 700;
}

.form-check-input {
    margin-right: 0.75rem;
    transform: scale(1.3);
    margin-top: 2px;
}

.form-check-input:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
}

.form-check-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
}

.form-check-label {
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
}

.option-icon {
    font-size: 1.2rem;
    display: inline-block;
    min-width: 24px;
}

/* Container de acciones */
.acciones-container {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
}

/* Botón de aplicar filtros */
.btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border: none;
    padding: 0.875rem 2.5rem;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
    color: white;
}

.btn-icon {
    font-size: 1rem;
}

/* Quitar estilos inline por defecto */
.form-check-inline {
    display: block;
    margin-right: 0;
    margin-bottom: 0;
}

/* Modal personalizado */
::v-deep .modal-header {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-bottom: 2px solid #e5e7eb;
}

::v-deep .modal-title {
    color: #374151;
    font-weight: 700;
    font-size: 1.25rem;
}

::v-deep .modal-body {
    padding: 1.5rem 2rem;
    background: #ffffff;
}

/* Responsive */
@media (max-width: 768px) {
    .filtros-container {
        padding: 0.5rem 0;
    }
    
    .form-check {
        padding: 0.875rem 1rem;
    }
    
    .form-check-label {
        font-size: 0.95rem;
    }
    
    .option-icon {
        font-size: 1.1rem;
    }
    
    .btn-primary {
        padding: 0.75rem 2rem;
        font-size: 0.95rem;
    }
    
    ::v-deep .modal-body {
        padding: 1rem 1.5rem;
    }
}

@media (max-width: 480px) {
    .opciones-grupo {
        gap: 0.5rem;
    }
    
    .form-check {
        padding: 0.75rem 0.875rem;
    }
    
    .filtros-title {
        font-size: 1rem;
        margin-bottom: 1rem;
    }
}
</style>