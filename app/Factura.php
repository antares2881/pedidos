<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    public function cobros(){
        return $this->hasMany(Cobro::class, 'factura_id');
    }
    public function clientes(){
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function estado(){
        return $this->belongsTo(Estado::class, 'estado_id');
    }

    public function formapago(){
        return $this->belongsTo(Formapago::class, 'formapago_id');
    }

    public function mediopago(){
        return $this->belongsTo(Mediopago::class, 'mediopago_id');
    }

    public function municipio(){
        return $this->hasOneThrough(
            Municipio::class,
            Cliente::class,
            'id',
            'id',
            'cliente_id',
            'municipio_id'
        );
    }

    public function notas(){
        return $this->hasMany(Nota::class, 'documento_id');
    }

    public function productos(){
        return $this->hasMany(Facturaproducto::class, 'factura_id');
    }

    public function transferencia(){
        return $this->hasManyThrough(
            Productotransferencia::class,
            Transferencia::class,
            'numero',
            'transferencia_id',
            'numero_transferencia',
            'id'
        );
    }
}
