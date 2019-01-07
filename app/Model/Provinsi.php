<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Provinsi extends Model
{
    protected $table = 'public.master_provinsi';
    protected $fillable = ['id_provinsi','nama_provinsi','kode_provinsi'];
}
