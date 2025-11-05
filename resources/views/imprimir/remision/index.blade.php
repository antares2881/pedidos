<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>remision_{{$mundep_cliente->razon_social}}</title>
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
            width: 30%;
        }
        .info_empresa{
            width: 50%;
            text-align: center;
        }
        .info_factura{
            width: 70%;
        }
        .info_cliente{
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
            background: #058167;
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
                        <!-- <img src="images/logo-calox.png" alt="Logo calox"> -->
                    </div>
                    <h1><strong>REMISION {{$factura->numero_transferencia}}</strong></h1>
                    <hr>
                    <h2><strong>Andres Velez Padron</strong></h2>
                    <h3>Mz 22 Lote 15 B/ rancho grande </h3>
                    <h3>Celular 3145920820</h3>
                    <h3>Monteria - Córdoba</h3>
                </td>
                <td class="info_factura">
                    <div class="round">
                        <p><strong>Razon social: </strong>{{$factura->clientes->razon_social}}</p>
                        <p><strong>Nit: </strong>{{$factura->clientes->nit}}-{{$factura->clientes->dv}}</p>
                        <p><strong>Ciudad: </strong>{{$mundep_cliente->municipios->mcpio}}/{{$mundep_cliente->departamentos->nombre_dpto}}</p>
                        <p><strong>Dirección: </strong>{{$factura->clientes->direccion}}</p>
                        <p><strong>Telefono: </strong>{{$factura->clientes->telefono}}</p>
                        <p><strong>Fecha: </strong>{{$factura->fecha_factura}}</p>
                    </div>
                </td>
            </tr>
        </table>

        <table id="transferencia_detalle">
            <thead>
                <tr style="background-color: #ededed;">
                    <th class="textleft" width="100px">Item</th>
                    <th class="textleft">Descripción</th>
                    <th width="50px">Cant.</th>
                    <th class="textright" width="100px">Valor Unit.</th>
                    <th class="textright" width="50px">IVA.</th>
                    <th class="textright" width="100px">Valor Total</th>
                </tr>
            </thead>
            <tbody id="detalle_productos">
                @php
                    $con = 1;
                    $new_pag = 0;
                @endphp
                @foreach ($productos as $item)      
                    @php
                        if($item->bonificacion > 0){
                            $new_pag++;
                        }
                    @endphp
                    <tr>
                        <td class="textleft">
                            {{$con++}}   {{$item->detalleproducto->codigo}}
                        </td>
                        <td>{{$item->productos->producto}} X {{$item->presentaciones->presentacion}}</td>
                        <td class="textcenter">{{$item->cantidad}}</td>
                        <td class="textright">$ {{number_format($item->precio_factura)}}</td>
                        <td class="textright">% {{number_format($item->iva)}}</td>
                        <td class="textright">$ {{number_format($item->cantidad * $item->precio_factura)}}</td>
                    </tr>
                @endforeach                
            </tbody>      
            
            <tfoot id="detalle_totales">                
                <tr>
                    <td colspan="5" class="textright"><span><strong>TOTAL.</strong></span></td>
                    <td class="textright"><span><strong>$ {{number_format($factura->valor)}}</strong></span></td>
                </tr>
            </tfoot>      
        </table>  
        <div>
            <p style="font-size:12pt;">Favor consignar a cuenta de ahorros Bancolombia No. 790-357092-96</p>
        </div>
    </div>
</body>
</html>