<?php
require_once __DIR__ . '/vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Contracts\Http\Kernel;

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

// Ahora podemos usar Laravel
$promocion = new App\Promocion();
$promocion->nombre_archivo = 'promociones_ejemplo.xlsx';
$promocion->archivo = 'promociones_ejemplo.xlsx';
$promocion->save();

echo "Promoción creada con ID: " . $promocion->id . "\n";
echo "Nombre: " . $promocion->nombre_archivo . "\n";
echo "Archivo: " . $promocion->archivo . "\n";
echo "Fecha: " . $promocion->created_at . "\n";
?>