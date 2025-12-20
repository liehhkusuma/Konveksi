<?php

namespace App\Http\Controllers;

use App\Http\Requests\SellerRequest;
use App\Models\Configuration;
use App\Models\Seller;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('seller_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $sellers = Seller::when($search, function ($query, $search) {
            $query->orWhere('name', 'like', "%$search%");
            $query->orWhere('store', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Seller/Index', [
            'sellers' => $sellers,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('seller_create');

        $positions = Position::active()->get(['id', 'name']);
        return Inertia::render('Seller/Create', [
            'positions' => $positions,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SellerRequest $request)
    {
        $this->authorize('seller_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Seller::generateCode();
        Seller::create($fields);

        return Redirect::route('sellers.index');
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
        $this->authorize('seller_edit');

        $positions = Position::active()->get(['id', 'name']);
        $seller = Seller::findOrFail($id);
        return Inertia::render('Seller/Edit', [
            'seller' => $seller,
            'positions' => $positions,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SellerRequest $request, string $id)
    {
        $this->authorize('seller_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $seller = Seller::findOrFail($id);

        $seller->update($fields);

        return Redirect::route('sellers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('seller_destroy');

        $seller = Seller::findOrFail($id);
        $seller->delete();
        return Redirect::route('sellers.index');
    }
}
