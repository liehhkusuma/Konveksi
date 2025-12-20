<?php

namespace App\Http\Controllers;

use App\Http\Requests\MeasurementRequest;
use App\Models\Configuration;
use App\Models\Measurement;
use App\Models\OrderProductMaterial;
use App\Models\PurchaseOrderMaterial;
use App\Models\PurchaseRequestMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MeasurementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('measurement_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $measurements = Measurement::when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Measurement/Index', [
            'measurements' => $measurements,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('measurement_create');

        return Inertia::render('Measurement/Create', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MeasurementRequest $request)
    {
        $this->authorize('measurement_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        Measurement::create($fields);

        return Redirect::route('measurements.index');
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
        $this->authorize('measurement_edit');

        $measurement = Measurement::findOrFail($id);
        return Inertia::render('Measurement/Edit', [
            'measurement' => $measurement,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MeasurementRequest $request, string $id)
    {
        $this->authorize('measurement_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $measurement = Measurement::findOrFail($id);
        $measurement->update($fields);

        return Redirect::route('measurements.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('measurement_destroy');

        $measurement = Measurement::findOrFail($id);

        $ordersCount = OrderProductMaterial::where('measurement_id', $measurement->id)->count();
        if ($ordersCount > 0) {
            return redirect()->back()->withErrors([
                'error' => 'Cannot delete measurement with existing orders.',
            ]);
        }
        $purchaseOrderMaterialCount = PurchaseOrderMaterial::where('measurement_id', $measurement->id)->count();
        if ($purchaseOrderMaterialCount > 0) {
            return redirect()->back()->withErrors([
                'error' => 'Cannot delete measurement with existing orders.',
            ]);
        }
        $purchaseRequestMaterialCount = PurchaseRequestMaterial::where('measurement_id', $measurement->id)->count();
        if ($purchaseRequestMaterialCount > 0) {
            return redirect()->back()->withErrors([
                'error' => 'Cannot delete measurement with existing orders.',
            ]);
        }

        $measurement->delete();
        return Redirect::route('measurements.index');
    }
}
