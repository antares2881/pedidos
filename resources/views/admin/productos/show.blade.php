@extends('layouts.app')

@section('admin')
    active
@endsection
@section('content')    
    <detalleproductos-component :productos="{{json_encode($productos)}}"/>
@endsection