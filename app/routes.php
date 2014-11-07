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

	Route::resource('alumni', 'AlumniController');
	Route::resource('programs', 'ProgramsController');

});

/**
* Patial views for angular template
*/
Route::group(array(), function() {


});