<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

class ApiRegisterController extends RegisterController
{
    public function register(Request $request)
    {
        $errors = $this->validator($request->all())->messages();

        if(count($errors))
        {
            return response()->json(['message' => $errors])->setStatusCode(400);
        }

        event(new Registered($user = $this->create($request->all())));

        $this->guard()->login($user);

        return response()->json(
            [
                'name'         => $user->name,
                'email'        => $user->email,
                'api_token' => $user->api_token,
            ]
        );
    }
}
