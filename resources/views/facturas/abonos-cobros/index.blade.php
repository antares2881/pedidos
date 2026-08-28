@extends('layouts.app')
@section('facturas-show')
    show
@endsection
@section('registrar-abonos')
    active
@endsection
@section('content')
    <registrar-abonos-cobros />
@endsection

@push('versioned-screens')
    {{-- Se carga fuera de #app para que Vue no intente compilar la etiqueta script. --}}
    <script src="{{ mix('js/screen-RegistrarAbonosCobros-vue.js') }}"></script>
@endpush
