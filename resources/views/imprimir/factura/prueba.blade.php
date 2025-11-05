<!DOCTYPE html>
<html lang="es">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>    
    <title>Factura de venta</title>
    <link rel="stylesheet" href="css/pdf.css">  
    
</head>
<body> 
    @if ($factura->estado_id == 3)        
        <img class="anulada" src="images/anulado.png" alt="Anulada">
    @endif
    <header>
        
    </header>
    <div id="page_pdf">
        <table id="factura_head">
            <tr>
                <!-- <td class="logo_factura">
                    <div>
                        <img src="qrcodes/qrcode.svg" alt="">
                    </div>
                </td> -->
                <td class="info_empresa">
                    <div>
                        <span class="h2">{{$mayorista->nombres}} {{$mayorista->apellidos}}</span>
                        <h3>NIT: {{$mayorista->nit}}-{{$mayorista->dv}}</h3>
                        <br>
                        <p>COLOMBIA - {{$mayorista->municipio->mcpio}} - {{$mayorista->departamento->nombre_dpto}}</p>
                        <p>{{$mayorista->direccion}}</p>
                        <p>{{$mayorista->email}}</p>
                        <p>{{$mayorista->telefono}}</p>
                    </div>
                </td>
                <td class="info_factura">
                    <div>
                        <span class="h3">Factura de venta No. <strong>{{$factura->numero_factura}}</strong></span>    
                    </div>
                </td>
            </tr>
        </table>
        <table id="factura_cliente">
            <tr>
                <td class="info_cliente">
                    <div class="round">
                        <span class="h3"> Datos del Cliente</span>
                        <table class="datos_cliente">
                            <tr>
                                <td style="width:75%;">
                                    <label><strong>Señores:</strong></label> 
                                    <p>{{$factura->clientes->razon_social}}</p>
                                </td>
                                <td>                                
                                    <label for=""><strong>Fecha Expedicion: </strong></label>
                                    <p>{{date('M j, Y', strtotime($factura->fecha_factura))}} {{$factura->hora_factura}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label><strong>Nit:</strong></label>
                                    <p>{{$factura->clientes->nit}}-{{$factura->clientes->dv}}</p>
                                </td>
                                <td>
                                    <label for=""><strong>Fecha Vencimiento: </strong></label>
                                    <p>{{date('M j, Y', strtotime($factura->fecha_vencimiento))}} 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label><strong>Dirección:</strong></label> <p>{{$factura->clientes->direccion}}</p>
                                </td>
                                <td>
                                    <label for=""><strong>Forma de pago: </strong></label>
                                    <p>{{$factura->formapago->forma_pago}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label><strong>Teléfono:</strong></label> 
                                    <p>{{$factura->clientes->telefono}}</p>
                                </td>
                                <td>
                                    <label for=""><strong>Medio de pago: </strong></label>
                                    <p>{{$factura->mediopago->medio_pago}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for=""><strong>Ciudad:</strong></label>
                                    <p>{{$mundep_cliente->municipios->mcpio}}/{{$mundep_cliente->departamentos->nombre_dpto}}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>    
            </tr>
        </table>
        <table id="factura_detalle">
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
        </table>   
        <table>
            <tbody id="detalle_totales">
                <tr>
                    <td rowspan="3" class="textleft" >
                        <img src="qrcodes/qrcode.svg" alt="">
                    </td>
                    <td colspan="2" width="450px">
                        <p><strong>SON:</strong> {{convertir($factura->valor)}} PESOS - COP</p>
                    </td>
                    <td colspan="2" class="textright" width="150px"><span><strong>Subtotal.</strong></span></td>
                    <td class="textright" ><span><strong>$ {{number_format($factura->valor)}}</strong></span></td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2" >
                        <p><strong>Observaciones:</strong> {{$factura->observaciones}}</p>
                        <p>
                            @if($new_pag > 0)
                                Se adjunta hoja con bonificaciones enviadas.
                            @endif
                        </p>
                    </td>
                    <td colspan="2" class="textright" ><span><strong>+ I.V.A (0.00 %)</strong></span></td>
                    <td class="textright"><span><strong>$ {{number_format($factura->iva, 2)}}</strong></span></td>
                </tr>
                <tr >
                    <td colspan="2" class="textright" ><span><strong>TOTAL.</strong></span></td>
                    <td class="textright"><span><strong>$ {{number_format($factura->valor)}}</strong></span></td>
                </tr>
                <tr>
                    <td colspan="6">
                        <p style="font-size:12pt;">Favor consignar a cuenta de ahorros Bancolombia No. 790-357092-96</p>
                    </td>
                <tr>
                    <td colspan="6"><p class="nota">Resolución DIAN No. 18763006245005 Fecha: 2020/06/05</p></td>
                </tr>
            </tbody>
        </table> 
    </div>   
    
    @if($new_pag > 0) 
    <div id="page_pdf" style="page-break-before:always;">
        
        <table id="factura_head">
            <tr>                
                <td class="info_empresa">
                    <div>
                        <span class="h2">{{$mayorista->nombres}} {{$mayorista->apellidos}}</span>
                        <h3>NIT: {{$mayorista->nit}}-{{$mayorista->dv}}</h3>
                        <br>
                        <p>COLOMBIA - {{$mayorista->municipio->mcpio}} - {{$mayorista->departamento->nombre_dpto}}</p>
                        <p>{{$mayorista->direccion}}</p>
                        <p>{{$mayorista->email}}</p>
                        <p>{{$mayorista->telefono}}</p>
                    </div>
                </td>
                <td class="info_factura">
                    <div>
                        <span class="h3">Factura de venta No. <strong>{{$factura->numero_factura}}</strong></span>    
                    </div>
                </td>
            </tr>
        </table>
        <table id="factura_cliente">
            <tr>
                <td class="info_cliente">
                    <div class="round">
                        <span class="h3"> Datos del Cliente</span>
                        <table class="datos_cliente">
                            <tr>
                                <td style="width:75%;">
                                    <label><strong>Señores:</strong></label> 
                                    <p>{{$factura->clientes->razon_social}}</p>
                                </td>
                                <td>                                
                                    <label for=""><strong>Fecha Expedicion: </strong></label>
                                    <p>{{date('M j, Y', strtotime($factura->fecha_factura))}} {{$factura->hora_factura}} 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label><strong>Nit:</strong></label>
                                    <p>{{$factura->clientes->nit}}-{{$factura->clientes->dv}}</p>
                                </td>
                                <td>
                                    <label for=""><strong>Fecha Vencimiento: </strong></label>
                                    <p>{{date('M j, Y', strtotime($factura->fecha_vencimiento))}} 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label><strong>Dirección:</strong></label> <p>{{$factura->clientes->direccion}}</p>
                                </td>
                                <td>
                                    <label for=""><strong>Forma de pago: </strong></label>
                                    <p>{{$factura->formapago->forma_pago}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label><strong>Teléfono:</strong></label> 
                                    <p>{{$factura->clientes->telefono}}</p>
                                </td>
                                <td>
                                    <label for=""><strong>Medio de pago: </strong></label>
                                    <p>{{$factura->mediopago->medio_pago}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for=""><strong>Ciudad:</strong></label>
                                    <p>{{$mundep_cliente->municipios->mcpio}}/{{$mundep_cliente->departamentos->nombre_dpto}}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>    
            </tr>
        </table>
        <table id="factura_detalle">
            <thead>
                <tr style="background-color: #ededed;">
                    <th class="textleft" width="100px">Item</th>
                    <th class="textleft">Descripción</th>
                    <th width="50px">Bonificacion</th>
                    <th class="textright" width="100px">Valor Unit.</th>
                    <th class="textright" width="50px">IVA.</th>
                    <th class="textright" width="100px">Valor Total</th>
                </tr>
            </thead>
            <tbody id="detalle_productos">
                @php
                    $con = 1;
                @endphp
                @foreach ($productos as $item)     
                    @if($item->bonificacion > 0)          
                        <tr>
                            <td class="textleft">
                                {{$con++}}   {{$item->detalleproducto->codigo}}
                            </td>
                            <td>{{$item->productos->producto}} X {{$item->presentaciones->presentacion}}</td>
                            <td class="textcenter">{{$item->bonificacion}}</td>
                            <td class="textright">$ 0.00</td>
                            <td class="textright">% 0.00</td>
                            <td class="textright">$ 0.00</td>
                        </tr>
                    @endif
                @endforeach                
            </tbody>            
        </table>   
        <table>
            <tbody id="detalle_totales">
                <tr>                    
                    <td colspan="3" width="450px">
                        <p><strong>SON:</strong> 0.00 PESOS - COP</p>
                    </td>
                    <td colspan="2" class="textright" width="150px"><span><strong>Subtotal.</strong></span></td>
                    <td class="textright" ><span><strong>$ 0.00</strong></span></td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="3" >
                        <p><strong>Observaciones:</strong> Detalle de bonificaciones enviadas.</p>
                    </td>
                    <td colspan="2" class="textright" ><span><strong>+ I.V.A (0.00 %)</strong></span></td>
                    <td class="textright"><span><strong>$ 0.00</strong></span></td>
                </tr>
                <tr >
                    <td colspan="2" class="textright" ><span><strong>TOTAL.</strong></span></td>
                    <td class="textright"><span><strong>$ 0.00</strong></span></td>
                </tr>
            </tbody>
        </table> 
    </div>
    <!-- <div style="page-break-after:never;"></div> -->
    @endif
    <div id="page_pdf" style="page-break-before:always;">
        @for($i=0; $i < $rotulos; $i++)
            <div class="rotulo">
                <h1>{{$factura->clientes->razon_social}}</h1>
                <h2><strong>DIR: </strong>{{$factura->clientes->direccion}}</h2>
                <h2><strong>TEL: </strong>{{$factura->clientes->telefono}}</h2>
                <h2>{{$mundep_cliente->municipios->mcpio}}</h2>
                <h2>{{$mundep_cliente->departamentos->nombre_dpto}}</h2>
            </div>
        @endfor 
    </div>
    <footer>
        <p>Creado con solucion propia @pedidos, para mas informacion comunicarse via email antares2881@gmail.com</p>
    </footer>
</body>
</html>