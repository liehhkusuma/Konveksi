<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchaseRequest;
use App\Models\Configuration;
use App\Models\Distributor;
use App\Models\Material;
use App\Models\Measurement;
use App\Models\OrderPurchase;
use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('purchase_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $purchases = Purchase::when($search, function ($query, $search) {
            $query->where('code', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Purchase/Index', [
            'purchases' => $purchases,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('purchase_create');

        $materials  = Material::active()->get();
        $measurements  = Measurement::active()->get();
        $distributors  = Distributor::active()->get();
        return Inertia::render('Purchase/Create', [
            'status' => session('status'),
            'materials' => $materials,
            'measurements' => $measurements,
            'distributors' => $distributors,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PurchaseRequest $request)
    {
        $this->authorize('purchase_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Purchase::generateCode();
        $purchase = Purchase::create($fields);
        $purchase->materialSync($request->materials ?? []);

        return Redirect::route('purchases.index');
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
        $this->authorize('purchase_edit');

        $purchase = Purchase::with(['materials'])->findOrFail($id);
        $materials  = Material::active()->get();
        $measurements  = Measurement::active()->get();
        $distributors  = Distributor::active()->get();
        return Inertia::render('Purchase/Edit', [
            'status' => session('status'),
            'purchase' => $purchase,
            'materials' => $materials,
            'measurements' => $measurements,
            'distributors' => $distributors,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PurchaseRequest $request, string $id)
    {
        $this->authorize('purchase_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $purchase = Purchase::findOrFail($id);
        $purchase->update($fields);
        $purchase->materialSync($request->materials ?? []);

        return Redirect::route('purchases.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('purchase_destroy');

        $purchase = Purchase::findOrFail($id);

        $purchase->delete();
        return Redirect::route('purchases.index');
    }
}
