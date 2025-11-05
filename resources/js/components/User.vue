<template>
    <v-app>
        <div class="users-container">
            <!-- Professional Loading State -->
            <div v-if="loader" class="loading-container">
                <div class="loading-content">
                    <div class="professional-loader">
                        <div class="loader-spinner"></div>
                        <div class="loader-pulse"></div>
                    </div>
                    <div class="loading-text">
                        <h5 class="loading-title">Cargando usuarios...</h5>
                        <p class="loading-subtitle">Por favor espera mientras obtenemos la información</p>
                    </div>
                </div>
            </div>

            <div v-else class="users-content">
                <!-- Header Section -->
                <div class="header-section">
                    <div class="page-header">
                        <h2 class="page-title">
                            <i class="fas fa-users mr-3"></i>
                            Gestión de Usuarios
                        </h2>
                        <p class="page-description">
                            Administra los usuarios del sistema y sus permisos de acceso.
                        </p>
                    </div>
                    
                    <div class="header-actions">
                        <div class="search-box">
                            <i class="fas fa-search search-icon"></i>
                            <input 
                                type="text" 
                                class="form-control search-input" 
                                v-model="search" 
                                placeholder="Buscar usuarios..."
                            >
                        </div>
                        <button class="btn btn-primary new-user-btn" @click="newUser">
                            <i class="fas fa-plus mr-2"></i>
                            Nuevo Usuario
                        </button>
                    </div>
                </div>

                <!-- Professional Content -->
                <div class="professional-report-container">
                    <!-- Desktop/Tablet Table -->
                    <div class="desktop-table">
                        <div class="table-responsive professional-table-wrapper">
                            <table class="professional-table">
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            <i class="fas fa-envelope"></i>
                                            Usuario
                                        </th>
                                        <th class="text-left">
                                            <i class="fas fa-user"></i>
                                            Nombres
                                        </th>
                                        <th class="text-center">
                                            <i class="fas fa-user-tag"></i>
                                            Rol
                                        </th>
                                        <th class="text-center">
                                            <i class="fas fa-cogs"></i>
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in paginatedUsuarios" :key="index" class="data-row">
                                        <td class="text-left email-cell">
                                            <div class="user-email">
                                                <i class="fas fa-envelope user-icon"></i>
                                                <span class="email-text">{{ item.email }}</span>
                                            </div>
                                        </td>
                                        <td class="text-left name-cell">
                                            <div class="user-name">
                                                <i class="fas fa-user user-icon"></i>
                                                <span class="name-text">{{ item.name }}</span>
                                            </div>
                                        </td>
                                        <td class="text-center role-cell">
                                            <span class="role-badge" :class="item.role_id === 1 ? 'role-admin' : 'role-client'">
                                                <i :class="item.role_id === 1 ? 'fas fa-crown' : 'fas fa-user-tag'" class="role-icon"></i>
                                                {{ item.role_id === 1 ? 'Admin' : 'Cliente' }}
                                            </span>
                                        </td>
                                        <td class="text-center actions-cell">
                                            <div class="action-buttons">
                                                <button 
                                                    class="action-btn btn-edit" 
                                                    @click="editItem(item)"
                                                    title="Editar usuario"
                                                >
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Mobile Cards -->
                    <div class="mobile-cards-container">
                        <div v-for="(item, index) in paginatedUsuarios" :key="index" class="user-card">
                            <div class="card-header">
                                <div class="user-info">
                                    <div class="user-details">
                                        <span class="user-email-mobile">{{ item.email }}</span>
                                        <span class="user-name-mobile">{{ item.name }}</span>
                                    </div>
                                    <div class="role-container">
                                        <span class="role-badge-mobile" :class="item.role_id === 1 ? 'role-admin' : 'role-client'">
                                            <i :class="item.role_id === 1 ? 'fas fa-crown' : 'fas fa-user-tag'" class="role-icon"></i>
                                            {{ item.role_id === 1 ? 'Admin' : 'Cliente' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="card-body">
                                <div class="actions-section">
                                    <button 
                                        @click="editItem(item)" 
                                        class="mobile-action-btn edit-btn"
                                    >
                                        <i class="fas fa-edit"></i>
                                        Editar Usuario
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pagination Controls -->
                    <div class="pagination-section" v-if="filteredUsuarios.length > 0">
                        <div class="pagination-info">
                            <div class="items-per-page">
                                <span class="pagination-label">Mostrar:</span>
                                <select 
                                    v-model="itemsPerPage" 
                                    @change="changeItemsPerPage(itemsPerPage)"
                                    class="items-select"
                                >
                                    <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                                        {{ option }}
                                    </option>
                                </select>
                                <span class="pagination-label">registros</span>
                            </div>
                            <div class="page-info">
                                <span class="page-info-text">
                                    Mostrando {{ paginationInfo.start }} - {{ paginationInfo.end }} de {{ paginationInfo.total }} registros
                                </span>
                            </div>
                        </div>
                        
                        <div class="pagination-controls">
                            <button 
                                @click="prevPage" 
                                :disabled="currentPage === 1"
                                class="pagination-btn prev-btn"
                            >
                                <i class="fas fa-chevron-left"></i>
                                Anterior
                            </button>
                            
                            <div class="page-numbers">
                                <button 
                                    v-for="page in getVisiblePages()" 
                                    :key="page"
                                    @click="goToPage(page)"
                                    :class="['page-btn', { 'active': page === currentPage, 'ellipsis': page === '...' }]"
                                    :disabled="page === '...'"
                                >
                                    {{ page }}
                                </button>
                            </div>
                            
                            <button 
                                @click="nextPage" 
                                :disabled="currentPage === totalPages"
                                class="pagination-btn next-btn"
                            >
                                Siguiente
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Professional Modal Bootstrap -->
                <b-modal id="modal-user" no-close-on-backdrop scrollable centered hide-footer :title="formTitle" v-model="dialog" size="lg">
                    <div class="row">
                        <div class="col-6">
                            <label for="role_id">Rol del usuario</label>
                            <b-form-select id="role_id" v-model="user.role_id" :options="roles" :class="{'is-invalid': hasError('role_id')}"></b-form-select>
                            <div class="invalid-feedback" v-if="hasError('role_id')">{{ firstError('role_id') }}</div>
                        </div>
                        
                        <div class="col-6" v-if="user.role_id === 2">
                            <label class="field-label">Asociar a un cliente</label>
                            <model-select 
                                :options="clientes"
                                placeholder="Buscar Cliente"
                                v-model="user.cliente_id"
                                :class="{'is-invalid': hasError('cliente_id')}"
                            ></model-select>
                            <div class="invalid-feedback" v-if="hasError('cliente_id')">{{ firstError('cliente_id') }}</div>
                        </div>
                        
                        <div class="col-6">
                            <label for="email">Correo electrónico</label>
                            <input type="email" id="email" class="form-control" v-model="user.email" :class="{'is-invalid': hasError('email')}">
                            <div class="invalid-feedback" v-if="hasError('email')">{{ firstError('email') }}</div>
                        </div>
                        
                        <div class="col-6">
                            <label for="name">Nombre completo</label>
                            <input type="text" id="name" class="form-control" v-model="user.name" :class="{'is-invalid': hasError('name')}">
                            <div class="invalid-feedback" v-if="hasError('name')">{{ firstError('name') }}</div>
                        </div>
                        
                        <div class="col-12" v-if="editedIndex === -1">
                            <label for="password">Contraseña</label>
                            <input type="password" id="password" class="form-control" v-model="user.password" :class="{'is-invalid': hasError('password')}">
                            <div class="invalid-feedback" v-if="hasError('password')">{{ firstError('password') }}</div>
                        </div>
                        
                        <div class="col-6">
                            <button class="btn btn-outline-primary btn-block" @click="close"><i class="fas fa-window-close mr-2"></i>Cancelar</button>
                        </div>
                        <div class="col-6">
                            <button class="btn btn-warning btn-block" @click="updateUser()" v-if="editedIndex === 0"><i class="far fa-save mr-2"></i>Actualizar</button>
                            <button class="btn btn-primary btn-block" @click="save" v-else><i class="far fa-save mr-2"></i>Guardar</button>
                        </div>
                    </div>
                </b-modal>
            </div>
        </div>
    </v-app>
</template>
<script>
    import { ModelSelect } from 'vue-search-select';
    export default {
        data: () => ({  
            clientes: [],          
            dialog: false,           
            editedIndex: -1,            
            erroresUser: {},
            index: -1,
            loader: true,
            roles: [
                {value: 1, text: 'Admin'},
                {value: 2, text: 'Cliente'}
            ],
            search: '',            
            user: {id: '', role_id: '', email: '', name: '', password: '', cliente_id: ''},
            usuarios: [],
            // Paginación
            currentPage: 1,
            itemsPerPage: 10,
            itemsPerPageOptions: [5, 10, 15, 25],
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
            },
            filteredUsuarios() {
                let filtered = this.usuarios;
                
                // Aplicar filtro de búsqueda
                if (this.search) {
                    filtered = filtered.filter(usuario => 
                        usuario.email.toLowerCase().includes(this.search.toLowerCase()) ||
                        usuario.name.toLowerCase().includes(this.search.toLowerCase())
                    );
                }
                
                return filtered;
            },
            paginatedUsuarios() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredUsuarios.slice(start, end);
            },
            totalPages() {
                return Math.ceil(this.filteredUsuarios.length / this.itemsPerPage);
            },
            paginationInfo() {
                const start = (this.currentPage - 1) * this.itemsPerPage + 1;
                const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredUsuarios.length);
                return {
                    start,
                    end,
                    total: this.filteredUsuarios.length
                };
            }
        },   

        created(){
            this.getClientes();
            this.initialize();
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
            search() {
                // Resetear página cuando cambie la búsqueda
                this.currentPage = 1;
            }
        },

        methods: {
            // Métodos de paginación
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                }
            },
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
            },
            goToPage(page) {
                if (page >= 1 && page <= this.totalPages) {
                    this.currentPage = page;
                }
            },
            changeItemsPerPage(newValue) {
                this.itemsPerPage = newValue;
                this.currentPage = 1; // Reset to first page
            },
            getVisiblePages() {
                const totalPages = this.totalPages;
                const current = this.currentPage;
                const delta = 2; // Número de páginas a mostrar a cada lado de la actual
                
                if (totalPages <= 7) {
                    // Si hay 7 páginas o menos, mostrar todas
                    return Array.from({ length: totalPages }, (_, i) => i + 1);
                }
                
                let pages = [];
                
                // Siempre mostrar la primera página
                pages.push(1);
                
                if (current - delta > 2) {
                    pages.push('...');
                }
                
                // Páginas alrededor de la actual
                const start = Math.max(2, current - delta);
                const end = Math.min(totalPages - 1, current + delta);
                
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
                
                if (current + delta < totalPages - 1) {
                    pages.push('...');
                }
                
                // Siempre mostrar la última página
                if (totalPages > 1) {
                    pages.push(totalPages);
                }
                
                return pages;
            },
            
            hasError(field){
                return !!(this.erroresUser && this.erroresUser[field] && this.erroresUser[field].length);
            },
            firstError(field){
                return this.hasError(field) ? this.erroresUser[field][0] : null;
            },
            close(){
                this.dialog = false;
                this.$nextTick(() => {
                    this.erroresUser = {};
                    this.user = {};
                    this.editedIndex = -1
                })
            }, 
            editItem(item){
                this.editedIndex = 0;  
                this.index = this.usuarios.indexOf(item);
                this.erroresUser = {};
                this.user = Object.assign({}, item) //Asigna el objeto item a el objeto usuario
                this.dialog = true
            },
            newUser(){
                this.editedIndex = -1;
                this.erroresUser = {};
                this.user = {};
                this.dialog = true;
            },  
            getClientes(){
                axios.get('/clientes')
                    .then(res => {
                        this.loader = false;
                        // console.log(res.data)
                        for (let i = 0; i < res.data.length; i++) {
                            this.clientes.push({
                                value: res.data[i].id,
                                text: res.data[i].razon_social+' - '+res.data[i].municipios.mcpio
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            initialize(){
                axios.get('/usuarios')
                    .then(res => {
                        this.usuarios = [];
                        for (let i = 0; i < res.data.length; i++) {
                            this.usuarios.push({
                                id: res.data[i].id,
                                email: res.data[i].email,
                                name: res.data[i].name,
                                role_id: res.data[i].role_id,      
                                cliente_id: res.data[i].cliente_id                          
                            })                        
                        }
                        this.loader = false;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            save(){
                axios.post('/usuarios', this.user)
                    .then(res => {
                        if (res.data === 'ok') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Usuario creado',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                confirmButtonText: 'Aceptar'
                            }).then((result) => {
                                if(result.value){
                                    location.reload();
                                }
                            })                         
                        } else {
                            this.erroresUser = res.data.errors || res.data || {};
                        }
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 422) {
                            this.erroresUser = err.response.data.errors || {};
                        } else {
                            console.log(err)
                        }
                    })
            },
            updateUser(){
                axios.put(`/usuarios/${this.user.id}`, this.user)
                    .then(res => {
                        if (res.data === 'ok') {                            
                            Object.assign(this.usuarios[this.index], this.user)
                            this.close();
                        } else {
                            this.erroresUser = res.data.errors || res.data || {};
                        }
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 422) {
                            this.erroresUser = err.response.data.errors || {};
                        } else {
                            console.log(err)
                        }
                    })
            }
        },        
        components: {
            ModelSelect 
        }
    }
</script>

<style scoped>
/* Professional Container */
.users-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2rem;
}

/* Professional Loading */
.loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    padding: 40px 20px;
    background: linear-gradient(135deg, #17a2b820 0%, #13849620 100%);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.loading-content {
    text-align: center;
    max-width: 300px;
}

.professional-loader {
    position: relative;
    display: inline-block;
    margin-bottom: 30px;
}

.loader-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(102, 126, 234, 0.1);
    border-left: 4px solid #17a2b8;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: relative;
    z-index: 2;
}

