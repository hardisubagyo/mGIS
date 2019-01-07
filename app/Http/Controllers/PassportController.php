<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PassportController extends Controller
{
    
    public function index(){
    	$passport = \App\Model\Passport::all();
    	return view('passport/create');
    }

    public function store(Request $request){
    	if($request->hasfile('filename')){
    		$file = $request->file('filename');
    		$name = time().$file->getClientOriginalName();
    		$file = move(public_path(), $name);
    	}

    	$passport = new App\Model\Passport;

    	$passport->name=$request->get('name');
        $passport->email=$request->get('email');
        $passport->number=$request->get('number');
        $date=date_create($request->get('date'));
        $format = date_format($date,"Y-m-d");
        $passport->date = strtotime($format);
        $passport->office=$request->get('office');
        $passport->filename=$name;
        $passport->save();

        return redirect('passport')->with('success','Information has been added');
    }
}
