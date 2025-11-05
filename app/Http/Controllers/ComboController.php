<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Combo;
use App\Detalleproducto;
use App\Productoscombo;

class ComboController extends Controller
{
    public function armarCombo(Request $request){

        $producto = Detalleproducto::find($request->combo);
        $producto->stock = $request->stockCombo + $request->cantidad;
        $producto->save();

        for ($i=0; $i < count($request->productos); $i++) { 
            $detalleproducto = Detalleproducto::find($request->productos[$i]['id']);
            $detalleproducto->stock = $request->productos[$i]['stock'] - $request->cantidad;
            $detalleproducto->save();
        }

        return 'ok';
    }
    public function dividirCombo(Request $request){

        $producto = Detalleproducto::find($request->combo);
        $producto->stock = $request->stockCombo - $request->cantidad;
        $producto->save();

        for ($i=0; $i < count($request->productos); $i++) { 
            $detalleproducto = Detalleproducto::find($request->productos[$i]['id']);
            $detalleproducto->stock = $request->productos[$i]['stock'] + $request->cantidad;
            $detalleproducto->save();
        }     

        return 'ok';
    }
    
    public function index(Request $request){
        if($request->ajax()){             
            $combos = DB::table('combos AS c')
                ->join('detalleproductos AS dp', 'c.detalleproducto_id', '=', 'dp.id')
                ->join('productos AS p', 'dp.producto_id', '=', 'p.id')
                ->join('presentaciones AS pr', 'dp.presentacione_id', '=', 'pr.id')
                ->join('productoscombos AS pc', 'c.productoscombo_id', '=', 'pc.id')
                ->join('detalleproductos AS dpr', 'pc.detalleproducto_id', '=', 'dpr.id')
                ->join('productos AS pro', 'dpr.producto_id', '=', 'pro.id')
                ->join('presentaciones AS pre', 'dpr.presentacione_id', '=', 'pre.id')
                ->select('p.producto', 'c.id', 'pr.presentacion', 'c.detalleproducto_id', 'pre.presentacion as presentacion_producto', 'pro.producto as nombre_producto')
                ->orderBy('c.detalleproducto_id', 'asc')
                ->get();
            return $combos;
        }

        return view('admin.combos.index');
    }

    public function gestionCombos(){
        return view('inventarios.gestion-combos.index');
    }

    public function show($id){
        return Combo::with(['detalle', 'detalleproductos' ,'productos'])->where('detalleproducto_id', $id)->get();
    }

    public function prueba(){
        return Combo::with(['detalleproductos' ,'productos'])->where('detalleproducto_id', 142)->get();

        return $productocombo = Productoscombo::with(['combos' ,'detalleproductos'])->where('detalleproducto_id', 72)->get();
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'detalleproducto_id' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        for ($i=0; $i < count($request->items) ; $i++) { 
            
            $combo = new Combo();
            $combo->detalleproducto_id = $request->detalleproducto_id;
            $combo->productoscombo_id = $request->items[$i]['value'];
    
            $combo->save();
        }


        return 'ok';
    }
}
