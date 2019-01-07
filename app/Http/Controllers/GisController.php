<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Gis;

class GisController extends Controller
{
    /*public function __construct()
    {
        $this->middleware('auth');
    }*/

    public function index()
    {   
    	$prop = Gis::all();
        return view('gis',['prop' => $prop]);

        /*return view('gis');*/
    }
}
