<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Kabupaten extends Model
{
    protected $table = 'public.master_kabupaten';
    protected $fillable = ['id_kabupaten','kode_provinsi','kode_kabupaten','nama_kabupaten'];
}
