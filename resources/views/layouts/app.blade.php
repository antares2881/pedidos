<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

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
                    <button class="sidebar-toggle-btn" type="button" id="sidebarToggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <a class="navbar-brand" href="/">Pedidos App</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto navbar-right-top">
                            <li class="nav-item dropdown nav-user">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <i class="fas fa-angle-down ml-2"></i>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('updatePassword') }}">
                                        <i class="fas fa-sign-out-alt mr-2"></i> Cambiar contraseña
                                    </a>
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                        document.getElementById('logout-form').submit();">
                                        <i class="fas fa-sign-out-alt mr-2"></i>{{ __('Logout') }}
                                    </a>
                                    
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>                            
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="nav-left-sidebar sidebar-dark">
                <div class="menu-list">
                    <nav class="navbar navbar-expand-lg navbar-light">
                        <a class="d-xl-none d-lg-none" href="#"></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
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
                        </div>
                    </nav>
                </div>
            </div>
            <div class="dashboard-wrapper">
                @yield('content')
            </div>
        </div>

        <style>
            /* Botón para ocultar/mostrar sidebar */
            .sidebar-toggle-btn {
                background: none;
                border: none;
                font-size: 18px;
                color: #6c757d;
                padding: 8px 12px;
                margin-right: 15px;
                border-radius: 4px;
                transition: all 0.3s ease;
            }

            .sidebar-toggle-btn:hover {
                background-color: #f8f9fa;
                color: #495057;
            }

            .sidebar-toggle-btn:focus {
                outline: none;
                box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
            }

            /* Estados del sidebar */
            .sidebar-hidden .nav-left-sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }

            .nav-left-sidebar {
                transition: transform 0.3s ease;
            }

            /* Ajustar el contenido principal cuando se oculta el sidebar */
            .sidebar-hidden .dashboard-wrapper {
                margin-left: 0;
                transition: margin-left 0.3s ease;
            }

            .dashboard-wrapper {
                transition: margin-left 0.3s ease;
            }

            /* Responsive adjustments */
            @media (max-width: 1199px) {
                .sidebar-toggle-btn {
                    display: none;
                }
            }

            /* Animation for the toggle icon */
            .sidebar-toggle-btn i {
                transition: transform 0.3s ease;
            }

            .sidebar-hidden .sidebar-toggle-btn i {
                transform: rotate(90deg);
            }

            /* Estilo para el título de la aplicación */
            .navbar-brand {
                color: #17a2b8 !important;
                font-weight: bold !important;
                text-decoration: none !important;
            }

            .navbar-brand:hover {
                color: #138496 !important;
                text-decoration: none !important;
            }
        </style>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const toggleBtn = document.getElementById('sidebarToggle');
                const mainWrapper = document.querySelector('.dashboard-main-wrapper');
                
                // Recuperar el estado del sidebar desde localStorage
                const sidebarHidden = localStorage.getItem('sidebarHidden') === 'true';
                if (sidebarHidden) {
                    mainWrapper.classList.add('sidebar-hidden');
                }

                toggleBtn.addEventListener('click', function() {
                    mainWrapper.classList.toggle('sidebar-hidden');
                    
                    // Guardar el estado en localStorage
                    const isHidden = mainWrapper.classList.contains('sidebar-hidden');
                    localStorage.setItem('sidebarHidden', isHidden);
                    
                    // Trigger resize event para que los componentes Vue se ajusten
                    setTimeout(() => {
                        window.dispatchEvent(new Event('resize'));
                    }, 300);
                });

                // También agregar la funcionalidad con tecla de acceso rápido (Shift + S)
                document.addEventListener('keydown', function(e) {
                    if (e.shiftKey && e.key === 'S') {
                        e.preventDefault();
                        toggleBtn.click();
                    }
                });
            });
        </script>
    </body>
</html>
