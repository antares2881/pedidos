<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Cliente;
use App\Detalleproducto;
use App\Factura;
use App\Mayorista;
use App\Nota;
use App\Productosnota;
use App\Venta;
use PDF;

class NotaController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function getConsecutivo($tipofactura_id){
        $consecutivo = DB::select('SELECT MAX(numero) as consecutivo FROM notas WHERE tipofactura_id = ?', [$tipofactura_id]);
        return $consecutivo;
    }

    public function index(){
        return view('facturas.notas.index');
    }

    public function productos($id){
        $productos = Productosnota::with(['detalleProducto', 'presentaciones', 'productos'])->where('nota_id', $id)->get();
        return $productos;
    }

    public function numero_nota(){
        $num_nota = DB::table('notas')
            ->select(DB::raw('MAX(numero) as numero'))
            ->get();
        return $num_nota;
    }

    public function imprimirNota($id, $tipocliente){
        //Productos nota
        $productos = Productosnota::with(['detalleProducto', 'presentaciones', 'productos'])->where('nota_id', $id)->get();
        $nota = Nota::find($id);
        if($tipocliente == 1){
            $factura = Factura::find($nota->documento_id);
            $mundep_cliente = Cliente::find($factura->cliente_id);
        }else{
            $factura = Venta::find($nota->documento_id);
            $mundep_cliente = Cliente::find($factura->cliente_id);
        }
        $mayorista = Mayorista::find('2');
        $tipo_documento = 2;
        $rotulos = 0;

        $pdf = PDF::loadView('imprimir.factura.index', compact('factura', 'mayorista', 'mundep_cliente', 'nota', 'productos', 'rotulos', 'tipo_documento'));
        $nombre = $factura['clientes']['razon_social'].'_NC'.$nota->numero.'_'.time().'.pdf';
        return $pdf->stream("$nombre");
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'tipofactura_id' => 'required',
            'razon_referencia' => 'required',
            'numero' => 'required|unique:notas',
            'valor_nota' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 200);
        }        

        $nota = new Nota();
        $nota->cliente_id = $request->cliente_id;
        $nota->tipofactura_id = $request->tipofactura_id;
        $nota->numero = $request->numero;
        $nota->fecha = $request->fecha;
        $nota->valor = $request->valor_nota;
        $nota->numero_referencia = $request->numero_referencia;
        $nota->fecha_referencia = $request->fecha_referencia;
        $nota->razon_referencia = $request->razon_referencia;
        $nota->referencia = '';
        $nota->estado_id = 4;

        $nota->save();

        if($nota->tipofactura_id == 4){

            $mayorista = Mayorista::find($nota->cliente_id);

            for ($i=0; $i < count($request->productos); $i++) {

                $productos = new Productosnota();
                $productos->nota_id = $nota->id;
                $productos->detalleproducto_id = $request->productos[$i]['id'];
                $productos->cantidad = $request->productos[$i]['cantidad'];
                $productos->precio_factura = $request->productos[$i]['precio'];
                $productos->save();
            }

            // Actualizo el inventario si es una factura de clientes indirectos.
            if($request->tipo_factura == 1){
                for ($i=0; $i < count($request->productos); $i++) {
                    $inventario = Detalleproducto::find($request->productos[$i]['id']);
                    $inventario->stock = $inventario->stock + $request->productos[$i]['cantidad'];                
                    $inventario->save();
                }
            }

            // Si es una factura de calox y el mayorista es el cliente de la nota, se reversa la cantidad de cada producto de la nota.
            if($request->tipo_factura == 2 && $mayorista){
                for ($i=0; $i < count($request->productos); $i++) {
                    $inventario = Detalleproducto::find($request->productos[$i]['id']);
                    $inventario->stock = $inventario->stock - $request->productos[$i]['cantidad'];                
                    $inventario->save();
                }   
            }

        }

        $data = [
            'code' => 200,
            'status' => 'success',
            'nota' => $nota
        ];        

        return response()->json($data, $data['code']);
    }

    public function update(Request $request, $id){
        $validate = \Validator::make($request->all(), [
            'tipo' => 'required',
            'concepto' => 'required'
        ]);

        if($validate->fails()){
            return response()->json($validate->messages(), 200);
        }

        $nota = Nota::find($id);
        $nota->numero = $request_numero;
        $nota->fecha = $request->fecha;
        $nota->tipo = $request->tipo;
        $nota->valor = $request->totalNota;
        $nota->concepto = $request->concepto;
        $nota->save();

        $delete_nota = Productosnota::where('nota_id', $id)->delete();

        for ($i=0; $i < count($request->productos); $i++) {
            $productos = new Productosnota();
            $productos->nota_id = $id;
            $productos->detalleproducto_id = $request->productos[$i]['detalleproducto_id'];
            $productos->cantidad = $request->productos[$i]['cantidad'];
            $productos->precio_factura = $request->productos[$i]['precio_factura'];
            $productos->save();
        }

        if($request->inventario){
            for ($i=0; $i < count($request->productos); $i++) {
                $inventario = Detalleproducto::find($request->productos[$i]['detalleproducto_id']);
                if($request->tipocliente == 1){
                    $inventario->stock = $inventario->stock + $request->productos[$i]['cantidad'];
                }else{
                    $inventario->stock = $inventario->stock - $request->productos[$i]['cantidad'];
                }
                $inventario->save();
            }
        }

        if($request->tipocliente_id == 1){ //Cambiar estado de factura.

            $factura = Factura::with('cobros')->find($request->documento_id);
            if(!empty($factura['cobros'])){
                $pagado = 0;
                for ($i=0; $i < count($factura['cobros']); $i++) {
                    $pagado += $factura['cobros'][$i]->valor;
                }
                $pagado += $request->valor;
                // return $pagado;
                if($factura->valor == $pagado){
                    $factura->estado_id = 6;
                    $factura->save();
                }
            }
        }

        $data = [
            'code' => 200,
            'status' => 'success',
            'nota' => $nota
        ];

        return response()->json($data, $data['code']);

    }
}
