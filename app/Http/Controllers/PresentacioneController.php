<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Presentacione;

class PresentacioneController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function index(Request $request){
        if($request->ajax()){
            $presentaciones = Presentacione::all();
            return $presentaciones;
        }
        return view('admin.presentaciones.index');
    }

    public function store(Request $request){

        $presentacion = new Presentacione();
        $presentacion->presentacion = $request->presentacion;
        $presentacion->save();
        return 'ok';

    }
    public function update(Request $request, $id){

        $presentacion = Presentacione::find($id);
        $presentacion->presentacion = $request->presentacion;
        $presentacion->save();

        return 'ok';
    }
}
