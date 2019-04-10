<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;

class ApiUserController extends Controller
{
    public function getBasicUserData(Request $request){
        return response()->json([
            'email' => $request->user()->email,
            'name' => $request->user()->name,
            'surname' => $request->user()->surname,
            'telegram' => $request->user()->telegram,
            'avatar' => $request->user()->avatar()->exists() ? 'exists' : 'https://www.gravatar.com/avatar/d9cac07df57d8ffd99b0861f4d1d65f5'
        ])->setStatusCode(200);
    }

    public function getAvatarThumb(Request $request){
        return response('')->setStatusCode(200);
    }

    public function attachAvatar(Request $request){
        $user = $request->user();
        $file = File::create();
    }

}
