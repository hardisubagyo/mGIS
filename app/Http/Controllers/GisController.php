<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\Perusahaan;
use App\Model\Blok;
use App\Model\Provinsi;
use App\Model\Kabupaten;

class GisController extends Controller
{
    /*public function __construct()
    {
        $this->middleware('auth');
    }*/

    public function index()
    {   
    	$perusahaan = Perusahaan::orderBy('nama','asc')->get();
        $provinsi = Provinsi::orderBy('nama_provinsi','asc')->get();

        return view('gis',['perusahaan' => $perusahaan, 'provinsi' => $provinsi]);
        
    }

    public function getKodeKabupaten(Request $request){
    	$data = $request->id;
        /*$daftarBlok = Blok::where('id_perusahaan','8ce6c74e-fc56-4f04-9d8c-626a59509e3c')->get();*/
        $daftarBlok = Blok::where('id_perusahaan',$data)->get();

        $ListIdKabupaten = array();
        foreach ($daftarBlok as $item) {
            $ListIdKabupaten[] = json_decode($item->id_kabupaten);
        }

        $jml = sizeof($ListIdKabupaten);

        if($jml > 1){
            $list = array();
            for($x = 0; $x < $jml - 1; $x++){
                $jml_list = sizeof($ListIdKabupaten[$x]);
                for($y = 0; $y <= $jml_list - 1; $y++){
                    $list[] = $ListIdKabupaten[$x][$y];
                }
            }
            $showlist = $list;
        }else if($jml = 1){
            $showlist = $ListIdKabupaten[0];
        }else{
            $showlist = null;
        }

        $NamaKabupaten = array();
        $JmlIdKabupaten = count($showlist);
        for($i = 0; $i < $JmlIdKabupaten; $i++){
            $daftarKabupaten = Kabupaten::where('id_kabupaten',$showlist[$i])->get();
            foreach($daftarKabupaten as $itemKabupaten){
                $NamaKabupaten[] = $itemKabupaten->id_kabupaten;
            }
        }

        $Output = array_unique($NamaKabupaten);
        return json_encode(array_values($Output));

    }

    public function getDataDetail(Request $request){
        $idKab = $request->idKab;
        $idPer = $request->idPer;

        $dataKabupaten = Kabupaten::where('id_kabupaten',$idKab)->get();
        $kabupaten = array();
        foreach($dataKabupaten as $itemKab):
            array_push($kabupaten, array(
                "Kabupaten" => $itemKab->nama_kabupaten
            ));
        endforeach;

        $dataPersahaan = Perusahaan::where('id_perusahaan',$idPer)->get();
        $perusahaan = array();
        foreach($dataPersahaan as $itemPer):
            array_push($perusahaan, array(
                "Nama" => $itemPer->nama,
                "Alamat" => $itemPer->Alamat,
                "NoTelp" => $itemPer->no_telp
            ));
        endforeach;


        $Output = array(
            "DataPerusahaan" => $perusahaan,
            "DataKabupaten" => $kabupaten
        );

        return json_encode($Output);
    }
}
