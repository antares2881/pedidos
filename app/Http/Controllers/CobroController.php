<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use App\Cobro;
use App\Factura;
use App\Nota;
use PDF;
use Carbon\Carbon;

class CobroController extends Controller
{
    public function consecutivoRecibo(){
        $numero = DB::table('cobros')
            ->select(DB::raw('MAX(num_recibo_caja) as numero'))
            ->get();
        return $numero;
    }

    public function show($factura_id){
        $cobros = Cobro::
            where('factura_id', $factura_id)
            ->where('estado_id', 4)
            ->get();
        return $cobros;
    }

    public function total($factura_id){
        $factura = Factura::with(['clientes', 'cobros', 'notas'])->find($factura_id);        
        // return $factura;
        $pdf = PDF::loadView('imprimir.comprobantes.indirectos', compact('factura'));
        
        return $pdf->stream('Comprobante_'.$factura->clientes->razon_social.time().'.pdf');        
    }

    public function imprimirRecibo($id){

        $datosRecibo = Cobro::with(['cliente', 'factura'])->find($id);
        $fecha = Carbon::now();
        // return $fecha;

        $pdf = PDF::loadView('imprimir.recibos-caja.indirectos', compact('datosRecibo'));
        // $pdf->setPaper('A6', 'landscape');
        return $pdf->stream($datosRecibo->cliente->razon_social."_$fecha".'.pdf');
        
    }
    public function imprimirRecibo2($num_recibo){

        $datosRecibo = DB::select('SELECT c.num_recibo_caja, c.fecha, cl.razon_social, cl.nit, c.valor, c.observacion, f.numero_factura, f.electronica, f.fecha_factura, f.valor as valor_factura, c.saldo, c.retencion, c.descuento, c.valor_nota, c.pendiente
            FROM cobros as c 
            INNER JOIN facturas as f ON c.factura_id = f.id
            INNER JOIN clientes as cl ON f.cliente_id = cl.id
            WHERE num_recibo_caja = ?', [$num_recibo]); //POR AQUI
        $fecha = Carbon::now();
        // return $fecha;

        // return $datosRecibo;
        $pdf = PDF::loadView('imprimir.recibos-caja.indirectos', compact('datosRecibo'));
        // $pdf->setPaper('A6', 'landscape');
        return $pdf->stream($datosRecibo[0]->razon_social."_$fecha".'.pdf');
        
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'fecha' => 'required',
            'valor' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }        

        $abono = new Cobro();
        $abono->factura_id = $request->id;
        $abono->num_recibo_caja = $request->num_recibo_caja;
        $abono->fecha = $request->fecha;
        $abono->valor = $request->valor;
        $abono->saldo = $request->saldo - $request->valor - $request->descuento;
        $abono->abono = $request->abono;
        $abono->observacion = $request->observacion;

        $abono->save();

        $factura = Factura::find($request->id);
        $saldo = $request->saldo - $request->valor - $request->descuento;

        if($saldo == 0){
            $factura->estado_id = 6;      
        }else{
            $factura->estado_id = 5;
        }

        $factura->descuento = $request->descuento;

        $factura->save();

        $datos_abono = array(
            'status' => 'success',
            'code' => 200,
            'abono' => $abono 
        );

        // return 'ok';
        return response()->json($datos_abono, $datos_abono['code']);

    }

