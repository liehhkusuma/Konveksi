<?php

namespace App\Http\Controllers;

use App\Http\Requests\DistributorRequest;
use App\Models\Configuration;
use App\Models\Distributor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DistributorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('distributor_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $distributors = Distributor::when($search, function ($query, $search) {
            $query->orWhere('name', 'like', "%$search%");
            $query->orWhere('store', 'like', "%$search%");
            $query->orWhere('phone', 'like', "%$search%");
            $query->orWhere('code', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Distributor/Index', [
            'distributors' => $distributors,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('distributor_create');

        $distributors = Distributor::get();
        return Inertia::render('Distributor/Create', [
            'distributors' => $distributors,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DistributorRequest $request)
    {
        $this->authorize('distributor_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Distributor::generateCode();
        $distributor = Distributor::create($fields);
        $distributor->memberSync($request->members);

        return Redirect::route('distributors.index');
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
        $this->authorize('distributor_edit');

        $distributor = Distributor::with(['members'])->findOrFail($id);
        return Inertia::render('Distributor/Edit', [
            'distributor' => $distributor,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DistributorRequest $request, string $id)
    {
        $this->authorize('distributor_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $distributor = Distributor::findOrFail($id);
        $distributor->update($fields);
        $distributor->memberSync($request->members);

        return Redirect::route('distributors.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('distributor_destroy');

        $distributor = Distributor::findOrFail($id);

        $distributor->delete();
        return Redirect::route('distributors.index');
    }
}
