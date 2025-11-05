<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Detalleproducto;
use App\Listaprecio;

class ListaprecioController extends Controller
{
    public function historyPrice($codigo){
        $history = DB::table('fechaentradas as f')
            ->join('ventas as v', 'f.venta_id', '=', 'v.id')
            ->join('detalleproductos as dp', 'f.detalleproducto_id', '=', 'dp.id')
            ->join('productos as p', 'dp.producto_id', '=', 'p.id')
            ->join('presentaciones as pr', 'dp.presentacione_id', '=', 'pr.id')
            ->join('clientes as c', 'v.cliente_id', '=', 'c.id')
            ->select('c.razon_social', 'p.producto', 'pr.presentacion', 'v.num_pedido', 'f.precio_entrada', 'f.cantidad', 'f.adicionales', 'f.created_at')
            ->where('c.nit', 6866196)
            ->where('dp.codigo', $codigo)
            ->orderBy('p.producto', 'ASC')
            ->orderBy('v.num_pedido', 'DESC')
            ->orderBy('f.created_at', 'DESC')
            ->paginate(5);
        
        return $history;
    }

    public function show($id){

        $listaprecios = DB::select("SELECT p.laboratorio_id, l.Laboratorio, l.logo, lp.codigo, c.categoria, p.categoria_id, p.producto, p.descripcion, p.imagen, p.precauciones, dp.id, dp.producto_id, dp.presentacione_id, dp.fecha_vence, pr.presentacion, dp.stock, lp.precio, lp.tipolista_id, lp.impuesto, t.tipo_lista FROM listaprecios as lp 
        INNER JOIN tipolistas as t ON lp.tipolista_id = t.id
        INNER JOIN detalleproductos as dp ON lp.codigo = dp.codigo
        INNER JOIN productos as p ON dp.producto_id = p.id
        INNER JOIN presentaciones as pr ON dp.presentacione_id = pr.id
        INNER JOIN categorias as c ON p.categoria_id = c.id
        INNER JOIN laboratorios as l ON p.laboratorio_id = l.id
        WHERE lp.tipolista_id = $id
        ORDER BY p.producto ASC");

        return $listaprecios;
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'producto_id' => 'required',
            'presentacione_id' => 'required',
            'codigo' => 'required|unique:detalleproductos',
            'precio' => 'required',
            'stock' => 'required',
            'tipolista_id' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $producto = new Detalleproducto();
        $producto->producto_id = $request->producto_id;
        $producto->presentacione_id = $request->presentacione_id;
        $producto->codigo = $request->codigo;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->fecha_vence = $request->fecha_vence;
        $producto->save();

        $listaprecio = new Listaprecio();
        $listaprecio->codigo = $request->codigo;
        $listaprecio->tipolista_id = $request->tipolista_id;
        $listaprecio->precio = $request->precio;
        $listaprecio->impuesto = $request->impuesto;

        $listaprecio->save();

        $item = DB::select("SELECT p.laboratorio_id, lp.codigo, c.categoria, p.producto, dp.id as detalleproducto_id, dp.producto_id, dp.presentacione_id, dp.fecha_vence, pr.presentacion, dp.stock, lp.precio, lp.tipolista_id, lp.impuesto, t.tipo_lista FROM listaprecios as lp 
        INNER JOIN tipolistas as t ON lp.tipolista_id = t.id
        INNER JOIN detalleproductos as dp ON lp.codigo = dp.codigo
        INNER JOIN productos as p ON dp.producto_id = p.id
        INNER JOIN presentaciones as pr ON dp.presentacione_id = pr.id
        INNER JOIN categorias as c ON p.categoria_id = c.id
        WHERE lp.id = $listaprecio->id ");

        return $item;
    }

    public function update(Request $request, $codigo){

        $validator = Validator::make($request->all(), [            
            'precio' => 'required',
            'stock' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $producto = Detalleproducto::where('codigo', $codigo)->first();
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->fecha_vence = $request->fecha_vence;
        $producto->save();

        $listaprecio = Listaprecio::where('codigo', $codigo)->first();
        $listaprecio->precio = $request->precio;
        $listaprecio->impuesto = $request->impuesto;

        $listaprecio->save();

        return 'ok';
    }
}
