<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'ApiRegisterController@register');
Route::post('login', 'ApiLoginController@login');

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('user/getBasicUserData', 'ApiUserController@getBasicUserData');
    Route::post('user/update', 'ApiUserController@updateUser');
});
