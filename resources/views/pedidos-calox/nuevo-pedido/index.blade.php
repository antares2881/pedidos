@extends('layouts.app')

@section('pedidos-show')
    show
@endsection

@section('pedidos_calox')
    active
@endsection
@section('content')
    <pedidos-calox />
@endsection

@push('versioned-screens')
    <script src="{{ mix('js/screen-PedidosCalox-vue.js') }}"></script>
@endpush
