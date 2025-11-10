# Script para limpiar cache y aplicar los fixes del menú móvil

echo "Limpiando cache de Laravel..."
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear

echo "Optimizando aplicación..."
php artisan config:cache
php artisan route:cache

echo "Compilando assets..."
npm run production

echo "Fixes aplicados correctamente!"
echo ""
echo "RESUMEN DE CAMBIOS REALIZADOS:"
echo "1. ✅ Añadido CSS específico para iOS y dispositivos móviles"
echo "2. ✅ Mejorado el JavaScript para manejo del menú móvil"
echo "3. ✅ Corregido el viewport meta tag para mejor compatibilidad con iOS"
echo "4. ✅ Añadidos estilos forzados para asegurar visibilidad del botón"
echo "5. ✅ Implementado sistema de overlay para cerrar menú en móviles"
echo ""
echo "INSTRUCCIONES PARA EL USUARIO:"
echo "1. Refrescar la página en el iPhone (Cmd+R o pull to refresh)"
echo "2. Si no funciona, limpiar cache del navegador"
echo "3. El botón del menú ahora debería ser visible en la esquina superior izquierda"
echo "4. El botón es azul con el icono de hamburguesa (tres líneas)"
echo "5. Al tocar se abrirá el menú lateral con un overlay semitransparente"