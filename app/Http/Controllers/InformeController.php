<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;
use \PhpOffice\PhpSpreadsheet\Style\Fill;

use App\Abonopedido;
use App\Factura;
use App\Mayorista;
use App\Transferencia;
use App\Venta;

class InformeController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function cartera(){
        return view('informes.informes-facturacion.cartera');
    }

    public function index(){
        return view('informes.informe-calox.index');
    }

    public function descargarExcelCalox($fecha_i, $fecha_f, $laboratorio_id){

        $mayorista = Mayorista::find(2);
        $ventas = Venta::with(['cobros', 'clientes', 'municipios'])
            ->whereBetween('fecha', [$fecha_i, $fecha_f])
            ->where('laboratorio_id', $laboratorio_id)
            ->where('valor', '>', 0)
            ->orderBy('num_pedido', 'asc')
            ->get();
        $mes = nombre_mes(date("n", strtotime($fecha_i)));
        $anio = explode('-', $fecha_i);



        $spreadsheet = IOFactory::load('formatos/reporte_semanal_2023.xls');

        $sheet = $spreadsheet->getSheetByName('VENTAS');
        /* $sheet->setCellValue('B7', $mayorista->nombres.' '.$mayorista->apellidos);
        $sheet->setCellValue('B8', $mayorista->zona); */ //Datos estaticos en formato.
        $sheet->setCellValue('C8', $mes);
        $sheet->setCellValue('E8', $anio[0]);

        // return $ventas;
        $cel_init = 11;
        $cel_init_cobros = 11;
        $cel_init_transferencias = 11;

        for ($i=0; $i < count($ventas); $i++) { 
            $sheet->setCellValue("A$cel_init", $ventas[$i]['clientes']['razon_social']);
            $sheet->setCellValue("B$cel_init", $ventas[$i]['municipios']['mcpio']);
            $sheet->setCellValue("C$cel_init", $ventas[$i]['num_pedido']);
            $sheet->setCellValue("D$cel_init", $ventas[$i]['fecha']);
            $sheet->setCellValue("E$cel_init", $ventas[$i]['valor']);
            $sheet->setCellValue("F$cel_init", $ventas[$i]['total_factura']);
            $cel_init ++;
        }               
        
        $sheet_cobros = $spreadsheet->getSheetByName('COBROS');
        /* $sheet_cobros->setCellValue('B7', $mayorista->nombres.' '.$mayorista->apellidos);
        $sheet_cobros->setCellValue('B8', $mayorista->zona); */ //Estatico en informe
        $sheet_cobros->setCellValue('E8', $mes);
        $sheet_cobros->setCellValue('E9', $anio[0]);
        
        $pagos = DB::select('SELECT c.razon_social, m.mcpio, a.num_recibo_caja, a.valor_abono, a.fecha, v.numero_factura, a.valor_nota, a.pendiente
            FROM ventas as v 
            INNER JOIN clientes as c ON v.cliente_id = c.id
            INNER JOIN municipios as m ON c.municipio_id = m.id
            INNER JOIN abonopedidos as a ON v.id = a.venta_id
            WHERE a.fecha BETWEEN ? AND ? AND v.laboratorio_id = ?
            ORDER BY a.fecha ASC', [$fecha_i, $fecha_f, $laboratorio_id]);

        for ($i=0; $i < count($pagos); $i++) { 

            $texto = ($pagos[$i]->pendiente > 0) ? 'ABONO FACT. ':'';

            $sheet_cobros->setCellValue("A$cel_init_cobros", $pagos[$i]->razon_social);
            $sheet_cobros->setCellValue("B$cel_init_cobros", $pagos[$i]->mcpio);
            $sheet_cobros->setCellValue("C$cel_init_cobros", $pagos[$i]->num_recibo_caja);
            $sheet_cobros->setCellValue("D$cel_init_cobros", $pagos[$i]->fecha);
            $sheet_cobros->setCellValue("E$cel_init_cobros", $pagos[$i]->valor_abono + $pagos[$i]->valor_nota); 
            $sheet_cobros->setCellValue("F$cel_init_cobros", $texto.$pagos[$i]->numero_factura);
            $cel_init_cobros ++;
        }

        $transferencias = Transferencia::with(['clientes', 'municipios'])
            ->whereBetween('fecha',[$fecha_i, $fecha_f])
            ->orderBy('fecha', 'asc')
            ->get();

        $sheet_transferencia = $spreadsheet->getSheetByName('TRANSFERENCIAS');
        /* $sheet_transferencia->setCellValue('B7', $mayorista->nombres.' '.$mayorista->apellidos);
        $sheet_transferencia->setCellValue('B8', $mayorista->zona); */ //Estatico en informe
        $sheet_transferencia->setCellValue('F7', $anio[0]);

        for ($i=0; $i < count($transferencias); $i++) { 

            $sheet_transferencia->setCellValue("A$cel_init_transferencias", $transferencias[$i]['clientes']['razon_social']);
            $sheet_transferencia->setCellValue("C$cel_init_transferencias", $transferencias[$i]['municipios']['mcpio']);
            $sheet_transferencia->setCellValue("D$cel_init_transferencias", $transferencias[$i]['numero']);
            $sheet_transferencia->setCellValue("E$cel_init_transferencias", $transferencias[$i]['fecha']);
            $sheet_transferencia->setCellValue("F$cel_init_transferencias", $transferencias[$i]['valor']);
            $sheet_transferencia->setCellValue("G$cel_init_transferencias", $mayorista->nombres.' '.$mayorista->apellidos);
            $cel_init_transferencias ++;

        }
                
        $filename = 'Informe_'.$fecha_f.'.xls';
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="'.$filename.'"');
        header('Cache-Control: max-age=0');

        $writer = IOFactory::createWriter($spreadsheet, 'Xls');
        $writer->save('php://output');
    }

    public function descargarExcelCartera($fecha){
        $facturas = Factura::with(['clientes', 'cobros', 'municipio'])            
            ->where('fecha_vencimiento', '<=', $fecha)
            ->where(function ($query) {
                $query->where('estado_id', 4)
                      ->orWhere('estado_id', 5);
            })
            ->orderBy('fecha_factura', 'asc')
            ->get();

        $spreadsheet = IOFactory::load('formatos/CARTERA.xlsx');
        $sheet = $spreadsheet->getActiveSheet();
        $cell = 3;
        for ($i=0; $i < count($facturas); $i++) { 
            $sheet->setCellValue("B$cell", $facturas[$i]['clientes']['razon_social'].'-'.$facturas[$i]['municipio']['mcpio']);      
            $sheet->setCellValue("C$cell", $facturas[$i]['fecha_factura']);      
            $sheet->setCellValue("D$cell", $facturas[$i]['fecha_vencimiento']);      
            $sheet->setCellValue("E$cell", $facturas[$i]['valor']);  
            $cobro = 0;
            for ($j=0; $j < count($facturas[$i]['cobros']); $j++) { 
                $cobro += $facturas[$i]['cobros'][$j]['valor'];
            }    
            $sheet->setCellValue("F$cell", $cobro);  
            $saldo = $facturas[$i]['valor'] - $cobro;
            $sheet->setCellValue("G$cell", $saldo);  
            $cell ++;     
        }

        $filename = 'cartera_'.time().'.xlsx';
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="'.$filename.'"');
        header('Cache-Control: max-age=0');

        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->save('php://output');

    }

    public function generarInformeVentas($fecha_i, $fecha_f, $lab_id){
        $ventas = Venta::with(['cobros', 'clientes', 'municipios'])
            ->whereBetween('fecha', [$fecha_i, $fecha_f])
            ->where('laboratorio_id', $lab_id)
            ->where('valor', '>', 0) //Permite no mostrar pedidos repetidos en la tabla
            ->orderBy('num_pedido', 'asc')
            ->get();
        return $ventas;
    }

    public function generarInformeCobros($fecha_i, $fecha_f, $lab_id){
        
        $pagos = DB::table('ventas AS v')
            ->join('abonopedidos AS ap', 'v.id', 'ap.venta_id')
            ->join('clientes AS c', 'v.cliente_id', 'c.id')
            ->join('municipios AS m', 'c.municipio_id', 'm.id')
            ->select('v.numero_factura', 'v.total_factura', 'v.fecha_factura', 'ap.fecha', 'ap.saldo', 'ap.valor_abono', 'ap.descuento', 'ap.retencion', 'valor_nota', 'pendiente', 'c.razon_social', 'm.mcpio', 'ap.num_recibo_caja')
            ->whereBetween('ap.fecha', [$fecha_i, $fecha_f])   
            ->where('laboratorio_id', $lab_id)
            ->orderBy('ap.fecha', 'asc')         
            ->get();
        return $pagos;
    }

    public function generarInformeTransferencias($fecha_i, $fecha_f){
        $transferencias = Transferencia::with(['clientes', 'municipios'])
            ->whereBetween('fecha',[$fecha_i, $fecha_f])
            ->orderBy('numero', 'asc')
            ->get();
        return $transferencias;
    }
}
