@extends('layouts.app')
@section('productos-show')
    show
@endsection
@section('promociones', 'active')

@section('content')
<style>
.card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 10px;
}

.card-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px 10px 0 0 !important;
    padding: 1rem 1.5rem;
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 25px;
    padding: 0.5rem 1.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.table-responsive {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.table thead th {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: none;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.8rem;
    color: #495057;
    padding: 1rem;
}

.table tbody tr {
    border-bottom: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.table tbody tr:hover {
    background-color: #f8f9fd;
    transform: translateY(-1px);
}

.table tbody td {
    padding: 1rem;
    vertical-align: middle;
    border: none;
}

.upload-area {
    border: 2px dashed #667eea;
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    transition: all 0.3s ease;
    cursor: pointer;
}

.upload-area:hover {
    border-color: #764ba2;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.upload-area.dragover {
    border-color: #28a745;
    background: rgba(40, 167, 69, 0.1);
}

.form-control {
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    padding: 0.75rem;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.alert {
    border-radius: 10px;
    border: none;
    padding: 1rem 1.5rem;
}

.loading-spinner {
    display: none;
    text-align: center;
    padding: 2rem;
}

.spinner-border {
    color: #667eea;
}

.badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 500;
}

.badge-success {
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.badge-danger {
    background: linear-gradient(135deg, #dc3545 0%, #e74c3c 100%);
}

.badge-warning {
    background: linear-gradient(135deg, #ffc107 0%, #f39c12 100%);
    color: #333;
}

.btn-group .btn {
    margin-right: 5px;
}

.btn-group .btn:last-child {
    margin-right: 0;
}

.modal-xl {
    max-width: 90%;
}

.table-responsive {
    border: 1px solid #dee2e6;
    border-radius: 8px;
}

.table th {
    background-color: #f8f9fa !important;
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.table td {
    font-size: 0.9rem;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sticky-top {
    position: sticky;
    top: 0;
    z-index: 10;
}
</style>

<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="mb-0">
                        <i class="fas fa-tags me-2"></i>
                        Gestión de Promociones
                    </h4>
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-12">
                            <promociones-component></promociones-component>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection