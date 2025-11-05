@extends('layouts.app')
@section('facturas-show')
    show
@endsection
@section('realizar-facturas')
    active
@endsection
@section('content')
    <facturar-pedidos :factura="{{json_encode($data)}}"  />
@endsection