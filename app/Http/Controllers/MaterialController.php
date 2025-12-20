<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaterialRequest;
use App\Models\Configuration;
use App\Models\Distributor;
use App\Models\Material;
use App\Models\MaterialCategory;
use App\Models\Measurement;
use App\Models\OrderProductMaterial;
use App\Models\PurchaseOrderMaterial;
use App\Models\PurchaseRequestMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('material_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $materials = Material::with(['category', 'distributor', 'measurement'])->when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Material/Index', [
            'materials' => $materials,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('material_create');

        $categories = MaterialCategory::active()->get();
        $distributors = Distributor::active()->get();
        $measurements = Measurement::active()->get();
        return Inertia::render('Material/Create', [
            'categories' => $categories,
            'distributors' => $distributors,
            'measurements' => $measurements,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MaterialRequest $request)
    {
        $this->authorize('material_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Material::generateCode();
        Material::create($fields);

        return Redirect::route('materials.index');
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
        $this->authorize('material_edit');

        $material = Material::findOrFail($id);
        $categories = MaterialCategory::active()->get();
        $distributors = Distributor::active()->get();
        $measurements = Measurement::active()->get();
        return Inertia::render('Material/Edit', [
            'material' => $material,
            'categories' => $categories,
            'distributors' => $distributors,
            'measurements' => $measurements,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MaterialRequest $request, string $id)
    {
        $this->authorize('material_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $material = Material::findOrFail($id);
        $material->update($fields);

        return Redirect::route('materials.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('material_destroy');

        $material = Material::findOrFail($id);

        $material->delete();
        return Redirect::route('materials.index');
    }
}
