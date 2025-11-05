<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Detalleproducto;

class DetalleproductoController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function index(Request $request){
        if($request->ajax()){
            $detalleproductos = Detalleproducto::with(['categorias', 'lista', 'productos', 'presentaciones', 'pviejos', 'psupermascotas', 'promocionesindirectos'])->get();
            return $detalleproductos;
        }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'producto_id' => 'required',
            'presentacione_id' => 'required',
            'codigo' => 'required|unique:detalleproductos',
            'precio' => 'required',
            'stock' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $producto = new Detalleproducto();
        $producto->producto_id = $request->producto_id;
        $producto->presentacione_id = $request->presentacione_id;
        $producto->codigo = $request->codigo;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;

        $producto->save();

        return 'ok';
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'producto_id' => 'required',
            'presentacione_id' => 'required',
            'codigo' => 'required',
            'precio' => 'required',
            'stock' => 'required',
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        $producto = Detalleproducto::find($id);
        $producto->producto_id = $request->producto_id;
        $producto->presentacione_id = $request->presentacione_id;
        $producto->codigo = $request->codigo;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;

        $producto->save();

        return 'ok';
    }

    public function movimientosProducto($cliente_id, $producto_id){
        // Obtener movimientos de facturas
        $movimientosFacturas = \DB::table('facturaproductos')
            ->join('facturas', 'facturaproductos.factura_id', '=', 'facturas.id')
            ->where('facturaproductos.detalleproducto_id', $producto_id)
            ->where('facturas.cliente_id', $cliente_id)
            ->select(
                'facturas.numero_factura',
                'facturas.electronica',
                'facturas.fecha_factura as fecha',
                'facturaproductos.cantidad',
                'facturaproductos.bonificacion',
                'facturaproductos.precio_factura',
                \DB::raw("'factura' as tipo_movimiento")
            )
            ->orderBy('facturas.fecha_factura', 'desc')
            ->get();

        // Obtener movimientos de fechaentradas (ventas)
        $movimientosVentas = \DB::table('fechaentradas')
            ->join('ventas', 'fechaentradas.venta_id', '=', 'ventas.id')
            ->where('fechaentradas.detalleproducto_id', $producto_id)
            ->where('ventas.cliente_id', $cliente_id)
            ->select(
                'ventas.numero_factura',
                \DB::raw('NULL as electronica'),
                'ventas.fecha_factura as fecha',
                'fechaentradas.cantidad',
                \DB::raw('NULL as bonificacion'),
                'fechaentradas.precio_entrada as precio_factura',
                'fechaentradas.adicionales',
                \DB::raw("'venta' as tipo_movimiento")
            )
            ->orderBy('ventas.fecha_factura', 'desc')
            ->get();

        // Combinar y ordenar todos los movimientos por fecha
        $todosMovimientos = $movimientosFacturas->concat($movimientosVentas)
            ->sortByDesc('fecha')
            ->values();

        return response()->json([
            'movimientos' => $todosMovimientos,
            'total_movimientos' => $todosMovimientos->count(),
            'facturas' => $movimientosFacturas->count(),
            'ventas' => $movimientosVentas->count()
        ]);
    }
}
