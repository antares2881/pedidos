@extends('layouts.app')

@section('admin')
    active
@endsection
@section('content')
    <productos-component :productos="{{json_encode($productos)}}"/>
@endsection