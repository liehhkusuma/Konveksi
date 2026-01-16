<?php

namespace App\Http\Controllers;

use App\Http\Requests\PayrollRequest;
use App\Models\Configuration;
use App\Models\Employee;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Material;
use App\Models\Measurement;
use App\Models\Payroll;
use App\Models\Production;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('payroll_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $payrolls = Payroll::with('employee')->when($search, function ($query, $search) {
            $query->where('code', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Payroll/Index', [
            'payrolls' => $payrolls,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('payroll_create');

        $products  = Product::active()->get();
        $employees  = Employee::active()->get();
        $colors = Product::query()->pluck('colors')->flatten()->unique()->values()->toArray();
        return Inertia::render('Payroll/Create', [
            'status' => session('status'),
            'products' => $products,
            'employees' => $employees,
            'colors' => $colors,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PayrollRequest $request)
    {
        $this->authorize('payroll_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Payroll::generateCode();
        $payroll = Payroll::create($fields);
        $payroll->productSync($request->products ?? []);

        return Redirect::route('payrolls.index');
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
        $this->authorize('payroll_edit');

        $payroll = Payroll::with(['products'])->findOrFail($id);
        $products  = Product::active()->get();
        $employees  = Employee::active()->get();
        $colors = Product::query()->pluck('colors')->flatten()->unique()->values()->toArray();
        return Inertia::render('Payroll/Edit', [
            'status' => session('status'),
            'payroll' => $payroll,
            'products' => $products,
            'employees' => $employees,
            'colors' => $colors,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PayrollRequest $request, string $id)
    {
        $this->authorize('payroll_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $payroll = Payroll::findOrFail($id);
        $payroll->update($fields);
        $payroll->productSync($request->products ?? []);

        return Redirect::route('payrolls.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('payroll_destroy');

        $payroll = Payroll::findOrFail($id);

        $payroll->delete();
        return Redirect::route('payrolls.index');
    }
}
