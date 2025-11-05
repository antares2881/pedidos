<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Venta;

class VentaController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function consecutivoPedido(){
        $consecutivo = DB::table('ventas')
            ->select(DB::raw('MAX(num_pedido) as consecutivo'))
            ->get();
        return $consecutivo;
    }

    public function index(Request $request){

        $ventas = DB::select('SELECT v.id, l.Laboratorio, l.logo, c.razon_social, m.mcpio, v.fecha, v.fecha_factura, v.num_pedido, v.numero_factura, v.total_factura, v.valor, e.estado_id, es.estado
            FROM ventas as v 
            INNER JOIN laboratorios as l ON v.laboratorio_id = l.id
            INNER JOIN clientes as c ON v.cliente_id = c.id
            INNER JOIN municipios as m ON c.municipio_id = m.id
            INNER JOIN estadoventas as e on v.id = e.venta_id
            INNER JOIN estados as es ON e.estado_id = es.id
            ORDER BY fecha DESC');

        if($request->ajax()){
            return $ventas;
        }else{
            return view('pedidos-calox.historial-pedidos.index', compact('ventas'));
        }
    }

    public function show($id){
        $venta = DB::select("SELECT c.razon_social, v.cliente_id, v.laboratorio_id, l.Laboratorio, v.numero_factura, v.num_pedido, v.fecha, v.valor, p.producto, pr.presentacion, pp.precio_entrada, pp.cantidad, pp.adicionales, pp.precio_entrada * pp.cantidad as total 
            FROM ventas as v 
            INNER JOIN clientes as c ON v.cliente_id = c.id 
            INNER JOIN laboratorios as l ON v.laboratorio_id = l.id
            INNER JOIN productospedidos as pp ON v.id = pp.venta_id
            INNER JOIN detalleproductos as dp ON pp.detalleproducto_id = dp.id
            INNER JOIN productos as p ON dp.producto_id = p.id
            INNER JOIN presentaciones as pr ON dp.presentacione_id = pr.id 
            WHERE v.id = ? ", [$id]);
        return $venta;
    }

    public function pendientes_facturar(){
        $pendientes = DB::select("SELECT v.num_pedido, c.razon_social, v.valor, v.fecha, l.logo, l.Laboratorio  FROM ventas as v 
            INNER JOIN laboratorios as l ON v.laboratorio_id = l.id
            INNER JOIN productospedidos as pp ON v.id = pp.venta_id
            INNER JOIN clientes as c ON v.cliente_id = c.id
            INNER JOIN estadoventas as ev ON v.id = ev.venta_id
            WHERE ev.estado_id = 1 
            GROUP BY v.num_pedido, c.razon_social, v.valor, v.fecha, l.logo, l.Laboratorio
            ORDER BY v.fecha ASC, v.num_pedido ASC");   
        return $pendientes;
    }
}
