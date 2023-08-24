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
        $product = Product::findOrfail($id);

        if($product){
            return response()->json([
                'status' => 200,
                'product' => $product
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'errors' => 'Product Data Not Found!'
            ],404);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::find($id);

        if($product){
            $product->product_name = $request->input('product_name');
            $product->category = $request->input('category');
            $product->product_code = $request->input('product_code');
            $product->product_price = $request->input('product_price');
            $product->description = $request->input('description');

            if ($request->file('image')) {
                if (file_exists($product->image)) {
                    unlink($product->image);
                }
                $product->image = $this->image($request);
            }
            $product->update();

            return response()->json([
                'status' => 200,
                'message' => 'Update'
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'errors' => 'Something Went Wrong'
            ],404);

        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);

        if($product){
            if (file_exists($product->image)) {
                unlink($product->image);
            }
            $product->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Product Data Delete'
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'errors' => 'Something Went Wrong!'
            ],404);
        }
    }
}
