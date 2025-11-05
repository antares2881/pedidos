@extends('layouts.app')
@section('historicos-show')
    show
@endsection
@section('historial_facturas')
    active
@endsection
@section('content')
    <historialfacturas-component :user="{{json_encode(Auth::user())}}"/>
@endsection