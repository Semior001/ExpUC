<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ApiLoginController extends Controller
{
    private $apiToken;

    public function __construct()
    {
        // Unique Token
        $this->apiToken = Str::random(60);
    }

    public function login(Request $request)
    {
        // Validations
        $rules = [
            'email'=>'required|email',
            'password'=>'required|min:8'
        ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->messages(),
            ])->setStatusCode(400);
        } else {
            $user = User::where('email',$request->email)->first();
            if($user) {
                // Verify the password
                if( password_verify($request->password, $user->password) ) {
                    // Update Token
                    $postArray = ['api_token' => $this->apiToken];
                    $login = User::where('email',$request->email)->update($postArray);

                    if($login) {
                        return response()->json([
                            'name'         => $user->name,
                            'email'        => $user->email,
                            'api_token' => $this->apiToken,
                        ])->setStatusCode(200);
                    }
                } else {
                    return response()->json([
                        'message' => 'Unable to log in. Please check that you have entered your login and password correctly.',
                    ])->setStatusCode(400);
                }
            } else {
                return response()->json([
                    'message' => 'Unable to log in. Please check that you have entered your login and password correctly.',
                ])->setStatusCode(403);
            }
        }
        return response()->json([
            'message' => 'Undefined error',
        ]);
    }
}
