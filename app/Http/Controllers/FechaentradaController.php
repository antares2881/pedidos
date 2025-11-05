<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FechaentradaController extends Controller
{
    public function buscarPrecioEntrada($producto){

        $entradas = DB::select('SELECT v.numero_factura, v.fecha_factura,  fe.cantidad, fe.adicionales, fe.precio_entrada FROM fechaentradas as fe 
            INNER JOIN ventas as v ON fe.venta_id = v.id 
            WHERE fe.detalleproducto_id = ? AND v.cliente_id = 3 
            ORDER by fe.created_at DESC', [$producto]);

        return $entradas;
    }
}
