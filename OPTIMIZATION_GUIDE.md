# Comandos para optimización adicional

# 1. Verificar extensiones activas en VS Code
# Ve a: Ctrl+Shift+X y revisa las extensiones instaladas

# 2. Aumentar memoria disponible para Node.js (si usas npm)
npm config set max-old-space-size=4096

# 3. Limpiar npm cache
npm cache clean --force

# 4. Si usas Git, optimizar el repositorio
git gc --aggressive --prune=now

# 5. Configurar exclusiones adicionales en .gitignore si es necesario
# Añadir estos a .gitignore:
# /.vscode/
# /storage/debugbar/
# /storage/framework/cache/
# /storage/framework/sessions/
# /storage/framework/views/

# 6. Comandos de sistema para liberar memoria
# Abrir como administrador y ejecutar:
# sfc /scannow
# cleanmgr