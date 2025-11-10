<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="{{ asset('js/variableSession.js') }}" defer></script>
        <script src="https://cdn.jsdelivr.net/npm/autonumeric@4.8.1"></script>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">

        {{-- Estilos admin --}}
        <link rel="stylesheet" href="{{asset('assets/vendor/bootstrap/css/bootstrap.min.css')}}">
        <link href="{{asset('assets/vendor/fonts/circular-std/style.css')}}" rel="stylesheet">
        <link rel="stylesheet" href="{{asset('assets/libs/css/style.css')}}">
        <link rel="stylesheet" href="{{asset('assets/vendor/fonts/fontawesome/css/fontawesome-all.css')}}">
        <!-- FontAwesome CDN como fallback -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="{{asset('assets/vendor/vector-map/jqvmap.css')}}">
        <link rel="stylesheet" href="{{asset('assets/vendor/jvectormap/jquery-jvectormap-2.0.2.css')}}">
        <link rel="stylesheet" href="{{asset('assets/vendor/fonts/flag-icon-css/flag-icon.min.css')}}">

        <!-- Styles -->
        <link href="{{ asset('css/newStyles.css') }}" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link href="{{ asset('css/icon-fixes.css') }}" rel="stylesheet">
        
    </head>
    <body>
        <div class="dashboard-main-wrapper" id="app">
            <div class="dashboard-header">
                <nav class="navbar navbar-expand-lg bg-white fixed-top">
                    <div class="container-fluid">
                        <!-- Botón para ocultar/mostrar sidebar en desktop -->
                        <button class="btn sidebar-toggle-btn d-none d-lg-block" type="button" id="sidebarToggle" style="background-color: #17a2b8; border-color: #17a2b8; color: white;">
                            <i class="fas fa-bars"></i>
                        </button>
                        
                        <!-- Botón de menú para tablets y móviles -->
                        <button class="btn mobile-menu-btn d-lg-none" type="button" id="mobileMenuToggle" style="background-color: #17a2b8; border-color: #17a2b8; color: white;">
                            <i class="fas fa-bars"></i>
                        </button>
                        
                        <!-- Logo con color corporativo -->
                        <a class="navbar-brand" href="/" style="color: #17a2b8; font-weight: bold;">PEDIDOS APP</a>
                        
                        <!-- Menú de usuario -->
                        <div class="navbar-nav ms-auto">
                            <div class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <i class="fas fa-angle-down ml-2"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('updatePassword') }}">
                                        <i class="fas fa-key mr-2"></i> Cambiar contraseña
                                    </a>
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                        <i class="fas fa-sign-out-alt mr-2"></i>{{ __('Logout') }}
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div class="nav-left-sidebar sidebar-dark">
                <div class="menu-list">
                    <nav class="navbar navbar-expand-lg navbar-light">
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav flex-column">
                               
                                @if (Auth::user()->role_id == 1)
                                    <li class="nav-item">
                                        <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#admin" aria-controls="admin"><i class="fas fa-cog"></i>Admin</a>
                                        <div id="admin" class="collapse submenu @yield('admin-show')" style="">
                                            <ul class="nav flex-column">
                                                <!-- <li class="nav-item">
                                                    <a class="nav-link" href="/combos">Combos</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" href="/productos-combo">Productos con combo</a>
                                                </li>           -->
                                               <li class="nav-item">
                                                    <a class="nav-link @yield('laboratorios-active')" href="/laboratorios">Laboratorios</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('usuarios-active')" href="/usuarios">Usuarios</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>                             
                                @endif

                                <li class="nav-item">
                                    <a class="nav-link " href="#" data-toggle="collapse" aria-expanded="false" data-target="#facturas" aria-controls="facturas"><i class="fas fa-file-alt"></i>Facturas</a>
                                    <div id="facturas" class="collapse submenu @yield('facturas-show')" style="">
                                        <ul class="nav flex-column">
                                            <li class="nav-item ">
                                                <a class="nav-link @yield('registrar-abonos')" href="/registrar-abonos">Registrar abonos</a>
                                            </li>  
                                            <li class="nav-item ">
                                                <a class="nav-link @yield('gestion-recibos')" href="/gestion-recibos">Gestión de recibos</a>
                                            </li>  
                                            <li class="nav-item ">
                                                <a class="nav-link @yield('gestionar-indirectos')" href="/gestionar-indirectos">Gestionar indirectos</a>
                                            </li>  
                                            <li class="nav-item ">
                                                <a class="nav-link @yield('realizar-facturas')" href="/realizar-facturas">Realizar facturas</a>
                                            </li>  
                                            <li class="nav-item ">
                                                <a class="nav-link @yield('registrar-notas')" href="/agregar-notas">Notas credito</a>
                                            </li>               
                                        </ul>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link @yield('clientes')" href="/clientes" aria-expanded="false" ><i class="fas fa-user"></i>Clientes</a>                                    
                                </li>
                                
                                @if (Auth::user()->role_id == 1)
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#informes" aria-controls="informes"><i class="fas fa-file-excel"></i>Informes</a>
                                    <div id="informes" class="collapse submenu @yield('informes-show')" style="">
                                        <ul class="nav flex-column">
                                            <li class="nav-item">
                                                <a class="nav-link @yield('informes')" href="/informe-calox">Ventas - Cobros - Transferencias</a>
                                                <a class="nav-link @yield('cartera')" href="/informe-facturacion-cartera">Cartera</a>
                                            </li>                                     
                                        </ul>
                                    </div>
                                </li>
                                    <li class="nav-item">

                                        <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#productos" aria-controls="productos"><i class="fas fa-dolly-flatbed"></i>Productos</a>
                                        <div id="productos" class="collapse submenu @yield('productos-show')" style="">
                                            <ul class="nav flex-column">
                                                <!-- <li class="nav-item">
                                                    <a class="nav-link @yield('combos')" href="/gestion-combos">Combos</a>
                                                </li>   -->
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('productos')" href="/inventario-productos">Productos</a>
                                                </li>    
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('presentaciones')" href="/presentaciones">Presentaciones </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('promociones')" href="/promociones">Promociones</a>
                                                </li>                                     
                                            </ul>
                                        </div>
                                    </li>
                                     
                                    <li class="nav-item">
                                        <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#pedidos" aria-controls="pedidos"><i class="fas fa-dollar-sign"></i>Pedidos</a>
                                        <div id="pedidos" class="collapse submenu @yield('pedidos-show')" style="">
                                            <ul class="nav flex-column">
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('transferencias')" href="/nueva-transferencia">Clientes Indirectos</a>
                                                </li>   
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('pedidos_calox')" href="/nuevo-pedido-calox">Clientes Directos</a>
                                                </li>      
                                                                               
                                            </ul>
                                        </div>
                                    </li>  
                                    <li class="nav-item">
                                        <a class="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#reportes" aria-controls="reportes"><i class="fas fa-chart-bar"></i></i>Reportes</a>
                                        <div id="reportes" class="collapse submenu @yield('reportes-show')" style="">
                                            <ul class="nav flex-column">
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('cartera')" href="/cartera">Cartera</a>
                                                </li> 
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('reporte-clientes')" href="/reportes-clientes">Clientes</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('abonos')" href="/abonos">Cobros facturas</a>
                                                </li>  
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('faltantes')" href="/faltantes-productos">Pendientes por facturar</a>
                                                </li> 
                                                <li class="nav-item">
                                                    <a class="nav-link @yield('ventas')" href="/reportes-ventas">Ventas</a>
                                                </li>                           
                                            </ul>
                                        </div>
                                    </li>  
                                @endif     
                                <li class="nav-item">
                                    <a class="nav-link " href="#" data-toggle="collapse" aria-expanded="false" data-target="#transferencias" aria-controls="transferencias"><i class="fas fa-folder"></i></i>Historicos</a>
                                    <div id="transferencias" class="collapse submenu @yield('historicos-show')" style="">
                                        <ul class="nav flex-column">         
                                        <li class="nav-item">
                                                <a class="nav-link @yield('historial_facturas')" href="/historial-facturas">Facturas</a>
                                            </li>                                       
                                            <li class="nav-item ">
                                                <a class="nav-link @yield('historial_transferencias')" href="/historial-transferencias">Pedidos Indirectos</a>
                                            </li>   
                                            <li class="nav-item">
                                                <a class="nav-link @yield('historial_pedidos')" href="/historial-pedidos">Pedidos Directos</a>
                                            </li>                                      
                                        </ul>
                                    </div>
                                </li>  
                            </ul>
                            
                            <!-- Menú de usuario para móviles -->
                            <div class="mobile-user-menu d-lg-none mt-4 pt-4 border-top border-secondary">
                                <div class="px-3 mb-3">
                                    <div class="text-white-50 small mb-2">Usuario</div>
                                    <div class="text-white font-weight-bold">{{ Auth::user()->name }}</div>
                                </div>
                                <ul class="navbar-nav flex-column">
                                    <li class="nav-item">
                                        <a class="nav-link text-white" href="{{ route('updatePassword') }}">
                                            <i class="fas fa-key mr-2"></i>Cambiar contraseña
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-white" href="{{ route('logout') }}"
                                           onclick="event.preventDefault(); document.getElementById('logout-form-mobile').submit();">
                                            <i class="fas fa-sign-out-alt mr-2"></i>Cerrar sesión
                                        </a>
                                        <form id="logout-form-mobile" action="{{ route('logout') }}" method="POST" class="d-none">
                                            @csrf
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="dashboard-wrapper">
                @yield('content')
            </div>
        </div>

        <style>
            /* CORRECCIONES ESPECÍFICAS MÍNIMAS */
            
            /* 1. Eliminar espacio extra arriba del contenido */
            .dashboard-wrapper {
                background: #f8f9fa !important;
                padding-top: 0 !important;
                margin-top: 70px !important;
            }
            
            /* 2. Asegurar que el sidebar sea completamente visible en desktop */
            @media (min-width: 992px) {
                .nav-left-sidebar {
                    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
                    top: 70px !important;
                }
                
                .dashboard-wrapper {
                    margin-left: 264px !important;
                }
            }
            
            /* 3. Hacer visible el menú móvil */
            @media (max-width: 991.98px) {
                .nav-left-sidebar {
                    left: -264px !important;
                    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
                    padding-top: 70px !important;
                }
                
                .nav-left-sidebar.mobile-active {
                    display: block !important;
                    left: 0 !important;
                    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
                    z-index: 9999 !important;
                }
                
                .nav-left-sidebar .nav-link {
                    color: #ffffff !important;
                    display: block !important;
                }
                
                .nav-left-sidebar .navbar-nav {
                    display: block !important;
                }
                
                .dashboard-wrapper {
                    margin-left: 0 !important;
                }
            }
            
            /* Navbar original */
            .navbar {
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                z-index: 1050;
                height: 70px;
            }
            
            /* Logo con color corporativo */
            .navbar-brand {
                color: #17a2b8 !important;
                font-weight: bold !important;
                font-size: 1.5rem !important;
                text-decoration: none !important;
            }
            
            .navbar-brand:hover {
                color: #138496 !important;
                text-decoration: none !important;
            }
            
            /* Botones de menú */
            .sidebar-toggle-btn,
            .mobile-menu-btn {
                background-color: #17a2b8 !important;
                border: none !important;
                color: white !important;
                padding: 8px 12px !important;
                border-radius: 6px !important;
                font-size: 16px !important;
                transition: all 0.3s ease !important;
                margin-right: 15px !important;
            }
            
            .sidebar-toggle-btn:hover,
            .sidebar-toggle-btn:focus,
            .mobile-menu-btn:hover,
            .mobile-menu-btn:focus {
                background-color: #138496 !important;
                color: white !important;
                outline: none !important;
                box-shadow: 0 0 0 3px rgba(23, 162, 184, 0.3) !important;
            }
            
            /* =================
               DISEÑO RESPONSIVE
               ================= */
            
            /* DESKTOP (≥992px) - Comportamiento original */
            @media (min-width: 992px) {
                .nav-left-sidebar {
                    position: fixed !important;
                    top: 70px !important;
                    left: 0 !important;
                    width: 250px !important;
                    height: calc(100vh - 70px) !important;
                    z-index: 1000 !important;
                    padding-top: 0 !important;
                    transition: transform 0.3s ease !important;
                    background: #343a40 !important;
                    overflow-y: auto !important;
                }
                
                .dashboard-wrapper {
                    margin-left: 250px !important;
                    padding-top: 70px !important;
                    transition: margin-left 0.3s ease !important;
                    min-height: calc(100vh - 70px) !important;
                    background: #f8f9fa !important;
                }
                
                /* Cuando el sidebar está oculto */
                .sidebar-hidden .nav-left-sidebar {
                    transform: translateX(-100%) !important;
                }
                
                .sidebar-hidden .dashboard-wrapper {
                    margin-left: 0 !important;
                }
            }
            
            /* TABLETS Y MÓVILES (<992px) */
            @media (max-width: 991.98px) {
                /* Sidebar oculto por defecto */
                .nav-left-sidebar {
                    position: fixed !important;
                    top: 0 !important;
                    left: -250px !important;
                    width: 250px !important;
                    height: 100vh !important;
                    z-index: 1040 !important;
                    padding-top: 70px !important;
                    transition: left 0.3s ease !important;
                    background: #343a40 !important;
                    overflow-y: auto !important;
                }
                
                /* Sidebar visible cuando está activo */
                .nav-left-sidebar.mobile-active {
                    left: 0 !important;
                }
                
                /* Contenido principal sin margen y sin espacio gris */
                .dashboard-wrapper {
                    margin-left: 0 !important;
                    padding-top: 70px !important;
                    min-height: calc(100vh - 70px) !important;
                    background: #ffffff !important;
                }
                
                /* Asegurar que los elementos del menú se vean en móvil */
                .nav-left-sidebar .navbar-nav {
                    display: block !important;
                    width: 100% !important;
                }
                
                .nav-left-sidebar .nav-item {
                    display: block !important;
                }
                
                .nav-left-sidebar .nav-link {
                    display: block !important;
                    color: #ffffff !important;
                    padding: 0.75rem 1rem !important;
                }
                
                /* Ocultar elementos de usuario del header en móvil */
                .navbar .navbar-nav {
                    display: none !important;
                }
                
                /* Overlay para cerrar el menú */
                .mobile-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1035;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .mobile-overlay.show {
                    opacity: 1;
                    visibility: visible;
                }
                
                /* Prevenir scroll cuando el menú está abierto */
                body.mobile-menu-open {
                    overflow: hidden;
                }
                
                /* Estilos para el menú de usuario móvil */
                .mobile-user-menu {
                    border-top: 1px solid #495057 !important;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    display: block !important;
                }
                
                .mobile-user-menu .nav-link {
                    color: #ffffff !important;
                    padding: 0.75rem 1rem !important;
                    transition: background-color 0.2s ease;
                    display: block !important;
                }
                
                .mobile-user-menu .nav-link:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    color: #ffffff !important;
                }
            }
            
            /* =================
               AJUSTES ESPECÍFICOS
               ================= */
            
            /* Para pantallas entre 992px y 1199px */
            @media (min-width: 992px) and (max-width: 1199.98px) {
                .sidebar-toggle-btn {
                    display: block !important;
                }
            }
            
            /* Dropdown del usuario */
            .dropdown-menu {
                border: 1px solid #dee2e6;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                top: 100% !important;
                transform: none !important;
            }
            
            .dropdown-item {
                padding: 10px 20px;
                transition: background-color 0.2s ease;
            }
            
            .dropdown-item:hover {
                background-color: #f8f9fa;
            }
            
            /* Asegurar que no haya espacios extra y fondos correctos */
            .dashboard-main-wrapper {
                min-height: 100vh;
                background: #ffffff;
            }
            
            /* Corregir cualquier padding/margin extra */
            .dashboard-wrapper {
                background: #ffffff !important;
            }
            
            /* Navbar fijo */
            .navbar {
                background: #ffffff !important;
                border-bottom: 1px solid #dee2e6;
            }
            
            /* Sidebar específico */
            .nav-left-sidebar {
                background: #343a40 !important;
            }
            
            .nav-left-sidebar .nav-link {
                color: #ffffff !important;
                padding: 0.75rem 1rem;
            }
            
            .nav-left-sidebar .nav-link:hover {
                background-color: rgba(255, 255, 255, 0.1);
                color: #ffffff !important;
            }
        </style>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Elementos del DOM
                const sidebarToggleBtn = document.getElementById('sidebarToggle');
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                const sidebar = document.querySelector('.nav-left-sidebar');
                const mainWrapper = document.querySelector('.dashboard-main-wrapper');
                const body = document.body;
                
                // Crear overlay para móviles
                let mobileOverlay = document.querySelector('.mobile-overlay');
                if (!mobileOverlay) {
                    mobileOverlay = document.createElement('div');
                    mobileOverlay.className = 'mobile-overlay';
                    body.appendChild(mobileOverlay);
                }
                
                // =================
                // FUNCIONALIDAD DESKTOP
                // =================
                if (sidebarToggleBtn) {
                    sidebarToggleBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Toggle clase en el wrapper principal
                        mainWrapper.classList.toggle('sidebar-hidden');
                        
                        // Guardar estado en localStorage
                        const isHidden = mainWrapper.classList.contains('sidebar-hidden');
                        localStorage.setItem('sidebarHidden', isHidden ? 'true' : 'false');
                    });
                    
                    // Restaurar estado del sidebar desde localStorage (solo para desktop)
                    if (window.innerWidth >= 992) {
                        const sidebarHidden = localStorage.getItem('sidebarHidden') === 'true';
                        if (sidebarHidden) {
                            mainWrapper.classList.add('sidebar-hidden');
                        }
                    }
                }
                
                // =================
                // FUNCIONALIDAD MÓVIL
                // =================
                if (mobileMenuToggle) {
                    mobileMenuToggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        const isActive = sidebar.classList.contains('mobile-active');
                        
                        if (isActive) {
                            // Cerrar menú móvil
                            sidebar.classList.remove('mobile-active');
                            mobileOverlay.classList.remove('show');
                            body.classList.remove('mobile-menu-open');
                        } else {
                            // Abrir menú móvil
                            sidebar.classList.add('mobile-active');
                            mobileOverlay.classList.add('show');
                            body.classList.add('mobile-menu-open');
                        }
                    });
                }
                
                // Cerrar menú móvil al hacer click en overlay
                if (mobileOverlay) {
                    mobileOverlay.addEventListener('click', function() {
                        sidebar.classList.remove('mobile-active');
                        mobileOverlay.classList.remove('show');
                        body.classList.remove('mobile-menu-open');
                    });
                }
                
                // Cerrar menú móvil al hacer click en un enlace del menú
                const menuLinks = sidebar.querySelectorAll('.nav-link');
                menuLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        if (window.innerWidth < 992) {
                            setTimeout(() => {
                                sidebar.classList.remove('mobile-active');
                                mobileOverlay.classList.remove('show');
                                body.classList.remove('mobile-menu-open');
                            }, 150);
                        }
                    });
                });
                
                // =================
                // MANEJO DE RESIZE
                // =================
                window.addEventListener('resize', function() {
                    if (window.innerWidth >= 992) {
                        // Limpiar clases móviles al cambiar a desktop
                        sidebar.classList.remove('mobile-active');
                        mobileOverlay.classList.remove('show');
                        body.classList.remove('mobile-menu-open');
                        
                        // Restaurar estado del sidebar desde localStorage
                        const sidebarHidden = localStorage.getItem('sidebarHidden') === 'true';
                        if (sidebarHidden) {
                            mainWrapper.classList.add('sidebar-hidden');
                        } else {
                            mainWrapper.classList.remove('sidebar-hidden');
                        }
                    } else {
                        // Limpiar clases de desktop al cambiar a móvil
                        mainWrapper.classList.remove('sidebar-hidden');
                    }
                });
                
                // =================
                // INICIALIZACIÓN
                // =================
                
                // Asegurar estado correcto al cargar
                if (window.innerWidth < 992) {
                    mainWrapper.classList.remove('sidebar-hidden');
                    sidebar.classList.remove('mobile-active');
                    mobileOverlay.classList.remove('show');
                    body.classList.remove('mobile-menu-open');
                }
            });
        </script>
    </body>
</html>
