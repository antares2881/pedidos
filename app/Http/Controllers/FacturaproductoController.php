<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Facturaproducto;

class FacturaproductoController extends Controller
{
    public function show($id){
        $productos = Facturaproducto::with(['detalleproducto', 'productos', 'presentaciones'])->where('factura_id', $id)->get();
        return response()->json($productos, 200);
    }
}
