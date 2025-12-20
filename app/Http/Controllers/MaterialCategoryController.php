<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaterialCategoryRequest;
use App\Models\Configuration;
use App\Models\MaterialCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MaterialCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('material_category_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $material_categories = MaterialCategory::when($search, function ($query, $search) {
            $query->orWhere('name', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('MaterialCategory/Index', [
            'material_categories' => $material_categories,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('material_category_create');

        $material_categories = MaterialCategory::get();
        return Inertia::render('MaterialCategory/Create', [
            'material_categories' => $material_categories,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MaterialCategoryRequest $request)
    {
        $this->authorize('material_category_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        MaterialCategory::create($fields);

        return Redirect::route('material-categories.index');
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
        $this->authorize('material_category_edit');

        $material_category = MaterialCategory::findOrFail($id);
        return Inertia::render('MaterialCategory/Edit', [
            'material_category' => $material_category,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MaterialCategoryRequest $request, string $id)
    {
        $this->authorize('material_category_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $materialCategory = MaterialCategory::findOrFail($id);
        $materialCategory->update($fields);

        return Redirect::route('material-categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('material_category_destroy');

        $materialCategory = MaterialCategory::findOrFail($id);

        $materialCategory->delete();
        return Redirect::route('material-categories.index');
    }
}