    public function store2(Request $request){
        $validator = Validator::make($request->all(), [
            'fecha' => 'required',
            'num_recibo_caja' => 'required|unique:cobros'
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

            $abono = new Cobro();
            $abono->fecha = $request->fecha;
            $abono->num_recibo_caja = $request->num_recibo_caja;
            $abono->observacion = $request->observaciones;
            $abono->factura_id = $request->documentos[$i]['id'];
            $abono->saldo = $request->documentos[$i]['saldo'];
            $abono->retencion = $request->documentos[$i]['retencion'];
            $abono->descuento = $request->documentos[$i]['descuento'];
            $abono->valor = $request->documentos[$i]['abono'];
            $abono->valor_nota = $request->documentos[$i]['valor_nota'];
            $abono->pendiente = $request->documentos[$i]['saldo'] - $request->documentos[$i]['abono'] - $request->documentos[$i]['retencion'] - $request->documentos[$i]['valor_nota'] - $request->documentos[$i]['descuento'];
            $abono->estado_id = 4;
            $abono->save();

            $total_nota += $abono->valor_nota;
            
            $factura = Factura::find($request->documentos[$i]['id']);
            $factura->estado_id = ($abono->pendiente == 0) ? 6 : 5 ;
            $factura->save();

        }

        // Actualizar el estado de la nota y el saldo que se ha usado de la nota.
        if($total_nota > 0){
            $nota = Nota::where('numero', $request->nota['numero_nota'])->first();
            $nota->gastado = $request->nota['gastado'] + $total_nota;
            if($nota->gastado == $request->nota['valor_nota']){
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

    /**
     * Mostrar la vista de gestión de recibos
     */
    public function gestionRecibos()
    {
        return view('facturas.abonos-cobros.gestion');
    }

    /**
     * Obtener recibo por número para clientes indirectos
     */
    public function obtenerReciboPorNumero($numRecibo)
    {
        try {
            $recibos = DB::select('
                SELECT 
                    c.id,
                    c.num_recibo_caja,
                    cl.razon_social,
                    cl.nit,
                    f.fecha_factura,
                    f.numero_factura,
                    f.electronica,
                    f.valor as total_factura,
                    c.fecha as fecha_pago,
                    c.saldo,
                    c.valor as valor_abono,
                    c.retencion,
                    c.descuento,
                    c.valor_nota,
                    (c.saldo - c.valor - c.retencion - c.valor_nota - c.descuento) as pendiente,
                    c.estado_id,
                    f.id as factura_id
                FROM cobros c
                INNER JOIN facturas f ON c.factura_id = f.id
                INNER JOIN clientes cl ON f.cliente_id = cl.id
                WHERE c.num_recibo_caja = ?
                ORDER BY c.id DESC
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
     * Cancelar recibo de cliente indirecto
     * Un número de recibo puede estar asociado a múltiples facturas
     */
    public function cancelarRecibo(Request $request, $numRecibo)
    {
        try {
            DB::beginTransaction();

            // 1. Obtener TODOS los cobros asociados al número de recibo
            $cobros = Cobro::where('num_recibo_caja', $numRecibo)->get();
            
            if ($cobros->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Recibo no encontrado'
                ], 404);
            }

            // Verificar si alguno ya está cancelado
            $yaCancelado = $cobros->where('estado_id', 3)->first();
            if ($yaCancelado) {
                return response()->json([
                    'success' => false,
                    'message' => 'El recibo ya se encuentra cancelado'
                ], 400);
            }

            $facturasAfectadas = [];
            $totalNotasRevertidas = 0;
            $cliente_id = null;

            // 2. Actualizar estado de CADA uno de los registros encontrados
            foreach ($cobros as $cobro) {
                // Actualizar estado del cobro a cancelado (estado_id = 3)
                $cobro->estado_id = 3;
                $cobro->save();

                // Guardar las facturas afectadas para actualizarlas después
                if (!in_array($cobro->factura_id, $facturasAfectadas)) {
                    $facturasAfectadas[] = $cobro->factura_id;
                }

                // Sumar el total de notas usadas para revertir
                if ($cobro->valor_nota > 0) {
                    $totalNotasRevertidas += $cobro->valor_nota;
                    
                    // Obtener el cliente_id si aún no lo tenemos
                    if (!$cliente_id) {
                        $factura = Factura::find($cobro->factura_id);
                        $cliente_id = $factura->cliente_id;
                    }
                }
            }

            // 3. Cambiar el estado de TODAS las facturas afectadas
            foreach ($facturasAfectadas as $factura_id) {
                $factura = Factura::find($factura_id);
                if ($factura) {
                    $factura->estado_id = 5; // Cambiar estado a 5 (con saldo pendiente)
                    $factura->save();
                }
            }

            // Si se usaron notas en cualquiera de los cobros, actualizar el estado de la nota
            if ($totalNotasRevertidas > 0 && $cliente_id) {
                $nota = Nota::where('cliente_id', $cliente_id)
                           ->where('estado_id', '!=', 7)
                           ->orderBy('id', 'desc')
                           ->first();
                
                if ($nota) {
                    $nota->gastado = $nota->gastado - $totalNotasRevertidas;
                    
                    // Asegurar que gastado no sea negativo
                    if ($nota->gastado < 0) {
                        $nota->gastado = 0;
                    }
                    
                    if ($nota->gastado == 0) {
                        $nota->estado_id = 4; // Estado activa (sin usar)
                    } else {
                        $nota->estado_id = 5; // Estado parcialmente usada
                    }
                    $nota->save();
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Recibo cancelado exitosamente',
                'detalles' => [
                    'cobros_cancelados' => $cobros->count(),
                    'facturas_afectadas' => count($facturasAfectadas),
                    'valor_notas_revertido' => $totalNotasRevertidas
                ]
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
