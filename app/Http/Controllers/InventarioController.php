<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Style\Fill;


use App\Cliente;
use App\Detalleproducto;
use App\Estadoventa;
use App\Mayorista;
use App\Fechaentrada;
use App\Productospedido;
use App\Venta;
use PDF;

class InventarioController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }
    public function descargarInventario(){

        $productos = DB::select("SELECT l.id, l.Laboratorio, dp.codigo, c.categoria, p.producto, pr.presentacion, dp.stock
        FROM detalleproductos as dp 
        INNER JOIN productos as p on dp.producto_id = p.id
        INNER JOIN presentaciones as pr on dp.presentacione_id = pr.id
        INNER JOIN categorias as c ON p.categoria_id = c.id
        INNER JOIN laboratorios as l ON p.laboratorio_id = l.id
        ORDER BY Laboratorio, p.producto ASC");

        $spreadsheet = IOFactory::load('formatos/INVENTARIO.xlsx');

        $sheet = $spreadsheet->getSheetByName('Inventario');
        $cell = 2;

        foreach ($productos as $fila) {
           
            $sheet->setCellValue("A$cell", $fila->id);
            $sheet->setCellValue("B$cell", $fila->Laboratorio);
            $sheet->setCellValue("C$cell", $fila->codigo);
            $sheet->setCellValue("D$cell", $fila->categoria);
            $sheet->setCellValue("E$cell", $fila->producto);
            $sheet->setCellValue("F$cell", $fila->presentacion);
            $sheet->setCellValue("G$cell", $fila->stock);
            $cell ++;
        }
                
        $filename = 'Inventario'.time().'.xls';
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="'.$filename.'"');
        header('Cache-Control: max-age=0');

        $writer = IOFactory::createWriter($spreadsheet, 'Xls');
        $writer->save('php://output');
    }
    public function findPedidosCalox($num_pedido){
        $pedido = DB::select('SELECT v.id, c.razon_social, v.cliente_id, l.Laboratorio, v.valor, v.num_pedido, v.laboratorio_id, v.total_factura, v.fecha, p.producto, pr.presentacion, dp.codigo, pp.detalleproducto_id, pp.cantidad, pp.adicionales, pp.precio_entrada  
            FROM ventas as v 
            INNER JOIN clientes as c ON v.cliente_id = c.id
            INNER JOIN laboratorios as l ON v.laboratorio_id = l.id
            INNER JOIN productospedidos as pp ON v.id = pp.venta_id
            INNER JOIN detalleproductos as dp ON pp.detalleproducto_id = dp.id
            INNER JOIN productos as p ON dp.producto_id = p.id
            INNER JOIN presentaciones as pr ON dp.presentacione_id = pr.id
            WHERE v.num_pedido = ?', [$num_pedido]);
        return $pedido;
    }
    public function imprimirPedidoCalox($tipo, $id){
        // $pedido = Venta::find($id);
        if($tipo == 1){
            $pedido = Productospedido::with(['detalle','presentaciones', 'productos','ventas'])->whereHas('ventas', function($query) use ($id){
                $query->where('num_pedido', $id);
            } )->get();
            $nombre = 'Pedido No.'.$pedido[0]->ventas->num_pedido.'.pdf';
        }else{
            $pedido = Fechaentrada::with(['detalle','presentaciones', 'productos','ventas'])->whereHas('ventas', function($query) use ($id){
                $query->where('id', $id);
            } )->get();
            $nombre = 'Factura No.'.$pedido[0]->ventas->numero_factura.'.pdf';
        }
        $cliente = Cliente::with(['departamentos', 'municipios'])->find($pedido[0]->ventas->cliente_id);
        // return $pedido[0]->ventas;
        $pdf = PDF::loadView('imprimir.pedidos-calox.index', compact('cliente', 'pedido', 'tipo'));

        return $pdf->stream($nombre);
    }
    public function pedidosCalox(){
        return view('pedidos-calox.nuevo-pedido.index');
    }
    public function showProductosVenta($id){
        $productos = Fechaentrada::with(['detalle','presentaciones', 'productos','ventas'])->where('venta_id', $id)->get();
        return $productos;
    }
    public function stocks(){
        return view('inventarios.stocks.index');
    }
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required',
            'fecha' => 'required',
            'fecha' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        if(count($request->entradas) == 0){
            $error = array('Productos' => 'No puedes registrar una nueva entrada sin productos relacionados' );
            return response()->json($error, 200);
        }

        $venta = new Venta();
        $venta->cliente_id = $request->cliente_id;
        $venta->laboratorio_id = $request->laboratorio_id;
        $venta->num_pedido = $request->num_pedido;
        
        if($request->esFacturaDirecto){
            $venta->numero_factura = $request->num_factura;
            $venta->total_factura = $request->valor;
            $venta->fecha_factura = $request->fecha;
            
        }else{
            $venta->total_factura = 0;
            $venta->numero_factura = 0;
            $venta->fecha_factura = $request->fecha;
        }
        $venta->fecha = $request->fecha;
        $venta->valor = $request->valor;
        $venta->observaciones = '';
        $venta->save();        

        $this->entradas($request, $venta->id);        

        return 'ok';
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required',
            'num_pedido' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->messages(), 200);
        }

        if(count($request->entradas) == 0){
            $error = array('Productos' => 'No puedes registrar una nueva entrada sin productos relacionados' );
            return response()->json($error, 200);
        }

        $venta = Venta::find($id);
        $venta->cliente_id = $request->cliente_id;
        $venta->laboratorio_id = $request->laboratorio_id;
        $venta->num_pedido = $request->num_pedido;
        if($request->esFacturaDirecto && !$request->modificar){
            $venta->numero_factura = $request->num_factura;
            $venta->total_factura = $request->valor;
            $venta->fecha_factura = $request->fecha;
        }else{
            $venta->total_factura = 0;
            $venta->numero_factura = 0;
            $venta->fecha_factura = $request->fecha;
            $venta->fecha = $request->fecha;
            $venta->valor = $request->valor;
        }
        $venta->observaciones = '';
        $venta->save();

        if($request->modificar){
            $entrada = Productospedido::where('venta_id', $id)->delete();
        }
        $entrada = Estadoventa::where('venta_id', $id)->delete();

        $this->entradas($request, $id);

        return 'ok';
    }

    protected function entradas($pedido, $venta){
        for ($i=0; $i < count($pedido->entradas); $i++) {

            if($pedido->modificar){
                $entrada = new Productospedido();
            }else{
                $entrada = ($pedido->esFacturaDirecto) ? new Fechaentrada() : new Productospedido();
            }

            $entrada->detalleproducto_id = $pedido->entradas[$i]['id'];
            $entrada->venta_id = $venta;
            $entrada->cantidad = $pedido->entradas[$i]['cantidad'];
            $entrada->adicionales = $pedido->entradas[$i]['bonificacion'];
            $entrada->precio_entrada = $pedido->entradas[$i]['precio'];
    
            $entrada->save();
    
            // Verifica si se esta agregando una nueva factura.
            if($pedido->esFacturaDirecto){
    
                $mayorista = Mayorista::where('cliente_id', $pedido->cliente_id)->get();
    
                // Valida si la nueva factura pertenece al mayorista, esto con el fin de modificar el inventario.
                if(count($mayorista) > 0){
                    $detalleproducto = Detalleproducto::find($pedido->entradas[$i]['id']);
                    $stock = $pedido->entradas[$i]['cantidad'] + $pedido->entradas[$i]['bonificacion'] + $detalleproducto->stock;
                    $detalleproducto->stock =  $stock;
    
                    $detalleproducto->save();
                }
            }
        }

        $estado_venta = new Estadoventa();
        $estado_venta->venta_id = $venta;
        if($pedido->modificar){
            $estado_venta->estado_id = 1;
        }else{
            $estado_venta->estado_id = ($pedido->esFacturaDirecto) ? 4 : 1;
        }
        $estado_venta->save();

    }
}
