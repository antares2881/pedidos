<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Productotransferencia;

class ProductotransferenciaController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function show($id){
        $productos = Productotransferencia::with(['detalleproductos', 'productos', 'presentaciones'])->where('transferencia_id', $id)->get();

        return $productos;
    }
}
