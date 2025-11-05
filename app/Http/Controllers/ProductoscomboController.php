<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Productoscombo;

class ProductoscomboController extends Controller
{
    public function getComboProducto($id){
        $productoscombo = Productoscombo::with(['detallecombo'])->where('detalleproducto_id', $id)->get();
        return $productoscombo;
    }

    public function index(Request $request){

        if($request->ajax()){
            $productoscombo = Productoscombo::with(['productos', 'presentaciones'])->get();
            return $productoscombo;
        }
        
        return view('admin.productos-combo.index');
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'detalleproducto_id' => 'required|unique:productoscombos'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $producto = new Productoscombo();
        $producto->detalleproducto_id = $request->detalleproducto_id;

        $producto->save();

        return 'ok';
    }
}
