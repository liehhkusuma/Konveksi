<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfigurationRequest;
use App\Models\Configuration;
use App\Models\Customer;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('configuration_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $configurations = Configuration::when($search, function ($query, $search) {
            $query->orWhere('name', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Configuration/Index', [
            'configurations' => $configurations,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('configuration_create');

        $customers = Customer::get();
        return Inertia::render('Configuration/Create', [
            'customers' => $customers,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ConfigurationRequest $request)
    {
        $this->authorize('configuration_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['slug'] = Str::slug($fields['name']);
        $configuration = Configuration::create($fields);

        return Redirect::route('configurations.index');
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
        $this->authorize('configuration_edit');

        $configuration = Configuration::findOrFail($id);
        return Inertia::render('Configuration/Edit', [
            'configuration' => $configuration,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ConfigurationRequest $request, string $id)
    {
        $this->authorize('configuration_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $configuration = Configuration::findOrFail($id);
        $configuration->update($fields);

        return Redirect::route('configurations.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('configuration_destroy');

        $configuration = Configuration::findOrFail($id);
        return Redirect::route('configurations.index');
    }
}
