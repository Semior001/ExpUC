<?php

namespace App\Http\Controllers;

use App\Subject;
use App\Teacher;
use Illuminate\Http\Request;

class SubjectController extends Controller
{

    public function add(Request $request){
        if( !$request->has('name')
            || !$request->has('weekday')
            || !$request->has('start_time')
            || !$request->has('end_time')
            || !$request->has('place')
            || !$request->has('selectedTeacher')
        ){
            return response()->json('Not enough arguments')->setStatusCode(400);
        }

        $teacher = Teacher::find($request->get('selectedTeacher'));
        if($teacher === null){
            return response()->json('Not enough arguments')->setStatusCode(400);
        }

        $subject = new Subject();
        $subject->fill([
            'name' => $request->get('name'),
            'weekday' => $request->get('weekday'),
            'start_time' => $request->get('start_time'),
            'end_time' => $request->get('end_time'),
            'place' => $request->get('place')
        ]);
        $subject->save();

        $subject->teachers()->save($teacher);

        return response()->json(true)->setStatusCode(200);
    }

}
