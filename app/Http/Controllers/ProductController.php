<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Configuration;
use App\Models\Material;
use App\Models\Measurement;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('product_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $products = Product::when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Product/Index', [
            'products' => $products,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('product_create');

        $materials  = Material::active()->get();
        $measurements  = Measurement::active()->get();
        return Inertia::render('Product/Create', [
            'status' => session('status'),
            'materials' => $materials,
            'measurements' => $measurements,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $this->authorize('product_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        if ($request->hasFile('img')) {
            $path = $request->img->store('products');
            $fields['img'] = $path;
        }

        $fields['code'] = Product::generateCode();
        $product = Product::create($fields);
        $product->materialSync($request->materials ?? []);

        return Redirect::route('products.index');
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
        $this->authorize('product_edit');

        $product = Product::with(['materials'])->findOrFail($id);
        $materials  = Material::active()->get();
        $measurements  = Measurement::active()->get();
        return Inertia::render('Product/Edit', [
            'status' => session('status'),
            'product' => $product,
            'materials' => $materials,
            'measurements' => $measurements,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        $this->authorize('product_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        if (isset($fields['img']) && $request->hasFile('img')) {
            $path = $request->img->store('products');
            $fields['img'] = $path;
        } else {
            unset($fields['img']);
        }

        $product = Product::findOrFail($id);
        $product->update($fields);
        $product->materialSync($request->materials ?? []);

        return Redirect::route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('product_destroy');

        $product = Product::findOrFail($id);

        $product->delete();
        return Redirect::route('products.index');
    }
}
