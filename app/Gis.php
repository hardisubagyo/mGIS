<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gis extends Model
{
    protected $table = 'public.indonesia_prop';
    protected $fillable = ['id','kode','propinsi','sumber'];
}
