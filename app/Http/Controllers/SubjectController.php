<?php

namespace App\Http\Controllers;

use App\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{

    public function addNewSubject(Request $request){
        $subject = new Subject();
        $subject->fill($request->all());
    }

}
