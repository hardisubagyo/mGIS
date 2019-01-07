<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


// GIS
Route::get('/gis', 'GisController@index');
Route::get('getKabupaten','GisController@getKodeKabupaten');
Route::get('getDataDetail','GisController@getDataDetail');


Route::get('/passport', 'PassportController@index');