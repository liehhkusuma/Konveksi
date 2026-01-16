<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductionRequest;
use App\Models\Configuration;
use App\Models\Employee;
use App\Models\Product;
use App\Models\Production;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('production_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $productions = Production::with(['employee'])->when($search, function ($query, $search) {
            $query->where('code', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Production/Index', [
            'productions' => $productions,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('production_create');

        $products  = Product::active()->get();
        $employees  = Employee::active()->get();
        return Inertia::render('Production/Create', [
            'status' => session('status'),
            'products' => $products,
            'employees' => $employees,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductionRequest $request)
    {
        $this->authorize('production_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Production::generateCode();
        $production = Production::create($fields);
        $production->productSync($request->products ?? []);

        return Redirect::route('productions.index');
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
        $this->authorize('production_edit');

        $production = Production::with(['products'])->findOrFail($id);
        $products  = Product::active()->get();
        $employees  = Employee::active()->get();
        return Inertia::render('Production/Edit', [
            'status' => session('status'),
            'production' => $production,
            'products' => $products,
            'employees' => $employees,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductionRequest $request, string $id)
    {
        $this->authorize('production_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $production = Production::findOrFail($id);
        $production->update($fields);
        $production->productSync($request->products ?? []);

        return Redirect::route('productions.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('production_destroy');

        $production = Production::findOrFail($id);

        $production->delete();
        return Redirect::route('productions.index');
    }

    /**
     * Display the specified resource.
     */
    public function productions(string $id)
    {
        $productions = Production::with(['products', 'employee'])->where('employee_id', $id)->get();
        return response()->json([
            'productions' => $productions,
        ]);
    }
}
