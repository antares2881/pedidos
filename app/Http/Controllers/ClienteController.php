<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Cliente;

class ClienteController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function index(Request $request){

        if($request->ajax()){
            $clientes = Cliente::with(['estado', 'municipios'])->get();
            return $clientes;
        }

        return view('admin.clientes.index');

    }

    public function getCliente(){

        $cliente = Cliente::where(Auth::user()->user_id)->get();
        return $cliente;
        
    }

    public function show($id){
        $cliente = Cliente::with(['departamentos','municipios'])->find($id);
        return $cliente;
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'municipio_id' => 'required',
            'tipocliente_id' => 'required',
            'nit' => 'required',
            'dv' => 'required',
            'razon_social' => 'required',
            'direccion' => 'required',
            'telefono' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $cliente = new Cliente();
        $cliente->municipio_id = $request->municipio_id;
        $cliente->tipocliente_id = $request->tipocliente_id;
        $cliente->estado_id = 9;
        $cliente->nit = $request->nit;
        $cliente->dv = $request->dv;
        $cliente->razon_social = strtoupper($request->razon_social);
        $cliente->contacto_comercial = $request->contacto_comercial;
        $cliente->email = $request->email;
        $cliente->direccion = $request->direccion;
        $cliente->telefono = $request->telefono;
        if($request->aplicaretencion){
            $cliente->aplicaretencion = 1;
        }else{
            $cliente->aplicaretencion = 0;
        }

        $cliente->save();

        return $cliente;

    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'municipio_id' => 'required',
            'tipocliente_id' => 'required',
            'nit' => 'required',
            'dv' => 'required',
            'razon_social' => 'required',
            'direccion' => 'required',
            'telefono' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $cliente = Cliente::find($id);
        $cliente->municipio_id = $request->municipio_id;
        $cliente->tipocliente_id = $request->tipocliente_id;
        $cliente->estado_id = $request->estado_id;
        $cliente->nit = $request->nit;
        $cliente->dv = $request->dv;
        $cliente->razon_social = strtoupper($request->razon_social);
        $cliente->contacto_comercial = $request->contacto_comercial;
        $cliente->email = $request->email;
        $cliente->direccion = $request->direccion;
        $cliente->telefono = $request->telefono;
        if($request->aplicaretencion){
            $cliente->aplicaretencion = 1;
        }else{
            $cliente->aplicaretencion = 0;
        }


        $cliente->save();

        return 'ok';

    }
}
