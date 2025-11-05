<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>
        @if($tipo == 1)
            Pedido No. {{$pedido[0]->ventas->num_pedido}}
        @else
            Factura No. {{$pedido[0]->ventas->numero_factura}}
        @endif
    </title>
    <style>
        @import url('../../../../fonts/BrixSansRegular.css');
        @import url('../../../../fonts/BrixSansBlack.css');

        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        p, label, span, table{
            font-family: 'BrixSansRegular';
            font-size: 10pt;
        }
        .h2{
            font-family: 'BrixSansBlack';
            font-size: 14pt;
            font-weight: bold;
        }
        .h3{
            font-family: 'BrixSansBlack';
            font-size: 12pt;
            font-weight: bold;
            display: block;
            background: #0a4661;
            color: #FFF;
            text-align: center;
            padding: 3px;
            margin-bottom: 5px;
        }
        #page_pdf{
            width: 95%;
            margin: 15px auto 10px auto;
        }

        #transferencia_head, #factura_cliente, #transferencia_detalle{
            width: 100%;
            margin-bottom: 10px;
        }
        .numero_transferencia{
            width: 20%;
        }
        .info_empresa{
            width: 60%;
            text-align: center;
        }
        .info_factura{
            width: 60%;
        }
        .info_num_pedido{
            width: 20%;
        }
        .info_cliente{
            width: 100%;
        }
        .info_observaciones{
            width: 100%;
        }
        .datos_cliente{
            width: 100%;
        }
        .datos_cliente tr td{
            width: 50%;
        }
        .datos_cliente{
            padding: 10px 10px 0 10px;
        }
        .datos_cliente label{
            width: 75px;
            display: inline-block;
        }
        .datos_cliente p{
            display: inline-block;
        }

        .textright{
            text-align: right;
        }
        .textleft{
            text-align: left;
        }
        .textcenter{
            text-align: center;
        }
        .round{
            border-radius: 10px;
            border: 1px solid #0a4661;
            overflow: hidden;
            padding-bottom: 15px;
        }
        .round p{
            padding: 0 15px;
        }

        #transferencia_detalle{
            border-collapse: collapse;
        }
        #transferencia_detalle thead th{
            background: #0a4661;
            color: #FFF;
            padding: 5px;
        }
        #detalle_productos tr:nth-child(even) {
            background: #ededed;
        }
        #detalle_totales span{
            font-family: 'BrixSansBlack';
        }
        .nota{
            font-size: 8pt;
        }
        .label_gracias{
            font-family: verdana;
            font-weight: bold;
            font-style: italic;
            text-align: center;
            margin-top: 20px;
        }
        .anulada{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
        }

        footer {
            position: fixed;
            bottom: 0cm;
            font-family: 'BrixSansBlack';
            left: 0cm;
            right: 0cm;
            height: 2cm;            
            text-align: center;
            line-height: 35px;
        }
    </style>

</head>
<body>
    <div id="page_pdf">
        <table id="transferencia_head">
            <tr>
                <td class="numero_transferencia">
                    <div>
                        @if($pedido[0]->ventas->laboratorio_id == 1)
                            <img src="images/logo-calox.png" alt="Logo calox" width="80%">
                        @elseif($pedido[0]->ventas->laboratorio_id == 5)
                            <img src="images/VICAR-LOGO.jpg" alt="Logo vicar" width="80%">
                        @elseif($pedido[0]->ventas->laboratorio_id == 11)
                            <img src="images/produgan-logo.png" alt="Logo produgan" width="80%">
                        @endif
                    </div>
                </td>
                <td class="info_factura">
                    <div>
                        <p><strong>Razon social: </strong>{{substr($cliente->razon_social, 0,30)}} <strong>Nit: </strong>{{$cliente->nit}}-{{$cliente->dv}}</p>
                        <p><strong>Ciudad: </strong>{{$cliente->municipios->mcpio}} <strong>Departamento:</strong> {{$cliente->departamentos->nombre_dpto}} </p>
                        <p><strong>Dirección: </strong>{{$cliente->direccion}} <strong>Telefono: </strong>{{$cliente->telefono}}</p>
                        <p><strong>Fecha: </strong>{{($tipo == 1)?$pedido[0]->ventas->fecha:$pedido[0]->ventas->fecha_factura}} <strong>Zona: </strong>104</p>
                    </div>
                </td>
                <td class="info_num_pedido">
                    <div class="round">
                        @if($tipo == 1)
                        <span class="h3">NO. DE PEDIDO</span>
                        <h3 style="color: red" class="textcenter">{{$pedido[0]->ventas->num_pedido}}</h3>
                        @else
                        <span class="h3">NO. FACTURA</span>
                        <h3 style="color: red" class="textcenter">{{$pedido[0]->ventas->numero_factura}}</h3>
                        @endif
                    </div>
                </td>
            </tr>
        </table>

        <table id="transferencia_detalle">
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th >Producto</th>
                    <th width="50px">Pedido</th>
                    <th width="50px">Bon</th>
                    <th class="textright" width="50px">V.Unit.</th>
                    <th class="textright" width="100px">V.Total</th>
                </tr>
            </thead>
            <tbody id="detalle_productos">
                @php
                    $cont = 1;
                @endphp
                @foreach ($pedido as $item)                        
                    <tr>
                        <td class="textcenter">{{$cont}}. {{$item->detalle->codigo}}</td>
                        <td >{{$item->productos->producto}} X {{$item->presentaciones->presentacion}}</td>
                        <td class="textcenter">{{$item->cantidad}}</td>
                        <td class="textcenter">{{$item->adicionales}}</td>
                        <td class="textright">$ {{number_format($item->precio_entrada)}}</td>
                        <td class="textright">$ {{number_format($item->cantidad * ($item->precio_entrada))}}</td>
                    </tr>
                    @php
                        $cont ++;
                    @endphp
                @endforeach                
            </tbody>
            <tfoot id="detalle_totales">                              
                <tr>
                    <td colspan="5" class="textright"><span><strong>TOTAL.</strong></span></td>
                    <td class="textright">
                        <span><strong>$     
                            @if($tipo == 1)
                                {{number_format($pedido[0]->ventas->valor)}}                        
                            @else
                                {{number_format($pedido[0]->ventas->total_factura)}}  
                            @endif
                            </strong>
                        </span>
                    </td>
                </tr>
            </tfoot>
        </table>
        <div>
            <table>
                <tr>
                    <td class="info_observaciones">
                        <p><strong>Observaciones:</strong> {{$pedido[0]->ventas->observaciones}}</p>                       
                        
                    </td>
                </tr>
            </table>            
        </div>
    </div>
</body>
</html>