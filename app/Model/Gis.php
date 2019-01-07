<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gis extends Model
{
    /*protected $table = 'public.indonesia_prop';
    protected $fillable = ['id','kode','propinsi','sumber'];*/

    protected $table = 'public.perusahaan';
    protected $fillable = ['id_perusahaan','nama','no_kontrak','alamat','no_telpon','fax','email','no_eksportir','npwp'];
}
