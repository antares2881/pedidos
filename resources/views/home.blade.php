@extends('layouts.app')

@section('pedidos-show')
    show
@endsection

@section('transferencias')
    active
@endsection


@section('content')
    <home-component :num="{{json_encode($num)}}" />
@endsection


