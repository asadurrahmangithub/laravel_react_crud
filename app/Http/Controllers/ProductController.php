<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::all();
        if($product->count() > 0){
            return response()->json([
                'status' => 200,
                'product' => $product

            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Product Data Not Found!'
            ],404);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validetor = Validator::make($request->all(),[
            'product_name' => 'required',
            'category' => 'required',
            'product_code' => 'required',
            'product_price' => 'required',
            'description' => 'required',
            'image' => 'nullable'
        ]);

        if($validetor->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validetor->messages()
            ],422);
        }else{

            $product = Product::create([

                'product_name' => $request->product_name,
                'category' => $request->category,
                'product_code' => $request->product_code,
                'product_price' => $request->product_price,
                'description' => $request->description,


                'image' => $this->image($request),

            ]);

            // dd($product);

            if($product){
                return response()->json([
                    'status' => 200,
                    'message' => 'Student Data Save Successfully',
                ],200);
            }else{

                return response()->json([
                    'status' => 500,
                    'message' => 'Something Went Wrong!'
                ],500);
            }
        }
    }

    private function image($request){

        $image = $request->file('image');
        $imageName = 'product-image'.'-'.rand().'.'.$image->extension();
        $directory = 'admin/assets/product-image/';
        $image->move($directory, $imageName);
        return $directory.$imageName;

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
