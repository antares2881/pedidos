<!doctype html>
<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Ingresar - Sistema de Pedidos</title>

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link rel="stylesheet" href="{{asset('assets/vendor/fonts/fontawesome/css/fontawesome-all.css')}}">
        <link href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">        
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        
        <style>
            /* Professional Login Styles */
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #20a39e 0%, #17a2b8 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }

            .login-container {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                padding: 3rem;
                width: 100%;
                max-width: 450px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.2);
                position: relative;
                overflow: hidden;
            }

            .login-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #3b82f6, #17a2b8, #06b6d4);
                border-radius: 20px 20px 0 0;
            }

            .login-header {
                text-align: center;
                margin-bottom: 2.5rem;
            }

            .login-title {
                font-size: 2rem;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.75rem;
            }

            .login-subtitle {
                font-size: 1rem;
                color: #64748b;
                font-weight: 500;
            }

            .form-group {
                margin-bottom: 1.5rem;
                position: relative;
            }

            .form-label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #374151;
                font-size: 0.9rem;
            }

            .input-container {
                position: relative;
            }

            .input-icon {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: #64748b;
                font-size: 1rem;
                z-index: 2;
            }

            .form-input {
                width: 100%;
                padding: 1rem 1rem 1rem 3rem;
                border: 2px solid #e5e7eb;
                border-radius: 12px;
                font-size: 1rem;
                background: #f8fafc;
                color: #374151;
                outline: none;
                transition: all 0.3s ease;
                font-weight: 500;
            }

            .form-input:focus {
                border-color: #3b82f6;
                background: white;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }

            .form-input.is-invalid {
                border-color: #ef4444;
                background: #fef2f2;
            }

            .form-input.is-invalid:focus {
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }

            .invalid-feedback {
                display: block;
                margin-top: 0.5rem;
                font-size: 0.875rem;
                color: #ef4444;
                font-weight: 500;
            }

            .remember-container {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 2rem;
            }

            .remember-checkbox {
                width: 18px;
                height: 18px;
                border: 2px solid #d1d5db;
                border-radius: 4px;
                cursor: pointer;
                accent-color: #3b82f6;
            }

            .remember-label {
                font-size: 0.9rem;
                color: #64748b;
                font-weight: 500;
                cursor: pointer;
                user-select: none;
            }

            .login-btn {
                width: 100%;
                padding: 1rem 2rem;
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
                position: relative;
                overflow: hidden;
            }

            .login-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            }

            .login-btn:active {
                transform: translateY(0);
            }

            .login-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
            }

            /* Loading state */
            .login-btn.loading {
                position: relative;
                color: transparent !important;
                pointer-events: none;
                background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%) !important;
                box-shadow: none !important;
                transform: none !important;
            }

            .login-btn.loading::before {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 2;
            }

            .login-btn.loading::after {
                content: 'Verificando...';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-weight: 600;
                font-size: 0.9rem;
                white-space: nowrap;
                z-index: 1;
                margin-left: 35px;
            }

            /* Professional Loader Overlay */
            .login-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(8px);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 99999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .login-overlay.active {
                display: flex;
                opacity: 1;
            }

            .loader-container {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                padding: 3rem 2rem;
                text-align: center;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transform: scale(0.8);
                animation: fadeInScale 0.3s ease forwards;
            }

            .professional-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid #e5e7eb;
                border-top: 4px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1.5rem;
            }

            .loader-title {
                color: #1e293b;
                font-size: 1.25rem;
                font-weight: 700;
                margin: 0 0 0.5rem 0;
            }

            .loader-subtitle {
                color: #64748b;
                font-size: 0.9rem;
                font-weight: 500;
                margin: 0;
                line-height: 1.5;
            }

            .loading-progress {
                width: 100%;
                max-width: 200px;
                height: 4px;
                background: #e5e7eb;
                border-radius: 2px;
                margin: 1.5rem auto 0;
                overflow: hidden;
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #3b82f6, #2563eb);
                border-radius: 2px;
                animation: progress 2s ease-in-out infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @keyframes fadeInScale {
                0% { 
                    opacity: 0;
                    transform: scale(0.8);
                }
                100% { 
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes progress {
                0% { transform: translateX(-100%); }
                50% { transform: translateX(0%); }
                100% { transform: translateX(100%); }
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                body {
                    padding: 1rem;
                }
                
                .login-container {
                    padding: 2rem;
                    border-radius: 16px;
                }
                
                .login-title {
                    font-size: 1.75rem;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .form-input {
                    padding: 0.875rem 0.875rem 0.875rem 2.75rem;
                }
            }

            @media (max-width: 480px) {
                .login-container {
                    padding: 1.5rem;
                }
                
                .login-title {
                    font-size: 1.5rem;
                }
            }
        </style>
    </head>
    <body>
        <!-- Professional Loader Overlay -->
        <div class="login-overlay" id="loginOverlay">
            <div class="loader-container">
                <div class="professional-spinner"></div>
                <h3 class="loader-title">Verificando credenciales</h3>
                <p class="loader-subtitle">Iniciando sesión en el sistema...</p>
                <div class="loading-progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        </div>

        <div class="login-container" id="app">
            <!-- Professional Header -->
            <div class="login-header">
                <h1 class="login-title">
                    <span>🔐</span>
                    Iniciar sesión
                </h1>
                <p class="login-subtitle">
                    Accede a tu sistema de gestión de pedidos
                </p>
            </div>

            <!-- Login Form -->
            <form method="POST" action="{{ route('login') }}">
                @csrf
                
                <!-- Email Field -->
                <div class="form-group">
                    <label for="email" class="form-label">Correo electrónico</label>
                    <div class="input-container">
                        <i class="fas fa-user input-icon"></i>
                        <input 
                            id="email" 
                            type="email" 
                            class="form-input @error('email') is-invalid @enderror" 
                            name="email" 
                            value="{{ old('email') }}" 
                            required 
                            autocomplete="email" 
                            placeholder="tu@email.com"
                            autofocus
                        >
                    </div>
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <!-- Password Field -->
                <div class="form-group">
                    <label for="password" class="form-label">Contraseña</label>
                    <div class="input-container">
                        <i class="fas fa-lock input-icon"></i>
                        <input 
                            id="password" 
                            type="password" 
                            class="form-input @error('password') is-invalid @enderror" 
                            name="password" 
                            required 
                            autocomplete="current-password" 
                            placeholder="Tu contraseña segura"
                        >
                    </div>
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>

                <!-- Remember Me -->
                <div class="remember-container">
                    <input 
                        type="checkbox" 
                        name="remember" 
                        id="remember" 
                        class="remember-checkbox"
                        {{ old('remember') ? 'checked' : '' }}
                    >
                    <label for="remember" class="remember-label">
                        Recordar mis credenciales
                    </label>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="login-btn" id="loginSubmitBtn" onclick="handleLoginClick()">
                    Entrar al Sistema
                </button>
            </form>
        </div>

        @verbatim
        <script>
            console.log('🔄 Cargando script de login...');

            // Función global para mostrar el loader
            function showLoginLoader() {
                console.log('🚀 Ejecutando showLoginLoader');
                
                try {
                    const loginBtn = document.getElementById('loginSubmitBtn');
                    const overlay = document.getElementById('loginOverlay');
                    
                    console.log('Elementos:', { loginBtn: !!loginBtn, overlay: !!overlay });
                    
                    if (!loginBtn || !overlay) {
                        console.error('❌ No se encontraron los elementos del loader');
                        return;
                    }
                    
                    // Cambiar botón
                    loginBtn.textContent = 'Verificando...';
                    loginBtn.disabled = true;
                    loginBtn.style.backgroundColor = '#6b7280';
                    loginBtn.style.color = 'white';
                    loginBtn.classList.add('loading');
                    
                    // Mostrar overlay
                    overlay.style.display = 'flex';
                    overlay.style.opacity = '1';
                    overlay.classList.add('active');
                    
                    console.log('✅ Loader mostrado correctamente');
                    
                } catch (error) {
                    console.error('❌ Error en showLoginLoader:', error);
                }
            }

            // Función global para el click del botón
            function handleLoginClick() {
                console.log('👆 handleLoginClick ejecutado');
                
                try {
                    const email = document.getElementById('email');
                    const password = document.getElementById('password');
                    const form = document.querySelector('form');
                    
                    console.log('Campos:', { 
                        email: email ? email.value.length : 0, 
                        password: password ? password.value.length : 0 
                    });
                    
                    if (email && password && email.value.trim() && password.value.trim()) {
                        console.log('✅ Campos válidos - activando loader');
                        showLoginLoader();
                        
                        // Enviar el formulario después de mostrar el loader
                        setTimeout(() => {
                            console.log('📤 Enviando formulario...');
                            if (form) {
                                form.submit();
                            } else {
                                console.error('❌ No se encontró el formulario');
                            }
                        }, 300);
                        
                    } else {
                        console.log('❌ Campos incompletos');
                    }
                } catch (error) {
                    console.error('❌ Error en handleLoginClick:', error);
                }
            }

            // Verificar que las funciones están disponibles
            console.log('🧪 Funciones definidas:', {
                handleLoginClick: typeof handleLoginClick,
                showLoginLoader: typeof showLoginLoader
            });

            // Cuando el DOM está listo
            document.addEventListener('DOMContentLoaded', function() {
                console.log('📄 DOM cargado');
                
                const form = document.querySelector('form');
                const inputs = document.querySelectorAll('.form-input');
                
                // Efectos básicos para los inputs
                inputs.forEach(input => {
                    const icon = input.parentElement.querySelector('.input-icon');
                    
                    input.addEventListener('focus', function() {
                        if (icon) {
                            icon.style.color = '#3b82f6';
                            icon.style.transform = 'translateY(-50%) scale(1.1)';
                        }
                    });
                    
                    input.addEventListener('blur', function() {
                        if (icon) {
                            icon.style.color = '#64748b';
                            icon.style.transform = 'translateY(-50%) scale(1)';
                        }
                    });
                });

                // Focus automático en el primer input
                if (inputs.length > 0) {
                    inputs[0].focus();
                }
                
                console.log('✅ Script inicializado correctamente');
            });
        </script>
        @endverbatim
    </body>
</html>

