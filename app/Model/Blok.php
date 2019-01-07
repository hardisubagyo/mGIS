<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Blok extends Model
{
    protected $table = 'public.blok';
    protected $fillable = ['id_blok','id_perusahaan','nama_blok','no_iup','id_provinsi','id_kabupaten'];
}
