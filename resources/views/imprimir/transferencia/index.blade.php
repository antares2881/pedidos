<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/pdf.css">
</head>
<body>
    <div id="page_pdf">
        <table id="factura_head">
            <tr>
                <td class="info_empresa">
                    <div>
                        <img src="images/logo-calox.png" alt="Logo calox">
                    </div>
                    
                </td>
                <td class="info_cliente">
                    <div class="round">
                        <p><strong>Razon social: </strong>{{$transferencia->clientes->razon_social}}</p>
                        <p><strong>Numero de pedido: </strong>{{$transferencia->numero}}</p>
                        <p><strong>Nit: </strong>{{$transferencia->clientes->nit}}-{{$transferencia->clientes->dv}}</p>
                        <p><strong>Ciudad: </strong>{{$transferencia->municipios->mcpio}} - {{$mundep_cliente->departamentos->nombre_dpto}}</p>
                        <p><strong>Dirección: </strong>{{$transferencia->clientes->direccion}}</p>
                        <p><strong>Telefono: </strong>{{$transferencia->clientes->telefono}}</p>
                        <p><strong>Fecha: </strong>{{$transferencia->fecha}}</p>
                    </div>
                </td>
            </tr>
        </table>

        <table id="transferencia_detalle">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th class="textleft">Descripción</th>
                    <th width="50px">Cant.</th>
                    <th width="50px">Bon.</th>
                    <th class="textright" width="150px">Precio Unitario.</th>
                    <th class="textright" width="150px"> Precio Total</th>
                </tr>
            </thead>
            <tbody id="detalle_productos">
                @foreach ($productos as $item)                        
                    <tr>
                        <td class="textcenter">{{$item->detalleproductos->codigo}}</td>
                        <td>{{$item->productos->producto}} X {{$item->presentaciones->presentacion}} @if ($item->observacion != null)
                            - ({{$item->observacion}})
                        @endif</td>
                        <td class="textcenter">{{$item->cantidad}} ({{$item->entregados}})</td>
                        <td class="textcenter">{{$item->bonificacion}}</td>
                        <td class="textright">$ {{number_format($item->precio)}}</td>
                        <td class="textright">$ {{number_format($item->cantidad * $item->precio)}}</td>
                    </tr>
                @endforeach                
            </tbody>
            <tfoot id="detalle_totales">                
                <tr>
                    <td colspan="5" class="textright"><span><strong>TOTAL.</strong></span></td>
                    <td class="textright"><span><strong>$ {{number_format($transferencia->valor)}}</strong></span></td>
                </tr>
            </tfoot>
        </table>
        <div>
            <p class="nota"><strong>CALOXVET COLOMBIA, </strong>realiza esta transferencia a traves de su equipo de apoyo al Distribuidor y en ningún momento se hace responsable del despacho y/o el cobro de esta mercancia.</p>
        </div>
    </div>
</body>
</html>