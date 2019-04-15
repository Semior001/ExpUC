<?php

namespace App\Http\Controllers;

use App\File;
use App\Subject;
use Faker\Provider\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ApiUserController extends Controller
{
    public function getBasicUserData(Request $request){
        $user = $request->user();
        return response()->json([
            'email' => $user->email,
            'name' => $user->name,
            'surname' => $user->surname,
            'telegram' => $user->telegram,
            'showSchedule' => $user->show_schedule,
            'avatar' => $user->avatar()->exists() ? $user->avatar()->orderBy('created_at', 'desc')->first()->path : 'img/account.png'
        ])->setStatusCode(200);
    }

    public function addSubject(Request $request){

        if(!$request->has('id')){
            return response()->json(['message' => 'Not enough arguments'])->setStatusCode(400);
        }

        $subject = Subject::find($request->get('id'));

        if($subject === null){
            return response()->json(['message' => 'Requested subject does not exist!'])->setStatusCode(400);
        }

        $user = $request->user();

        $user->subjects()->save($subject);

        return response('true', 200);

    }

    public function updateUser(Request $request){

        $user = $request->user();

        $request->request->set('email', $user->email);

        if($request->get('password') != $request->get('password_confirmation')){
            return response()->json('Password confirmation does not match')->setStatusCode(400);
        }

        if($request->get('password') == null){
            $request->request->remove('password');
            $request->request->remove('password_confirmation');
        }

        if(Input::hasFile('avatar')){
            $path = $request->file("avatar")->store('uploads', 'public');
            $file = File::create([
                'filename' => $request->file("avatar")->getClientOriginalName(),
                'path' => 'storage/'.$path,
                'local_name' => $request->file("avatar")->hashName(),
                'mime' => $request->file("avatar")->getMimeType(),
                'size' => $request->file("avatar")->getSize()
            ]);

            $user->avatar()->save($file);
        }

        if($request->get('password') != null){
            if(!password_verify($request->get('current_password'), $user->password)){
                return response()->json('Current password does not match')->setStatusCode(400);
            }
            $request->request->set('password', Hash::make($request->get('password')));
        }

        $user->fill($request->all());
        $user->save();

        return response('true', 200);
    }

}
