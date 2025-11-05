<template>
    <v-app>
        <div class="pendientes-container">
            <!-- Modal con pendientes -->
            <b-modal 
                ref="my-modal" 
                no-close-on-backdrop 
                scrollable 
                hide-footer 
                :title="'Pendientes ' + tipo_cliente.tipo" 
                size="xl"
                modal-class="professional-modal"
            >
                <div class="professional-table-container">
                    <table class="table professional-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Número</th>
                                <th>Cliente</th>
                                <th>Valor</th>
                                <th>Fecha</th>
                                <th class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item, index in data" :key="index" class="fade-in-up">
                                <td>
                                    <span class="item-badge">{{ index + 1 }}</span>
                                </td>
                                <td>
                                    <span class="number-badge">{{ (tipo_cliente.id === 1)?item.numero:item.num_pedido }}</span>
                                </td>
                                <td>
                                    <img :src="item.logo" class="lab-logo" v-if="tipo_cliente.id === 2">
                                    <strong>{{ item.razon_social }}</strong>
                                </td>
                                <td>
                                    <span class="value-badge">{{ item.valor | currency }}</span>
                                </td>
                                <td>
                                    <span class="date-text">{{ item.fecha }}</span>
                                </td>
                                <td class="text-center">
                                    <div class="action-buttons">
                                        <a :href="'/realizar-facturas/' + item.numero" 
                                           class="action-btn btn-facturar" 
                                           title="Facturar">
                                            <i class="fas fa-dollar-sign"></i>
                                        </a>
                                        <a :href="'/nueva-transferencia/' + item.numero" 
                                           class="action-btn btn-editar" 
                                           title="Editar">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a :href="'/imprimir-transferencia/' + item.id" 
                                           target="_blank" 
                                           class="action-btn btn-imprimir" 
                                           title="Imprimir pedido">
                                            <i class="fas fa-print"></i>
                                        </a>
                                        <button 
                                            class="action-btn btn-cancelar" 
                                            @click="cancelPedido(item.id)" 
                                            title="Cancelar pedido">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </b-modal>

            <!-- Header profesional -->
            <div class="professional-header">
                <div class="header-content">
                    <div class="header-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <div class="header-text">
                        <h2 class="header-title">Panel de Pendientes</h2>
                        <p class="header-subtitle">Gestión de transferencias y cotizaciones pendientes</p>
                    </div>
                </div>
            </div>

            <!-- Cards de estadísticas -->
            <div class="statistics-grid">
                <div class="stat-card transferencias-card" @click="showPendientes(1)">
                    <div class="stat-card-header">
                        <div class="stat-icon transferencias-icon">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                        <div class="stat-badge">
                            {{ indirectos.length }}
                        </div>
                    </div>
                    <div class="stat-card-body">
                        <h3 class="stat-title">Transferencias</h3>
                        <p class="stat-description">Pendientes por procesar</p>
                    </div>
                    <div class="stat-card-footer">
                        <span class="view-details">Ver detalles</span>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>

                <div class="stat-card cotizaciones-card" @click="showPendientes(3)">
                    <div class="stat-card-header">
                        <div class="stat-icon cotizaciones-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-badge">
                            {{ cotizaciones.length }}
                        </div>
                    </div>
                    <div class="stat-card-body">
                        <h3 class="stat-title">Cotizaciones</h3>
                        <p class="stat-description">En espera de respuesta</p>
                    </div>
                    <div class="stat-card-footer">
                        <span class="view-details">Ver detalles</span>
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </v-app>
</template>
<script>
export default {
    data(){
        return{
            csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            cotizaciones: [],
            data: [],
            directos: [],
            indirectos: [],
            tipo_cliente: {id: null, tipo: null}
        }
    },
    mounted() {
        this.getCotizaciones();
        this.getIndirectos();
    },
    methods: {
        cancelPedido(id){
            Swal.fire({
                title: 'Estas seguro?',
                text: "Intentas cancelar una transferencia!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if(result.isConfirmed){
                        axios.put(`/estado-transferencias/${id}`)
                            .then(res => {
                                // console.log(res.data)
                                if(res.data === 'ok'){
                                    Swal.fire(
                                        'Cancelada!',
                                        'La transferencia fue cancelada.',
                                        'success'
                                    )
                                    location.reload();                         
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                })
        }, 
        getCotizaciones(){

        },
        getIndirectos(){
            axios.get('/transferencias-pendientes')
                .then(res => {
                    console.log(res.data)
                    this.indirectos = res.data
                })
                .catch(err => console.log(err))
        },
        showPendientes(id){
            this.data = [];
            this.tipo_cliente.id = id
            if(id === 1){
                this.tipo_cliente.tipo = 'Indirecto';
                this.data = this.indirectos;
            }else if(id === 2){
                this.tipo_cliente.tipo = 'Directo';
                this.data = this.directos;
            }else{
                this.tipo_cliente.tipo = 'Cotización';
            }
            this.$refs['my-modal'].show()
        }
    },
}
</script>
<style scoped>
/* ====================================
   ESTILOS PROFESIONALES - PENDIENTES
   ==================================== */

.pendientes-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 2rem;
}

/* Header profesional */
.professional-header {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    color: #ffffff !important;
    position: relative;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: #ffffff !important;
}

.header-text {
    color: #ffffff !important;
}

.header-text * {
    color: inherit !important;
}

.header-icon {
    background: rgba(255,255,255,0.2);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #ffffff !important;
    border: 2px solid rgba(255,255,255,0.3);
}

.header-title {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    letter-spacing: -0.5px;
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.header-subtitle {
    font-size: 1rem;
    margin: 0.5rem 0 0 0;
    color: #ecf0f1 !important;
    opacity: 0.95;
}

/* Grid de estadísticas */
.statistics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

/* Cards de estadísticas */
.stat-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(0,0,0,0.05);
    position: relative;
    overflow: hidden;
}

.stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2980b9);
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.transferencias-card::before {
    background: linear-gradient(90deg, #e67e22, #d35400);
}

.cotizaciones-card::before {
    background: linear-gradient(90deg, #9b59b6, #8e44ad);
}

.stat-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.stat-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
}

.transferencias-icon {
    background: linear-gradient(135deg, #e67e22, #d35400);
}

.cotizaciones-icon {
    background: linear-gradient(135deg, #9b59b6, #8e44ad);
}

.stat-badge {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 1.25rem;
    font-weight: 700;
    min-width: 60px;
    text-align: center;
}

.stat-card-body {
    margin-bottom: 1.5rem;
}

.stat-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
}

.stat-description {
    color: #6c757d;
    margin: 0;
    font-size: 0.95rem;
}

.stat-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #495057;
    font-weight: 500;
}

.view-details {
    font-size: 0.9rem;
}

/* Modal profesional */
.professional-modal .modal-header {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    border: none;
    border-radius: 12px 12px 0 0;
}

.professional-table-container {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.professional-table {
    margin: 0;
    width: 100%;
    min-width: 780px;
    table-layout: auto;
    word-wrap: break-word;
}

.professional-table thead th {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #2c3e50;
    font-weight: 600;
    padding: 1rem 0.5rem;
    border: none;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    white-space: nowrap;
    text-align: center;
    line-height: 1.2;
    vertical-align: middle;
}

/* ITEM - Columna 1 */
.professional-table thead th:first-child {
    width: 7%;
    min-width: 50px;
}

/* LAB - Columna 2 (condicional) */
.professional-table thead th:nth-child(2) {
    width: 7%;
    min-width: 50px;
}

/* NÚMERO - Columna 3 */
.professional-table thead th:nth-child(4) {
    width: 4%;
    min-width: 45px;
    text-align: center;
}

/* CLIENTE - Columna 4 */
.professional-table thead th:nth-child(5) {
    width: 10%;
    min-width: 80px;
    text-align: left;
    padding-left: 1rem;
}

/* VALOR - Columna 5 */
.professional-table thead th:nth-child(3) {
    width: 52%;
    min-width: 340px;
}

/* FECHA - Columna 6 */
.professional-table thead th:nth-child(6) {
    width: 11%;
    min-width: 90px;
}

/* ACCIONES - Última columna */
.professional-table thead th:last-child {
    width: 12%;
    min-width: 110px;
}

/* Reglas específicas cuando hay columna LAB */
/* En este caso las posiciones cambian: Item(1), Lab(2), Número(3), Cliente(4), Valor(5), Fecha(6), Acciones(7) */
.professional-table thead th:nth-child(4):not(:nth-last-child(3)) {
    width: 8%;
    min-width: 70px;
    text-align: left;
    padding-left: 1rem;
}

.professional-table tbody td {
    padding: 1rem 0.75rem;
    border-bottom: 1px solid #f1f3f4;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
}

/* Columna de cliente - ahora más compacta */
.professional-table tbody td:nth-child(3) {
    text-align: left !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    padding: 1rem 0.5rem !important;
    font-weight: 600 !important;
    color: #2c3e50 !important;
}

/* Columna de valor - ahora más amplia */
.professional-table tbody td:nth-child(4) {
    text-align: center !important;
    white-space: nowrap !important;
    padding: 1rem 0.5rem !important;
}

/* Elemento strong dentro de la columna cliente */
.professional-table tbody td strong {
    white-space: normal !important;
    word-wrap: break-word !important;
    overflow: visible !important;
    text-overflow: unset !important;
    display: block !important;
    width: 100% !important;
    font-weight: 600 !important;
    color: #2c3e50 !important;
}

.professional-table tbody tr:hover {
    background: rgba(52, 152, 219, 0.05);
}

/* Elementos de tabla */
.item-badge {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.8rem;
    display: inline-block;
    min-width: 30px;
    text-align: center;
}

.number-badge {
    background: linear-gradient(135deg, #2c3e50, #34495e);
    color: white;
    padding: 0.15rem 0.3rem;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.75rem;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    min-width: 40px;
    max-width: 50px;
}

.value-badge {
    background: linear-gradient(135deg, #27ae60, #229954);
    color: white;
    padding: 0.2rem 0.4rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.8rem;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    min-width: 70px;
    max-width: 100px;
}

.date-text {
    color: #6c757d;
    font-weight: 500;
    font-size: 0.85rem;
    white-space: nowrap;
}

.lab-logo {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: block;
    margin: 0 auto;
}

/* Botones de acción */
.action-buttons {
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    flex-wrap: nowrap;
}

.action-btn {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    position: relative;
    flex-shrink: 0;
}

.action-btn i {
    color: white !important;
    font-size: 0.9rem !important;
    line-height: 1;
    display: inline-block;
    width: auto;
    height: auto;
}

.btn-facturar {
    background: linear-gradient(135deg, #f39c12, #e67e22);
    color: white !important;
}

.btn-facturar:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(243, 156, 18, 0.4);
    color: white !important;
    text-decoration: none;
}

.btn-facturar i {
    color: white !important;
}

.btn-editar {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white !important;
}

.btn-editar:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
    color: white !important;
    text-decoration: none;
}

.btn-editar i {
    color: white !important;
}

.btn-imprimir {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white !important;
}

.btn-imprimir:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
    color: white !important;
    text-decoration: none;
}

.btn-imprimir i {
    color: white !important;
}

.btn-cancelar {
    background: linear-gradient(135deg, #95a5a6, #7f8c8d);
    color: white !important;
}

.btn-cancelar:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(149, 165, 166, 0.4);
    color: white !important;
}

.btn-cancelar i {
    color: white !important;
}



/* Animaciones */
.fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}

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

/* Responsive */
@media (max-width: 1200px) {
    .professional-table {
        min-width: 680px;
    }
    
    .professional-table thead th {
        font-size: 0.75rem;
        padding: 0.8rem 0.4rem;
        letter-spacing: 0.2px;
    }
    
    .professional-table thead th:nth-child(3) {
        font-size: 0.7rem;
        line-height: 1.1;
        width: 4% !important;
        min-width: 40px !important;
    }
    
    .professional-table tbody td {
        padding: 0.8rem 0.4rem;
        font-size: 0.85rem;
    }
    
    .professional-table tbody td:nth-child(4) {
        padding: 0.8rem 0.3rem !important;
        font-size: 0.82rem !important;
    }
    
    .professional-table tbody td:nth-child(5) {
        padding: 0.8rem 0.3rem !important;
        font-size: 0.85rem !important;
    }
    
    .professional-table tbody td strong {
        font-size: 0.82rem !important;
    }
}

@media (max-width: 992px) {
    .professional-table {
        min-width: 580px;
    }
    
    .professional-table thead th {
        padding: 0.75rem 0.3rem;
        font-size: 0.7rem;
        letter-spacing: 0.1px;
    }
    
    .professional-table thead th:nth-child(4) {
        font-size: 0.65rem;
        line-height: 1.0;
    }
    
    .professional-table tbody td {
        padding: 0.75rem 0.3rem;
        font-size: 0.8rem;
    }
    
    .professional-table tbody td:nth-child(4) {
        padding: 0.75rem 0.2rem !important;
        font-size: 0.75rem !important;
    }
    
    .professional-table tbody td:nth-child(5) {
        padding: 0.75rem 0.2rem !important;
        font-size: 0.78rem !important;
    }
    
    .professional-table tbody td strong {
        font-size: 0.75rem !important;
    }
    
    .action-btn {
        width: 32px;
        height: 32px;
        font-size: 0.8rem;
    }
    
    .action-btn i {
        font-size: 0.8rem !important;
    }
    
    .item-badge,
    .number-badge,
    .value-badge {
        font-size: 0.75rem;
        padding: 0.2rem 0.4rem;
    }
    
    .lab-logo {
        width: 30px;
        height: 30px;
    }
}

@media (max-width: 768px) {
    .pendientes-container {
        padding: 1rem;
    }
    
    .professional-header {
        padding: 1.5rem;
    }
    
    .header-content {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
    
    .header-title {
        font-size: 1.5rem;
    }
    
    .statistics-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .stat-card {
        padding: 1.5rem;
    }
    
    /* Tabla más compacta en móviles */
    .professional-table {
        min-width: 510px;
        font-size: 0.8rem;
    }
    
    .professional-table thead th {
        padding: 0.6rem 0.25rem;
        font-size: 0.65rem;
        letter-spacing: 0px;
        line-height: 1.1;
    }
    
    .professional-table thead th:nth-child(4) {
        font-size: 0.6rem;
        line-height: 1.0;
        word-spacing: -1px;
    }
    
    .professional-table tbody td {
        padding: 0.6rem 0.25rem;
        font-size: 0.75rem;
    }
    
    .professional-table tbody td:nth-child(4) {
        padding: 0.6rem 0.15rem !important;
        font-size: 0.7rem !important;
        max-width: none !important;
    }
    
    .professional-table tbody td:nth-child(5) {
        padding: 0.6rem 0.15rem !important;
        font-size: 0.72rem !important;
        max-width: none !important;
    }
    
    .professional-table tbody td strong {
        font-size: 0.7rem !important;
    }
    
    .action-buttons {
        flex-direction: column;
        gap: 0.2rem;
        align-items: center;
    }
    
    .action-btn {
        width: 28px;
        height: 28px;
        font-size: 0.7rem;
    }
    
    .action-btn i {
        font-size: 0.7rem !important;
    }
    
    .item-badge {
        min-width: 25px;
        font-size: 0.7rem;
        padding: 0.15rem 0.3rem;
    }
    
    .number-badge,
    .value-badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.3rem;
    }
    
    .date-text {
        font-size: 0.7rem;
    }
    
    .lab-logo {
        width: 25px;
        height: 25px;
    }
    
    /* Scroll indicator para móviles */
    .professional-table-container::after {
        content: "← Desliza horizontalmente para ver más →";
        display: block;
        text-align: center;
        padding: 0.5rem;
        background: rgba(52, 152, 219, 0.1);
        color: #3498db;
        font-size: 0.7rem;
        margin: 0;
        border-radius: 0 0 12px 12px;
        font-weight: 600;
    }
}

@media (max-width: 480px) {
    .professional-table {
        min-width: 480px;
    }
    
    .professional-table thead th {
        padding: 0.5rem 0.2rem;
        font-size: 0.6rem;
        letter-spacing: -0.2px;
        line-height: 1.0;
    }
    
    .professional-table thead th:nth-child(4) {
        font-size: 0.55rem;
        line-height: 0.9;
        word-spacing: -2px;
    }
    
    .professional-table tbody td {
        padding: 0.5rem 0.2rem;
        font-size: 0.7rem;
    }
    
    .professional-table tbody td:nth-child(4),
    .professional-table tbody td:nth-child(5) {
        padding: 0.5rem 0.1rem !important;
        font-size: 0.65rem !important;
        max-width: none !important;
        line-height: 1.2 !important;
    }
    
    .professional-table tbody td strong {
        font-size: 0.65rem !important;
        line-height: 1.2 !important;
    }
    
    .action-buttons {
        gap: 0.1rem;
    }
    
    .action-btn {
        width: 25px;
        height: 25px;
        font-size: 0.65rem;
        border-radius: 6px;
    }
    
    .action-btn i {
        font-size: 0.65rem !important;
    }
    
    .item-badge,
    .number-badge,
    .value-badge {
        font-size: 0.65rem;
        padding: 0.1rem 0.25rem;
    }
    
    .date-text {
        font-size: 0.65rem;
    }
    
    .lab-logo {
        width: 22px;
        height: 22px;
    }
}
</style>