<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>    
    <title>Recibo de pago</title>
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

        #factura_head, #factura_cliente, #factura_detalle{
            width: 100%;
            margin-bottom: 10px;
        }
        .logo_factura{
            width: 25%;
        }
        .info_empresa{
            width: 50%;
            text-align: center;
        }
        .info_factura{
            width: 25%;
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
            margin-top: 10px;
        }
        .datos_cliente label{
            display: inline-block;
            width: 130px;
        }
        .datos_cliente p{
            display: inline-block;
            max-width: 70%; 
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

        #factura_detalle{
            border-collapse: collapse;
        }
        #factura_detalle thead th{
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
        <table id="factura_head">
            <tr>
                <td class="logo_factura">
                    <div>
                        <h2>RECIBO DE PAGO # {{$datosRecibo[0]->num_recibo_caja}}</h2>
                    </div>
                </td>
                <td class="info_factura">
                    <div class="round">
                        <p><strong>Fecha de recibo:</strong> {{$datosRecibo[0]->fecha}}</p>
                    </div>
                </td>
            </tr>
        </table>
        <table id="factura_cliente">
            <tr>
                <td class="info_cliente">
                    <div class="round">
                        
                        <table class="datos_cliente">
                            <tr>
                                <td><label for=""><strong>Recibí de: </strong></label><p>{{$datosRecibo[0]->razon_social}} IDENTIFICADO CON NIT No. {{$datosRecibo[0]->nit}}</p></td>
                                
                            </tr>
                            <tr>
                                
                                @php
                                    $total_abono = 0;
                                    for($i=0; $i < count($datosRecibo); $i++){
                                        $total_abono += $datosRecibo[$i]->valor;
                                    }
                                   
                                @endphp
                                <td><label for=""><strong>La suma de: </strong></label><p><br>{{convertir($total_abono)}} PESOS M/CTE. ($ {{number_format($total_abono)}})</p></td>
                            </tr>  
                        </table>
                    </div>
                </td>
            </tr>
        </table>
        <table id="factura_detalle">
            <thead>
                <tr>
                    <th class="textright">Factura No. ($ valor)</th>
                    <th class="textright">Saldo</th>
                    <th class="textright">Retencion</th>            
                    <th class="textright">NC</th>            
                    <th class="textright">Descuento</th>
                    <th class="textright">Neto recibido</th>
                    <th class="textright">Pendiente</th>
                </tr>
            </thead>
            <tbody id="detalle_productos">
                @foreach ($datosRecibo as $item)
                    <tr>
                        <td class="textright">
                            {{ ($item->electronica == '0') ? $item->numero_factura : $item->electronica }} ($ {{number_format($item->valor_factura)}})
                        </td>
                        <td class="textright">$ {{ number_format( $item->saldo ) }}</td>
                        <td class="textright">$ {{ number_format( $item->retencion ) }}</td>
                        <td class="textright">$ {{ number_format( $item->valor_nota ) }}</td>
                        <td class="textright">$ {{ number_format($item->descuento) }}</td>
                        <td class="textright">$ {{ number_format($item->valor) }}</td>                    
                        <td class="textright">$ {{ number_format($item->pendiente ) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div> 
            <br>
            <p>
                <strong>Observaciones:</strong> {{$datosRecibo[0]->observacion}}
            </p>
            <br>
            {{-- <img src="images/firma.jpg" alt="Firma"> --}}
            {{-- <p class="nota">-------------------------------------------------------</p> --}}
            <p class="nota"><strong>A.C:</strong> Andres Arturo Velez Padron</p>
            <p class="nota"><strong>NIT: </strong>6866196-3</p>
            <p class="nota"><strong>CEL:</strong> 3145920820</p>            
        </div> 
    </div>    
</body>
</html>