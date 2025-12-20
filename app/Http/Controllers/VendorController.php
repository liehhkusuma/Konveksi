<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendorCreateRequest;
use App\Http\Requests\VendorUpdateRequest;
use App\Models\Configuration;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('vendor_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $vendors = Vendor::when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Vendor/Index', [
            'vendors' => $vendors,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('vendor_create');

        return Inertia::render('Vendor/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VendorCreateRequest $request)
    {
        $this->authorize('vendor_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['join_date'] = date('Y-m-d', strtotime($fields['join_date']));
        Vendor::create($fields);

        return Redirect::route('vendors.index');
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
        $this->authorize('vendor_edit');

        $vendor = Vendor::findOrFail($id);
        return Inertia::render('Vendor/Edit', [
            'vendor' => $vendor,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VendorUpdateRequest $request, string $id)
    {
        $this->authorize('vendor_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $vendor = Vendor::findOrFail($id);

        $fields['join_date'] = date('Y-m-d', strtotime($fields['join_date']));
        $vendor->update($fields);

        return Redirect::route('vendors.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('vendor_destroy');

        $vendor = Vendor::findOrFail($id);
        $vendor->delete();
        return Redirect::route('vendors.index');
    }
}
