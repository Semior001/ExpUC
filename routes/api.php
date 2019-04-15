<?php

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

//use Illuminate\Support\Facades\Artisan;
//Route::get('migrate_database',function(){
//    $var = Artisan::call('migrate');
//    return json_encode($var);
//});

//Route::get('link_storage', function(){
//    $var = Artisan::call('storage:link');
//    return json_encode($var);
//});

Route::post('register', 'ApiRegisterController@register');
Route::post('login', 'ApiLoginController@login');

Route::group(['middleware' => 'auth:api'], function(){
    Route::group(['prefix' => 'user'], function(){
        Route::get('getBasicUserData', 'ApiUserController@getBasicUserData');
        Route::post('update', 'ApiUserController@updateUser');
        Route::post('addSubject', 'ApiUserController@addSubject');
    });

    Route::group(['prefix' => 'teachers'], function(){
        Route::get('list', 'TeacherController@getTeachers');
        Route::post('add', 'TeacherController@add');
    });

    Route::group(['prefix' => 'subjects'], function(){
        Route::post('add', 'SubjectController@add');
        Route::get('list', 'SubjectController@getUserSubjects');
        Route::get('all', 'SubjectController@getAllSubjects');
    });

});
