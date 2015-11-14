<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::any('login', 'AuthController@login');

/**
 * Groups of routes that needs authentication to access.
 */
Route::group(array('before' => 'auth'), function() {

	Route::any('/', array( 'as' => 'home', 'uses' => 'AppController@index' ) );

	Route::get('logout', 'AuthController@logout');

});

/**
* API routes, check authentication to access
*/
Route::group(array('prefix' => 'api/v1', 'before' => 'apiauth'), function() {

	//CONGIG
	Route::get('config/programs', 'ConfigController@getUserPrograms');
	Route::get('config/rights', 'ConfigController@getUserRights');

	//hack for program edit, because PUT request do not accept multipart/form-data
	Route::post('program/{id}', 'ProgramController@update');

	Route::resource('alumni', 'AlumniController');
	Route::resource('program', 'ProgramController');
	Route::resource('user', 'UserController');

});

/**
* Patial views for angular template
*/
Route::group(array(), function() {


});