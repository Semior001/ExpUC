<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiUserController extends Controller
{
    public function getBasicUserData(Request $request){
        return response()->json([
            'email' => $request->user()->email,
            'name' => $request->user()->name,
            'surname' => $request->user()->surname,
            'telegram' => $request->user()->telegram
        ])->setStatusCode(200);
    }
}
