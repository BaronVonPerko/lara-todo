<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/todo', 'TodoItemController@index');
Route::get('api/todo/{id}', 'TodoItemController@getItem');
Route::post('api/todo', 'TodoItemController@postItem');
Route::delete('api/todo/{id}', 'TodoItemController@deleteItem');
