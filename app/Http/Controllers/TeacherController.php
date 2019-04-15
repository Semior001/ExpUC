<?php

namespace App\Http\Controllers;

use App\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;

class TeacherController extends Controller
{

    public function add(Request $request){
        if(!$request->has('name') || !$request->has('surname') || !$request->has('patronymic'))
            return response()->json(['message' => 'Not enough arguments'])->setStatusCode(400);
        Teacher::create($request->all());
    }

    public function getTeachers(Request $request){
        $sortBy = 'id';
        $order = 'asc';
        $itemsPerPage = 10;
        $search= '';

        if($request->has('sortBy') && Schema::hasColumn('teachers', $request->get('sortBy'))){
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
            $teachers = Teacher::where('name', 'like', '%'.$search.'%')
                ->orWhere('surname', 'like', '%'.$search.'%')
                ->orWhere('patronymic', 'like', '%'.$search.'%')
                ->orderBy($sortBy, $order)
                ->get();
            return response()->json([
                "data" => $teachers,
                "total" => $teachers->count()
            ]);
        }

        $teachers = Teacher::where('name', 'like', '%'.$search.'%')
            ->orWhere('surname', 'like', '%'.$search.'%')
            ->orWhere('patronymic', 'like', '%'.$search.'%')
            ->orderBy($sortBy, $order)
            ->paginate($itemsPerPage);

        return response()->json(
            $teachers
        )->setStatusCode(200);
    }
}
