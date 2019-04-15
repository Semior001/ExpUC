<?php

namespace App\Http\Controllers;

use App\Subject;
use App\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class SubjectController extends Controller
{

    public function add(Request $request){

        $user = $request->user();

        if( !$request->has('name')
            || !$request->has('weekday')
            || !$request->has('start_time')
            || !$request->has('end_time')
            || !$request->has('place')
            || !$request->has('selectedTeacher')
        ){
            return response()->json('Not enough arguments')->setStatusCode(400);
        }

        if(strtotime($request->get('end_time')) < strtotime($request->get('start_time'))){
            return response()->json('Wrong time - end time is earlier than start time')->setStatusCode(400);
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

        $subject->users()->save($user);

        return response()->json(true)->setStatusCode(200);
    }

    public function getAllSubjects(Request $request){
        $user = $request->user();

        $sortBy = 'id';
        $order = 'asc';
        $itemsPerPage = 10;
        $search= '';

        if($request->has('sortBy') && Schema::hasColumn('subjects', $request->get('sortBy'))){
            $sortBy = $request->get('sortBy');
        }

        if($request->has('order') && ($request->get('order') == 'asc' ||  $request->get('order') == 'desc')){
            $order = $request->get('order');
        }

        if($request->has('itemsPerPage')){
            $itemsPerPage = $request->get('itemsPerPage');
        }

        if($request->has('search')){
            $search = $request->get('search');
        }

        if($itemsPerPage == -1){
            $subjects = Subject::where('name', 'like', '%'.$search.'%')
                ->orWhereHas('teachers', function($query) use ($search){
                    $query->where('name', 'like', '%'.$search.'%')
                        ->orWhere('surname', 'like', '%'.$search.'%')
                        ->orWhere('patronymic', 'like', '%'.$search.'%');
                })
                ->with('teachers')
                ->orderBy($sortBy, $order)
                ->get();
            return response()->json([
                "data" => $subjects,
                "total" => $subjects->count()
            ]);
        }

        $subjects = Subject::where('name', 'like', '%'.$search.'%')
            ->orWhereHas('teachers', function($query) use ($search){
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('surname', 'like', '%'.$search.'%')
                    ->orWhere('patronymic', 'like', '%'.$search.'%');
            })
            ->with('teachers')
            ->orderBy($sortBy, $order)
            ->paginate($itemsPerPage);

        foreach($subjects as $subject){
            $subject->isMine = $subject->users()->where('id', $user->id)->exists();
        }

        return response()->json(
            $subjects
        )->setStatusCode(200);

    }

    public function getUserSubjects(Request $request){
        $user = $request->user();
        $subjects = $user->subjects()->with('teachers')->get();
        foreach ($subjects as $subject)
            $subject->telegram_groups = $subject->getTelegramGroups();
        return response()->json($subjects)->setStatusCode(200);
    }

}
