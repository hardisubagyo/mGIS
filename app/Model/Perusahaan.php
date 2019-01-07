<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Perusahaan extends Model
{
    protected $table = 'public.perusahaan';
    protected $fillable = ['id_perusahaan','nama_blok','no_kontrak','alamat','no_telpon','fax','email','no_eksportir','npwp'];
}
