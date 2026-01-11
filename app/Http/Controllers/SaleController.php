<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaleRequest;
use App\Models\Configuration;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Material;
use App\Models\Measurement;
use App\Models\OrderSale;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('sale_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $sales = Sale::when($search, function ($query, $search) {
            $query->where('code', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Sale/Index', [
            'sales' => $sales,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('sale_create');

        $products  = Product::active()->get();
        $sellers  = Seller::active()->get();
        return Inertia::render('Sale/Create', [
            'status' => session('status'),
            'products' => $products,
            'sellers' => $sellers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaleRequest $request)
    {
        $this->authorize('sale_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Sale::generateCode();
        $sale = Sale::create($fields);
        $sale->productSync($request->products ?? []);

        return Redirect::route('sales.index');
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
        $this->authorize('sale_edit');

        $sale = Sale::with(['products'])->findOrFail($id);
        $products  = Product::active()->get();
        $sellers  = Seller::active()->get();
        return Inertia::render('Sale/Edit', [
            'status' => session('status'),
            'sale' => $sale,
            'products' => $products,
            'sellers' => $sellers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaleRequest $request, string $id)
    {
        $this->authorize('sale_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $sale = Sale::findOrFail($id);
        $sale->update($fields);
        $sale->productSync($request->products ?? []);

        return Redirect::route('sales.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('sale_destroy');

        $sale = Sale::findOrFail($id);

        $sale->delete();
        return Redirect::route('sales.index');
    }
}
