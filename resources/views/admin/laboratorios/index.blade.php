@extends('layouts.app')
@section('admin-show')
    show
@endsection
@section('laboratorios-active')
    active
@endsection
@section('content')
    <laboratorio-component :laboratorios="{{ json_encode($laboratorios) }}" />
@endsection