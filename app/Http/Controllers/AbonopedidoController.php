<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Abonopedido;
use App\Estadoventa;
use App\Nota;
use App\Venta;

class AbonopedidoController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function index(){
        return view('facturas.abonos-cobros.index');
    }

    public function consecutivoRecibo(){
        $numero = DB::table('abonopedidos')
            ->select(DB::raw('MAX(num_recibo_caja) as numero'))
            ->get();
        return $numero[0]->numero;
    }

    public function getFacturasConSaldoDirectos($cliente_id){

        $facturas = DB::select('SELECT v.id, c.razon_social, c.nit, c.direccion, l.logo, c.aplicaretencion, v.numero_factura, v.fecha_factura, v.total_factura, SUM(ap.valor_abono) as pagado, SUM(ap.valor_nota) as total_abono_nota, e.estado, ev.estado_id, n.numero as numero_nota, n.fecha as fecha_nota, n.valor as valor_nota, n.gastado, n.numero_referencia, n.razon_referencia
            FROM ventas as v
            INNER JOIN laboratorios as l ON v.laboratorio_id = l.id
            LEFT JOIN abonopedidos as ap ON v.id = ap.venta_id AND ap.estado_id = 4
            INNER JOIN clientes as c ON v.cliente_id = c.id
            LEFT JOIN notas as n ON c.id = n.cliente_id AND n.estado_id <> 7
            INNER JOIN estadoventas as ev ON v.id = ev.venta_id
            INNER JOIN estados as e ON ev.estado_id = e.id
            WHERE v.cliente_id = ? AND ev.estado_id <> 6 AND total_factura > 0
            GROUP BY v.id, c.razon_social, c.nit, c.direccion, l.logo, c.aplicaretencion, v.numero_factura, v.fecha_factura, v.total_factura, e.estado, ev.estado_id, n.numero, n.fecha, n.valor, n.gastado, n.numero_referencia, n.razon_referencia
            ORDER BY v.numero_factura ASC, v.fecha_factura ASC', [$cliente_id]);

        return $facturas; 
    }

    public function getFacturasConSaldoIndirectos($cliente_id){
        $facturas = DB::select('SELECT v.id, c.razon_social, c.nit, c.direccion, c.aplicaretencion, v.numero_factura, v.electronica, v.fecha_factura, v.valor as total_factura, v.descuento, SUM(co.valor) as pagado, SUM(co.valor_nota) as total_abono_nota, e.estado, v.estado_id, n.numero as numero_nota, n.fecha as fecha_nota, n.valor as valor_nota, n.gastado, n.numero_referencia, n.razon_referencia
            FROM facturas as v 
            LEFT JOIN cobros as co ON v.id = co.factura_id AND co.estado_id = 4
            INNER JOIN clientes as c ON v.cliente_id = c.id
			LEFT JOIN notas as n ON c.id = n.cliente_id AND n.estado_id <> 7
            INNER JOIN estados as e ON v.estado_id = e.id
            WHERE v.cliente_id = ? AND v.estado_id <> 6 
            GROUP BY v.id, c.razon_social, c.nit, c.direccion, c.aplicaretencion, v.numero_factura, v.electronica, v.fecha_factura, v.valor , v.descuento, e.estado, v.estado_id, n.numero, n.fecha, n.valor, n.gastado, n.numero_referencia, n.razon_referencia
            ORDER BY v.fecha_factura ASC', [$cliente_id]);
        return $facturas;
    }

    public function show($venta_id){
        $abonos = Abonopedido::where('venta_id', $venta_id)->where('estado_id', 4)->get();
        return $abonos;
    }

    public function store2(Request $request){
        $validator = Validator::make($request->all(), [
            'fecha' => 'required',
            'num_recibo_caja' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }        

        if(count($request->documentos) == 0){
            $error = array('documentos' => 'No puedes ingresar un abono sin asociar una factura.' );
            return response()->json($error, 200);
        }

        $num_recibo = $request->num_recibo_caja;
        $total_nota = 0;

        for ($i=0; $i < count($request->documentos) ; $i++) { 

            $abono = new Abonopedido();
            $abono->fecha = $request->fecha;
            $abono->num_recibo_caja = $num_recibo;
            $abono->observacion = $request->observaciones;
            $abono->venta_id = $request->documentos[$i]['id'];
            $abono->saldo = $request->documentos[$i]['saldo'];
            $abono->retencion = $request->documentos[$i]['retencion'];
            $abono->descuento = $request->documentos[$i]['descuento'];
            $abono->valor_abono = $request->documentos[$i]['abono'];
            $abono->valor_nota = $request->documentos[$i]['valor_nota'];
            $abono->pendiente = $request->documentos[$i]['saldo'] - $request->documentos[$i]['abono'] - $request->documentos[$i]['retencion'] - $request->documentos[$i]['valor_nota'] - $request->documentos[$i]['descuento'];
            $abono->estado_id = 4;
            $abono->save();

            $total_nota += $abono->valor_nota;
            
            $venta = Estadoventa::where('venta_id', $request->documentos[$i]['id'])->first();
            $venta->estado_id = ($abono->pendiente == 0) ? 6 : 5 ;
            $venta->save();

        }

        // Actualizar el estado de la nota y el saldo que se ha usado de la nota.
        if($total_nota > 0){
            $nota = Nota::where('numero', $request['nota']['numero_nota'])->first();
            $nota->gastado = $request['nota']['gastado'] + $total_nota;
            if($nota->gastado == $request['nota']['valor_nota']){
                $nota->estado_id = 7;
            }else{
                $nota->estado_id = 5;
            }
            $nota->save();
        }

        $datos_abono = array(
            'status' => 'success',
            'code' => 200,
            'num_recibo' => $num_recibo 
        );

        // return 'ok';
        return response()->json($datos_abono, $datos_abono['code']);
    }

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'fecha' => 'required',
            'fecha' => 'required',
            'valor_abono' => 'required|integer|min:1'      
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 200);
        }

        $abono = new Abonopedido();
        if($request->abono){
            $abono->abono = 1;

        }else{
            $abono->abono = 0;
        }
        $abono->venta_id = $request->id;
        $abono->recibo_caja = $request->recibo_caja;
        $abono->fecha = $request->fecha;
        $abono->valor_abono = $request->valor_abono;
        $abono->observacion = $request->observacion;

        $abono->save();

        $venta = Venta::find($request->id);
        $venta->descuento = $request->descuento / 100;
        $venta->save();

        return 'ok';
    }

    /**
     * Obtener recibo por número para clientes directos
     */
    public function obtenerReciboPorNumero($numRecibo)
    {
        try {
            $recibos = DB::select('
                SELECT 
                    ap.id,
                    ap.num_recibo_caja,
                    cl.razon_social,
                    cl.nit,
                    v.fecha_factura,
                    v.numero_factura,
                    v.total_factura,
                    ap.fecha as fecha_pago,
                    ap.saldo,
                    ap.valor_abono,
                    ap.retencion,
                    ap.descuento,
                    ap.valor_nota,
                    ap.pendiente,
                    ap.estado_id,
                    v.id as venta_id
                FROM abonopedidos ap
                INNER JOIN ventas v ON ap.venta_id = v.id
                INNER JOIN clientes cl ON v.cliente_id = cl.id
                WHERE ap.num_recibo_caja = ?
                ORDER BY ap.id DESC
            ', [$numRecibo]);

            return response()->json($recibos);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el recibo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cancelar recibo de cliente directo
     */
    public function cancelarRecibo(Request $request, $numRecibo)
    {
        try {
            DB::beginTransaction();

            // Obtener el abono
            $abono = Abonopedido::where('num_recibo_caja', $numRecibo)->first();
            
            if (!$abono) {
                return response()->json([
                    'success' => false,
                    'message' => 'Recibo no encontrado'
                ], 404);
            }

            // Verificar si ya está cancelado
            if ($abono->estado_id == 3) {
                return response()->json([
                    'success' => false,
                    'message' => 'El recibo ya se encuentra cancelado'
                ], 400);
            }

            // Actualizar estado del abono a cancelado (estado_id = 3)
            $abono->estado_id = 3;
            $abono->save();

            // Si se usó nota, actualizar el estado de la nota
            if ($abono->valor_nota > 0) {
                $venta = Venta::find($abono->venta_id);
                $nota = Nota::where('cliente_id', $venta->cliente_id)
                           ->where('estado_id', '!=', 7)
                           ->first();
                
                if ($nota) {
                    $nota->gastado = $nota->gastado - $abono->valor_nota;
                    if ($nota->gastado <= 0) {
                        $nota->estado_id = 4; // Estado activa
                    } else {
                        $nota->estado_id = 5; // Estado parcialmente usada
                    }
                    $nota->save();
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Recibo cancelado exitosamente'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error al cancelar el recibo: ' . $e->getMessage()
            ], 500);
        }
    }
}
