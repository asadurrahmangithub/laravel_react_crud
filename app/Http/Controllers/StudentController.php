<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();
        if($students->count() > 0){
            return response()->json([
                'status' => 200,
                'students' => $students,
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Data Found!'
            ],404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validetor = Validator::make($request->all(),[
            'name' => 'required',
            'roll' => 'required',
            'className' => 'required',
            'phone' => 'required',
            'address' => 'required'
        ]);

        if($validetor->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validetor->messages()
            ],422);
        }else{

            $student = Student::create([
                'name' => $request->name,
                'roll' => $request->roll,
                'className' => $request->className,
                'phone' => $request->phone,
                'address' => $request->address,
            ]);
            if($student){

                return response()->json([
                    'status' => 200,
                    'message' => 'Student Data Save Successfully'
                ],200);

            }else{
                return response()->json([
                    'status' => 500,
                    'message' => 'Something Went Wrong!'
                ],500);
            }
        }
    }

    public function edit(string $id){
        $student = Student::findOrfail($id);
        if($student !== NULL){
            return response()->json([
                'status' => 200,
                'student' => $student
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'error' => '404 Not Found!'
            ],404);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $student = Student::findOrfail($id);
        $student->update([
            'name' => $request->name,
                'roll' => $request->roll,
                'className' => $request->className,
                'phone' => $request->phone,
                'address' => $request->address,
        ]);
        if($student){
            return response()->json([
                'status' => 200,
                'message' => 'Student Data Update Successfully!'
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'error' => 'Something Went Wrong!'
            ],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::findOrfail($id);

        $student->delete();
        if($student){
            return response()->json([
                'status' => 200,
                'message' => 'Student Data Delete Successfully'
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'error' => 'Something Went Wrong!'
            ],404);
        }
    }
}