.loader-pulse {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 80px;
    height: 80px;
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
    z-index: 1;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes pulse {
    0% { transform: scale(0.8); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.5; }
    100% { transform: scale(0.8); opacity: 1; }
}

.loading-title {
    color: #2c3e50;
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 8px;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.loading-subtitle {
    color: #6c757d;
    font-size: 0.95rem;
    font-weight: 400;
    margin: 0;
    line-height: 1.4;
}

/* Header Section */
.users-content {
    max-width: 1400px;
    margin: 0 auto;
}

.header-section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
}

.page-header h2 {
    color: #2c3e50;
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
}

.page-description {
    color: #64748b;
    font-size: 1.1rem;
    margin: 0;
    font-weight: 400;
}

.header-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.search-box {
    position: relative;
    min-width: 300px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    z-index: 3;
    pointer-events: none;
}

.search-input {
    width: 100%;
    height: 50px;
    padding: 0 1rem 0 3rem !important;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.search-input::placeholder {
    color: #9ca3af;
    padding-left: 0;
}

.search-input:focus {
    outline: none;
    border-color: #17a2b8;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    background: white;
}

.new-user-btn {
    height: 50px;
    padding: 0 2rem;
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.new-user-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Mobile Cards - Hidden by default */
.mobile-cards-container {
    display: none;
}

.desktop-table {
    display: block;
}

/* Professional Table */
.professional-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.professional-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: white;
    font-size: 0.95rem;
}

/* Table Header */
.professional-table thead th {
    background: transparent;
    color: #374151;
    font-weight: 700;
    font-size: 0.9rem;
    padding: 1.25rem 1rem;
    border-bottom: 2px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.professional-table thead th i {
    margin-right: 0.5rem;
    color: #17a2b8;
}

/* Table Body */
.professional-table tbody tr {
    transition: all 0.3s ease;
    border-bottom: 1px solid #f1f5f9;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
}

.professional-table tbody tr:hover {
    background: rgba(102, 126, 234, 0.05);
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.professional-table tbody td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #f1f5f9;
}

/* Cell Styles */
.email-cell {
    font-weight: 600;
    color: #1e293b;
}

.name-cell {
    font-weight: 600;
    color: #1e293b;
}

.role-cell {
    color: #64748b;
    font-weight: 500;
}

.user-email, .user-name {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-icon {
    color: #17a2b8;
    font-size: 1rem;
    width: 20px;
    text-align: center;
}

.email-text {
    font-weight: 600;
    color: #374151;
    font-size: 1rem;
    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    color: #0277bd;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #81d4fa;
}

.name-text {
    font-weight: 500;
    color: #374151;
}

.role-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.role-admin {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(251, 191, 36, 0.3);
}

.role-client {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    box-shadow: 0 3px 10px rgba(16, 185, 129, 0.3);
}

.role-icon {
    font-size: 0.8rem;
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
}

.action-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    text-decoration: none;
}

.btn-edit {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.btn-edit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

/* Mobile Cards Styles */
.user-card {
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.user-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #f1f5f9;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
}

.user-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
}

.user-email-mobile {
    font-weight: 700;
    color: #0277bd;
    font-size: 1.1rem;
    line-height: 1.2;
}

.user-name-mobile {
    font-weight: 500;
    color: #64748b;
    font-size: 0.95rem;
}

.role-container {
    display: flex;
    align-items: center;
}

.role-badge-mobile {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.role-badge-mobile.role-admin {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* Actions Section Mobile */
.actions-section {
    display: flex;
    gap: 1rem;
}

.mobile-action-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    border: none;
}

.edit-btn {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.edit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

/* Professional Modal */
.professional-modal {
    border-radius: 20px !important;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2) !important;
}

.modal-header {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%) !important;
    color: white !important;
    font-size: 1.3rem !important;
    font-weight: 700 !important;
    padding: 1.5rem 2rem !important;
}

.modal-content {
    padding: 2rem !important;
    background: #f8fafc;
}

.field-label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    display: block;
}

.professional-select {
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: white;
}

.error-list {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    padding: 1rem;
}

.error-item {
    color: #dc2626;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.error-item:last-child {
    margin-bottom: 0;
}

.modal-actions {
    padding: 1.5rem 2rem !important;
    background: white;
    border-top: 1px solid #e2e8f0;
}

.cancel-btn {
    color: #64748b !important;
    font-weight: 600 !important;
}

.save-btn {
    font-weight: 600 !important;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
}

/* Pagination Styles */
.pagination-section {
    background: white;
    border-top: 2px solid #f1f5f9;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.pagination-info {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.items-per-page {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pagination-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
}

.items-select {
    padding: 0.5rem 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #374151;
    background: white;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
}

.items-select:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.page-info-text {
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 500;
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.pagination-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
    border-color: #17a2b8;
    color: #17a2b8;
    background: rgba(102, 126, 234, 0.05);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #9ca3af;
}

.page-numbers {
    display: flex;
    gap: 0.25rem;
    margin: 0 1rem;
}

.page-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    color: #374151;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-btn:hover:not(:disabled):not(.ellipsis) {
    border-color: #17a2b8;
    color: #17a2b8;
    background: rgba(102, 126, 234, 0.05);
}

.page-btn.active {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border-color: #17a2b8;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.page-btn.ellipsis {
    border: none;
    background: transparent;
    cursor: default;
    color: #9ca3af;
}

.page-btn.ellipsis:hover {
    background: transparent;
    border: none;
}

/* Responsive Pagination */
.pagination-section {
    background: white;
    border-top: 2px solid #f1f5f9;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

@media (max-width: 768px) {
    .pagination-section {
        padding: 1rem;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }
    
    .pagination-info {
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .items-per-page {
        justify-content: center;
    }
    
    .pagination-controls {
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .page-numbers {
        margin: 0 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .pagination-btn {
        font-size: 0.8rem;
        padding: 0.6rem 0.8rem;
    }
    
    .page-btn {
        width: 35px;
        height: 35px;
        font-size: 0.8rem;
    }
}

/* Responsive Design */
@media (max-width: 1024px) {
    .header-section {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
    }
    
    .header-actions {
        justify-content: center;
    }
    
    .search-box {
        min-width: 100%;
    }
    
    .page-header h2 {
        font-size: 2rem;
        justify-content: center;
    }
}

@media (max-width: 900px) {
    /* Show mobile cards, hide desktop table */
    .desktop-table {
        display: none;
    }
    
    .mobile-cards-container {
        display: block;
        padding: 0 0.5rem;
    }
}

@media (max-width: 768px) {
    .users-container {
        padding: 1rem;
    }
    
    .header-section {
        border-radius: 16px;
        padding: 1.5rem;
    }
    
    .professional-report-container {
        border-radius: 16px;
    }
    
    .page-header h2 {
        font-size: 1.8rem;
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
    }
    
    .user-card {
        margin-bottom: 1rem;
        padding: 1.25rem;
        border-radius: 14px;
    }
    
    .card-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
        margin-bottom: 1.25rem;
    }
    
    .user-info {
        justify-content: center;
        text-align: center;
    }
    
    .user-email-mobile {
        font-size: 1rem;
        text-align: center;
    }
    
    .actions-section {
        flex-direction: column;
        gap: 0.75rem;
    }
}

@media (max-width: 480px) {
    .users-container {
        padding: 0.75rem;
    }
    
    .header-section {
        padding: 1.25rem;
    }
    
    .page-header h2 {
        font-size: 1.6rem;
    }
    
    .user-card {
        padding: 1rem;
        margin-bottom: 0.875rem;
    }
    
    .user-email-mobile {
        font-size: 0.95rem;
    }
    
    .pagination-controls {
        flex-direction: column;
        gap: 1rem;
    }
    
    .page-numbers {
        margin: 0;
        order: 2;
    }
    
    .prev-btn {
        order: 1;
        align-self: stretch;
        justify-content: center;
    }
    
    .next-btn {
        order: 3;
        align-self: stretch;
        justify-content: center;
    }
}

/* Bootstrap Modal Styles */
#modal-user >>> .modal-content {
    border-radius: 20px;
    border: none;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

#modal-user >>> .modal-header {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    border: none;
    padding: 1.5rem 2rem;
    font-weight: 700;
}

#modal-user >>> .modal-header .modal-title {
    font-size: 1.3rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

#modal-user >>> .modal-header .close {
    color: white;
    opacity: 1;
    font-size: 1.5rem;
    text-shadow: none;
}

#modal-user >>> .modal-header .close:hover {
    color: rgba(255, 255, 255, 0.8);
}

#modal-user >>> .modal-body {
    padding: 2rem;
    background: #f8fafc;
}

#modal-user .form-control {
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: white;
}

#modal-user .form-control:focus {
    border-color: #17a2b8;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    outline: none;
}

#modal-user .form-control.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

#modal-user label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    display: block;
}

#modal-user .invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-weight: 500;
}

#modal-user .btn {
    border-radius: 8px;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    transition: all 0.3s ease;
    border: none;
}

#modal-user .btn-outline-primary {
    border: 2px solid #17a2b8;
    color: #17a2b8;
    background: transparent;
}

#modal-user .btn-outline-primary:hover {
    background: #17a2b8;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

#modal-user .btn-primary {
    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

#modal-user .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

#modal-user .btn-warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
}

#modal-user .btn-warning:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
}

#modal-user .field-label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    display: block;
}
</style>
