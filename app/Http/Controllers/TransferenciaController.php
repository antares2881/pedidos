<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Cliente;
use App\Detalleproducto;
use App\Factura;
use App\Facturaproducto;
use App\Faltantexpedido;
use App\Mayorista;
use PDF;
use App\Productotransferencia;
use App\Transferencia;

class TransferenciaController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function consecutivoTransferencia(){
        $consecutivo = DB::table('transferencias')
            ->select(DB::raw('MAX(numero) as consecutivo'))
            ->get();
        return $consecutivo;
    }

    public function imprimirRemision($id){
        $productos = Facturaproducto::with('detalleProducto', 'presentaciones', 'productos')->where('factura_id', $id)->get();   

        $mayorista = Mayorista::find('2');

        $factura = Factura::find($id);

        // return $factura;

        $mundep_cliente = Cliente::find($factura->cliente_id);

        $pdf = PDF::loadView('imprimir.remision.index', compact('mundep_cliente', 'productos', 'factura'));
        $nombre_remision = 'remision_'.$mundep_cliente->razon_social.time().'.pdf';
        return $pdf->stream($nombre_remision);

    }

    public function imprimirTransferencia($id){
        $transferencia = Transferencia::with(['clientes', 'municipios'])->find($id);
        $productos = Productotransferencia::with('detalleproductos', 'presentaciones', 'productos')->where('transferencia_id', $id)->get();
        $mundep_cliente = Cliente::find($transferencia->cliente_id);
        $pdf = PDF::loadView('imprimir.transferencia.index', compact('mundep_cliente', 'productos', 'transferencia'));
        
        return $pdf->stream('transferencia.pdf');
    }

    public function nueva_vista($num = 0){
        return view('home', compact('num'));
    }
    
    public function index(Request $request){

        if($request->ajax()){
            if(Auth::user()->role_id == 1){
                $transferencias = Transferencia::with(['clientes', 'estados', 'factura', 'productos'])
                ->orderBy('numero', 'desc')
                ->get();
            }else{
                $cliente = Cliente::where('user_id', Auth::user()->id)->get();
                $transferencias = Transferencia::with(['clientes', 'estados', 'factura', 'productos'])->where('cliente_id', $cliente[0]->id)->get();
            }
            return $transferencias;
        }else{
            return view('transferencias.index');
        }
        
    }

    public function findNumberTransferencia($numero){
        if(Auth::user()->role_id == 1){
            $transferencia = Transferencia::with(['clientes', 'mayoristas', 'productos'])->where('numero', $numero)->get();
        }else{
            $transferencia = Transferencia::with(['clientes', 'mayoristas', 'productos'])
                ->where(
                    ['numero' =>  $numero],
                    ['user_id' => Auth::user()->id]
                )->get();
        }
        return $transferencia;
    }

    public function pendientes(){
        $pendientes = DB::select("SELECT c.razon_social, d.nombre_dpto, m.mcpio, t.id, t.numero, t.valor, t.fecha FROM transferencias as t
            INNER JOIN clientes as c ON t.cliente_id = c.id
            INNER JOIN municipios as m ON c.municipio_id = m.id
            INNER JOIN departamentos as d ON m.departamento_id = d.id
            WHERE t.estado_id = 1
            ORDER BY fecha ASC, numero ASC");
        return $pendientes;
    }

    public function updateState($id){
        
        $transferencia = Transferencia::find($id);
        $transferencia->estado_id = 3;
        $transferencia->save();

        return 'ok';
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required',
            'numero' => 'required|unique:transferencias',
            'fecha' => 'required',
            'total' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $transferencia = new Transferencia();
        $transferencia->cliente_id = $request->cliente_id;
        $transferencia->mayorista_id = 2;
        $transferencia->estado_id = 1;
        $transferencia->user_id = Auth::user()->id;
        $transferencia->numero = $request->numero;
        $transferencia->fecha = $request->fecha;
        $transferencia->valor = $request->total;

        $transferencia->save();

        for ($i=0; $i < count($request->pedidos); $i++) { 

            $producto_transferencia = new Productotransferencia();
            $producto_transferencia->detalleproducto_id = $request->pedidos[$i]['id'];
            $producto_transferencia->transferencia_id = $transferencia->id;
            $producto_transferencia->cantidad = $request->pedidos[$i]['cantidad'];
            $producto_transferencia->entregados = 0;
            $producto_transferencia->bonificacion = $request->pedidos[$i]['bonificacion'];
            $producto_transferencia->precio = $request->pedidos[$i]['precio'];
            $producto_transferencia->observacion = '';

            $producto_transferencia->save();

        }

        return 'ok';

    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required',
            'numero' => 'required',
            'fecha' => 'required',
            'total' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $transferencia = Transferencia::find($id);

        $transferencia->cliente_id = $request->cliente_id;
        $transferencia->mayorista_id = 2;
        $transferencia->estado_id = 1;
        $transferencia->numero = $request->numero;
        $transferencia->fecha = $request->fecha;
        $transferencia->valor = $request->total;

        $transferencia->save();

        $productos = Productotransferencia::where('transferencia_id', $request->id)->delete();
        
        for ($i=0; $i < count($request->pedidos); $i++) { 
            
            $producto_transferencia = new Productotransferencia();
            $producto_transferencia->detalleproducto_id = $request->pedidos[$i]['id'];
            $producto_transferencia->transferencia_id = $request->id;
            $producto_transferencia->cantidad = $request->pedidos[$i]['cantidad'];
            $producto_transferencia->entregados = 0;
            $producto_transferencia->bonificacion = $request->pedidos[$i]['bonificacion'];
            $producto_transferencia->precio = $request->pedidos[$i]['precio'];
            $producto_transferencia->observacion = '';

            $producto_transferencia->save();
            
        }

        return 'ok';

    }
}
