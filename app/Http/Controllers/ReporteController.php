<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Cliente;
use App\Cobro;
use App\Factura;
use App\Faltantexcliente;
use App\Nota;
use App\Venta;

class ReporteController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function abonos(){
        return view('reportes.cobros.index');
    }

    public function cartera(){
        return view('reportes.cartera.index');
    }

    public function clientes(){
        return view('reportes.directos.index');
    }

    public function faltantesxcliente(){
        return view('reportes.faltantes.index');
    }

    public function reporteAbonos(Request $request){
        $fecha_i = $request->fecha_i;
        $fecha_f = $request->fecha_f;

        /* $cobros = Factura::with(['cobros', 'clientes', 'municipio'])->whereHas('cobros', function($query) use ($fecha_f, $fecha_i){
            $query->whereBetween('fecha', [$fecha_i, $fecha_f]);
        })->get(); */
        $cobros = Cobro::with(['cliente', 'factura'])->whereBetween('fecha', [$fecha_i, $fecha_f])->get();
        return $cobros;
    }

    public function reporteCartera(Request $request){

        $cliente = $request->cliente_id;
        $tipo_cliente = $request->tipo_cliente;

        if($tipo_cliente == 1){

            $cartera = DB::select("SELECT c.nit, c.razon_social, c.aplicaretencion, f.numero_factura, f.electronica, f.valor as total_factura, f.fecha_factura, f.estado_id, SUM(co.valor) as total_abono, SUM(co.valor_nota) as total_nota
                FROM facturas as f
                INNER JOIN clientes as c ON f.cliente_id = c.id
                LEFT JOIN cobros as co ON f.id = co.factura_id
                WHERE f.cliente_id = $cliente AND (f.estado_id = 4 OR f.estado_id = 5)
                GROUP BY c.razon_social, c.aplicaretencion, f.numero_factura, f.valor, f.fecha_factura, f.electronica, f.estado_id
                ORDER BY f.numero_factura ASC");

        }else{

            $cartera = DB::select("SELECT c.nit, c.razon_social, c.aplicaretencion, v.numero_factura, v.fecha_factura, v.total_factura, SUM(a.valor_abono) as total_abono, SUM(a.valor_nota) as total_nota, ev.estado_id
			FROM ventas as v 
			LEFT JOIN abonopedidos as a ON v.id = a.venta_id
			INNER JOIN clientes as c ON v.cliente_id = c.id
			INNER JOIN estadoventas as ev ON v.id = ev.venta_id
			WHERE v.cliente_id = $cliente AND (ev.estado_id = 4 OR ev.estado_id = 5) AND v.laboratorio_id = 1
			GROUP BY c.nit, c.razon_social, c.aplicaretencion, v.numero_factura, v.fecha_factura, v.total_factura, ev.estado_id
			ORDER BY v.fecha_factura ASC");

        }

        $nota = DB::SELECT("SELECT * FROM notas WHERE cliente_id = $cliente AND estado_id <> 7");



        $data = array(
            'status' => 'success',
            'code' => 200,
            'cartera' => $cartera,
            'nota' => $nota
        );
        return $data;
    }

    public function reportefaltantesxcliente(Request $request){

        if($request->tipo == 1){
            $faltantes = DB::table('faltantexclientes AS fc')
                ->join('clientes AS c', 'fc.cliente_id', 'c.id')
                ->join('detalleproductos AS dp', 'fc.detalleproducto_id', 'dp.id')
                ->join('productos AS p', 'dp.producto_id', 'p.id')
                ->join('presentaciones AS pr', 'dp.presentacione_id', 'pr.id')
                ->select('p.producto', 'pr.presentacion', DB::raw('SUM(fc.cantidad) as cantidad'))
                ->where('estado_id', 1)
                ->where('cliente_id', $request->cliente_id)
                ->groupBy('fc.detalleproducto_id', 'pr.presentacion', 'p.producto')
                ->orderBy('p.producto', 'asc')
                ->get();
        }else{
            $faltantes = DB::table('faltantexclientes AS fc')
                ->join('clientes AS c', 'fc.cliente_id', 'c.id')
                ->join('detalleproductos AS dp', 'fc.detalleproducto_id', 'dp.id')
                ->join('productos AS p', 'dp.producto_id', 'p.id')
                ->join('presentaciones AS pr', 'dp.presentacione_id', 'pr.id')
                ->select('p.producto', 'pr.presentacion', DB::raw('SUM(fc.cantidad) as cantidad'))
                ->where('estado_id', 1)
                ->groupBy('fc.detalleproducto_id', 'pr.presentacion', 'p.producto')
                ->orderBy('p.producto', 'asc')
                ->get();
        }

        return $faltantes;

    }

    public function reporteClientes(Request $request){
        $validate = \Validator::make($request->all(), [
            // 'cliente_id' => 'required',
            // 'laboratorio_id' => 'required',
            'tiporeporte' => 'required',
            'fecha_inicial' => 'required',
            'fecha_final' => 'required'
        ]);

        if($validate->fails()){
            $data = [
                'code' => 400,
                'status' => 'error',
                'datos' => $validate->messages()
            ];
        }else{
            // return $tipo_cliente;
            switch ($request->tiporeporte) {
                
                case 1:
                    // Primera consulta: facturas unidas con cobros
                    $datos = DB::table('facturas AS f')
                        ->leftJoin('cobros AS co', 'f.id', 'co.factura_id')
                        ->leftJoin('estados AS e', 'f.estado_id', 'e.id')
                        ->select(
                            'f.numero_factura', 
                            'f.electronica', 
                            'f.valor', 
                            'f.fecha_factura',
                            'e.estado',
                            'co.num_recibo_caja',
                            'co.fecha as fecha_abono',
                            'co.valor as abono',
                            'co.retencion',
                            'co.descuento',
                            'co.valor_nota',
                            'co.pendiente',
                            'co.saldo'
                        )
                        ->where('f.cliente_id', $request->cliente_id)
                        ->where('f.estado_id', '!=', 3)
                        ->whereBetween('f.fecha_factura', [$request->fecha_inicial, $request->fecha_final])
                        ->orderBy('f.numero_factura')
                        ->orderBy('co.fecha', 'DESC')
                        ->get();

                    // Segunda consulta: cobros unidos con facturas
                    $pagos = DB::table('cobros AS co')
                        ->join('facturas AS f', 'co.factura_id', 'f.id')
                        ->leftJoin('estados AS e', 'f.estado_id', 'e.id')
                        ->select(
                            'co.saldo',
                            'co.num_recibo_caja',
                            'co.fecha as fecha_abono',
                            'co.valor as abono',
                            'co.retencion',
                            'co.descuento',
                            'co.valor_nota',
                            'co.pendiente',
                            'co.saldo',
                            'f.numero_factura',
                            'f.electronica',
                            'f.valor',
                            'f.fecha_factura',
                            'e.estado'
                        )
                        ->where('f.cliente_id', $request->cliente_id)
                        ->where('f.estado_id', '!=', 3)
                        ->whereBetween('co.fecha', [$request->fecha_inicial, $request->fecha_final])
                        ->orderBy('f.numero_factura')
                        ->orderBy('co.fecha', 'ASC')
                        ->get();
                    break;
                case 2:
                    // Primera consulta: ventas unidas con abonopedidos
                    $datos = DB::table('ventas AS v')
                        ->leftJoin('abonopedidos AS ap', 'v.id', 'ap.venta_id')
                        ->leftJoin('estadoventas AS ev', 'v.id', 'ev.venta_id')
                        ->leftJoin('estados AS e', 'ev.estado_id', 'e.id')
                        ->select(
                            'v.numero_factura',
                            'v.fecha_factura',
                            'v.total_factura as valor',
                            'e.estado',
                            'ap.num_recibo_caja',
                            'ap.fecha as fecha_abono',
                            'ap.valor_abono as abono',
                            'ap.retencion',
                            'ap.descuento',
                            'ap.valor_nota',
                            'ap.pendiente',
                            'ap.saldo'
                        )
                        ->where('v.cliente_id', $request->cliente_id)
                        ->where('v.laboratorio_id', $request->laboratorio_id)
                        ->where('ev.estado_id', '!=', 3)
                        ->whereBetween('v.fecha_factura', [$request->fecha_inicial, $request->fecha_final])
                        ->orderBy('v.numero_factura')
                        ->orderBy('ap.fecha', 'DESC')
                        ->get();

                    // Segunda consulta: abonopedidos unidos con ventas
                    $pagos = DB::table('abonopedidos AS ap')
                        ->join('ventas AS v', 'ap.venta_id', 'v.id')
                        ->leftJoin('estadoventas AS ev', 'v.id', 'ev.venta_id')
                        ->leftJoin('estados AS e', 'ev.estado_id', 'e.id')
                        ->select(
                            'ap.saldo',
                            'ap.num_recibo_caja',
                            'ap.fecha as fecha_abono',
                            'ap.valor_abono as abono',
                            'ap.retencion',
                            'ap.descuento',
                            'ap.valor_nota',
                            'ap.pendiente',
                            'ap.saldo',
                            'v.numero_factura',
                            'v.total_factura as valor',
                            'v.fecha_factura',
                            'e.estado'
                        )
                        ->where('v.cliente_id', $request->cliente_id)
                        ->where('v.laboratorio_id', $request->laboratorio_id)
                        ->where('ev.estado_id', '!=', 3)
                        ->whereBetween('ap.fecha', [$request->fecha_inicial, $request->fecha_final])
                        ->orderBy('v.numero_factura')
                        ->orderBy('ap.fecha', 'ASC')
                        ->get();
                    break;
            }
            $data = [
                'code' => 200,
                'status' => 'success',
                'datos' => $datos,
                'pagos' => $pagos
            ];

            // Para los cases 1 y 2, agregar también los pagos
            if($request->tiporeporte == 1 || $request->tiporeporte == 2){
                $data['pagos'] = $pagos;
            }
        }
        return $data;
    }

    public function reporteVentas(Request $request){
        $ventas = Factura::with(['clientes', 'estado'])
            ->whereBetween('fecha_factura', [$request->fecha_i, $request->fecha_f])
            ->orderBy('fecha_factura', 'asc')
            ->get();
        return $ventas;
    }

    public function productos_pendientes_transferencias(){
        $pendientes = DB::select('SELECT dp.id, p.producto, pr.presentacion, SUM(pt.cantidad) as cantidad, SUM(pt.bonificacion) as bonificacion FROM transferencias as t 
            INNER JOIN productotransferencias as pt ON pt.transferencia_id = t.id
            INNER JOIN detalleproductos as dp ON pt.detalleproducto_id = dp.id
            INNER JOIN productos as p ON dp.producto_id = p.id
            INNER JOIN presentaciones as pr ON dp.presentacione_id = pr.id
            WHERE t.estado_id = 1
            GROUP BY dp.id, p.producto, pr.presentacion
            ORDER BY p.producto ASC');
        $data = [
                'code' => 200,
                'status' => 'success',
                'pendientes' => $pendientes
            ];
        return $data;
    }

    public function ventas(){
        return view('reportes.ventas.index');
    }
}
