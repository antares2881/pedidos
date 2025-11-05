<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

use App\Cliente;
use App\Combo;
use App\Detalleproducto;
use App\Factura;
use App\Facturaproducto;
use App\Faltantexcliente;
use App\Mayorista;
use App\Transferencia;
use App\Productoscombo;
use PDF;

class FacturaController extends Controller
{
    public function __construct(){
        return $this->middleware('auth');
    }

    public function cancelFactura($id){
        $factura = Factura::find($id);
        $factura->estado_id = 3;
        $factura->save();
        return;
    }

    public function findFactura($numero){
        $factura = Factura::with(['clientes', 'productos', 'transferencia'])->where('numero_factura', $numero)->get();
        return $factura;
    }

    public function historialFacturacion(){
        return view('facturas.historial-facturas.index');
    }

    public function imprimirFactura($id){

        $productos = Facturaproducto::with('detalleProducto', 'presentaciones', 'productos')->where('factura_id', $id)->get();

        $mayorista = Mayorista::find('2');

        $factura = Factura::find($id);

        $mundep_cliente = Cliente::find($factura->cliente_id);

        // Datos para codigo QR
        $cliente = $factura['clientes']['nit'];
        $formapago = $factura['formapago']['forma_pago'];
        $mediopago = $factura['mediopago']['medio_pago'];
        $tipo_documento = 1;

        QrCode::generate("NumFac: $factura->numero_factura\nFechaFac: $factura->fecha_factura\nHoraFac: $factura->hora_factura\nNitFac: $mayorista->nit\nDocAdq: $cliente\nValFac: $factura->valor\nValIva: $factura->iva\nValTolFac: $factura->valor\nFormPag: $formapago\nMedPago: $mediopago",'../public/qrcodes/qrcode.svg');

        $pdf = PDF::loadView('imprimir.factura.index', compact('factura', 'mayorista', 'mundep_cliente', 'productos', 'tipo_documento'));
        $nombre = $factura['clientes']['razon_social'].'_'.$factura->numero_factura.'_'.time().'.pdf';
        return $pdf->stream("$nombre");

    }

