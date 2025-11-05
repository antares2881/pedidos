@extends('layouts.app')

@section('gestion-recibos', 'active')
@section('facturas-show', 'show')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <gestion-recibos-caja></gestion-recibos-caja>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <!-- Scripts adicionales si son necesarios -->
@endsection