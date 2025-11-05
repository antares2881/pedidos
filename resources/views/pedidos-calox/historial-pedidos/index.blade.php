@extends('layouts.app')
@section('historicos-show')
    show
@endsection
@section('historial_pedidos')
    active
@endsection
@section('content')
    <gestion-pedidos :ventas="{{json_encode($ventas)}}"/>
@endsection