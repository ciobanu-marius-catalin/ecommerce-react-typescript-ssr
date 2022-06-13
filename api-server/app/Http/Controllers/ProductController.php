<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);

        $items = Product::latest()->paginate($perPage);
        $serializedData = $items->toArray();
        $result = [
            'data' => $serializedData['data'],
            'nrOfPages' => $serializedData['last_page']
        ];
        return response()->json($result);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    public function getDummyProducts() {
        $url = "https://fakestoreapi.com/products";
        $data = json_decode(file_get_contents($url), true);

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric'
        ]);

       $item = Product::create($request->all());

        return response()->json($item, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( $id)
    {
        $item = Product::find($id);
        return response()->json($item, 200);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $item = Product::find($id);
        $id = $item->id;
        $data = $request->all();
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric'
        ]);



        $item->update($request->all());

        return response()->json($item, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Product::find($id);
        $item->delete();
        return response()->json(null, 204);
    }
}