    public function doBill($num = 0){
        if($num == 0){
            $data = array(
                'code' => 1
            );
        }else{

            $factura = DB::select('SELECT c.id as cliente_id, c.razon_social, c.nit, pt.detalleproducto_id, p.producto, pr.presentacion, dp.codigo, t.numero, pt.cantidad, pt.bonificacion as adicionales, pt.precio, t.fecha, t.valor, t.estado_id
                FROM transferencias as t  
                INNER JOIN clientes as c ON t.cliente_id = c.id
                INNER JOIN productotransferencias as pt ON t.id = pt.transferencia_id
                INNER JOIN detalleproductos as dp ON pt.detalleproducto_id = dp.id
                INNER JOIN productos as p ON dp.producto_id = p.id
                INNER JOIN presentaciones as pr ON dp.presentacione_id = pr.id
                WHERE t.numero = ? AND t.estado_id = 1 ', [$num]);
    
            $num_factura = DB::table('facturas')
            ->select(DB::raw('MAX(numero_factura) as numero'))
            ->get();
            
            if(count($factura) > 0){

                $data = array(
                    'code' => 2,
                    'cliente' => array(
                        'text' => $factura[0]->razon_social,
                        'value' => $factura[0]->cliente_id
                    ),
                    'nit' => $factura[0]->nit,
                    'estado' => $factura[0]->estado_id,
                    'num_factura' => $num_factura[0]->numero,
                    'numero' => $num,
                    'valor' => $factura[0]->valor,
                    'fecha' => $factura[0]->fecha,
                    'productos' => $factura,
                );
            }else{
                $data = array(
                    'code' => 1
                );
            }
        }

        return view('facturas.realizar-facturas.index', compact('data'));
    }

    public function index(){

        $facturas = DB::select('SELECT f.id, c.razon_social, f.numero_factura, f.electronica, f.fecha_factura, f.valor, f.estado_id, e.estado
            FROM facturas as f
            INNER JOIN clientes as c ON f.cliente_id = c.id
            INNER JOIN estados as e ON f.estado_id = e.id
            ORDER BY f.fecha_factura DESC');

        return $facturas;        
    }

    public function informacionPendientes(){
        return view('facturas.informacion.index');
    }

    public function numeroFactura(){
        $numero = DB::table('facturas')
            ->select(DB::raw('MAX(numero_factura) as numero'))
            ->get();
        return $numero;
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required',
            'formapago_id' => 'required',
            'mediopago_id' => 'required',
            'tipofactura_id' => 'required',
            'numero_factura' => 'required|unique:facturas',
            'valor' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 200);
        }

        //Obtiene la información del cliente
        $cliente_id = $request->cliente_id;
        $info_cliente = Cliente::find($cliente_id);
        $numero_transferencia = $request->numero_transferencia;

        $fecha_actual = date('Y-m-d');
        $factura = new Factura();
        $factura->cliente_id = $cliente_id;
        $factura->numero_transferencia = $numero_transferencia;
        $factura->estado_id = 4;
        $factura->formapago_id = $request->formapago_id;
        $factura->mediopago_id = $request->mediopago_id;
        $factura->tipofactura_id = $request->tipofactura_id;
        $factura->numero_factura = $request->numero_factura;
        $factura->electronica = $request->electronica;
        $factura->fecha_factura = $fecha_actual;
        $factura->fecha_vencimiento = date("Y-m-d",strtotime($fecha_actual."+ 1 month"));
        $factura->hora_factura = date('h:i:s', time());
        $factura->calidad_retenedor = ($info_cliente->aplicaretencion == 1) ? 2.5 : 0;
        /* $factura->iva = 0;
        $factura->impuesto_consumo = 0; */
        $factura->valor = $request->valor;
        // $factura->descuento = 0;
        $factura->observaciones = $request->observaciones;

        $factura->save();

        for ($i=0; $i < count($request->pedidos); $i++) {

            $productos = new Facturaproducto();
            $productos->factura_id = $factura->id;
            $productos->detalleproducto_id = $request->pedidos[$i]['id'];
            $productos->cantidad = $request->pedidos[$i]['cantidad'];
            $productos->bonificacion = $request->pedidos[$i]['bonificacion'];
            $productos->precio_factura = $request->pedidos[$i]['precio'];

            $productos->save();

            //Modifica el inventario            
            $stock = 0;
            $cantidad = 0;
            $detalleproducto = Detalleproducto::find($request->pedidos[$i]['id']);
            $stock = $detalleproducto->stock;
            $cantidad = $request->pedidos[$i]['cantidad'] + $request->pedidos[$i]['bonificacion'];;
            $detalleproducto->stock = $stock - $cantidad;

            $detalleproducto->save();
            
        }
        // Actualiza el estado de la transferencia a facturado.
        $transferencia = DB::table('transferencias')
                            ->where('numero', $numero_transferencia)
                            ->update(['estado_id' => 2]);

        // $this->imprimirFactura($factura->id);

        return $factura->id;
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required',
            'formapago_id' => 'required',
            'mediopago_id' => 'required',
            'tipofactura_id' => 'required',
            'numero_factura' => 'required',
            'fecha_factura' => 'required',
            'fecha_vencimiento' => 'required',
            'hora_factura' => 'required',
            'valor' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 200);
        }

        $factura = Factura::find($id);
        $factura->cliente_id = $request->cliente_id;
        $factura->numero_transferencia = $request->numero;
        $factura->estado_id = 4;
        $factura->formapago_id = $request->formapago_id;
        $factura->mediopago_id = $request->mediopago_id;
        $factura->tipofactura_id = $request->tipofactura_id;
        $factura->numero_factura = $request->numero_factura;
        $factura->numero_transferencia = $request->numero_transferencia;
        $factura->fecha_factura = $request->fecha_factura;
        $factura->fecha_vencimiento = $request->fecha_vencimiento;
        $factura->hora_factura = $request->hora_factura;
        $factura->calidad_retenedor = $request->calidad_retenedor;
        $factura->iva = 0;
        $factura->impuesto_consumo = 0;
        $factura->valor = $request->valor;

        $factura->save();

        $productos = Facturaproducto::where('factura_id', $request->id)->delete();

        // Modifica el inventario con los productos facturados inicialmente
        if($request->checkbox){
            for ($i=0; $i < count($request->productosFacturados); $i++) {

                $producto = Detalleproducto::find($request->productosFacturados[$i]['id']);
                $producto->stock = $request->productosFacturados[$i]['stock'] + $request->productosFacturados[$i]['cantidad'];
                $producto->save();

            }
        }

        for ($i=0; $i < count($request->pedidos); $i++) {

            $productos = new Facturaproducto();
            $productos->factura_id = $factura->id;
            $productos->detalleproducto_id = $request->pedidos[$i]['id'];
            $productos->cantidad = $request->pedidos[$i]['cantidad'];
            $productos->precio_factura = $request->pedidos[$i]['precio'];

            $productos->save();

            if($request->checkbox){
                // Actualiza el stock de cada producto facturado
                $stock = 0;
                $cantidad = 0;
                $detalleproducto = Detalleproducto::find($request->pedidos[$i]['id']);
                $stock = $detalleproducto->stock;
                $cantidad = $request->pedidos[$i]['cantidad'] - $request->pedidos[$i]['entregar'];
                $detalleproducto->stock = $stock - $cantidad;

                $detalleproducto->save();

            }

        }

        // Actualiza el estado de la transferencia a facturado.
        $transferencia = Transferencia::where('numero', $request->numero)
            ->update(['estado_id' => 2]);

        $this->imprimirFactura($id);

        return $id;
    }
}
