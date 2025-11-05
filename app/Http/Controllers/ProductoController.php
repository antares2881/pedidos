<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Composicione;
use App\Detalleproducto;
use App\Producto;

class ProductoController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function index(Request $request){
        $productos = Producto::with(['categorias'])->orderBy('producto', 'asc')->get();
        if($request->ajax()){
            return $productos;
        }else{
            return view('admin.productos.index', compact('productos'));
        }
    }

    public function show($id){
        $productos = Producto::with(['detalle', 'presentaciones'])->find($id);
        
        return view('admin.productos.show', compact('productos'));
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'categoria_id' => 'required',
            'laboratorio_id' => 'required',
            'producto' => 'required|unique:productos',
            'descripcion' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $producto = new Producto();
        $producto->categoria_id = $request->categoria_id;
        $producto->laboratorio_id = $request->laboratorio_id;
        $producto->producto = strtoupper($request->producto);
        $producto->descripcion = $request->descripcion;
        $producto->precauciones = $request->precauciones;

        $producto->save();

        return 'ok';

    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'categoria_id' => 'required',
            'producto' => 'required',
            'descripcion' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $producto = Producto::find($id);

        $producto->categoria_id = $request->categoria_id;
        $producto->laboratorio_id = $request->laboratorio_id;
        $producto->producto = strtoupper($request->producto);
        $producto->descripcion = $request->descripcion;
        $producto->precauciones = $request->precauciones;

        $producto->save();

        return 'ok';

    }
}
