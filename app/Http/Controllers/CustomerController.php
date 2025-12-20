<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Models\Configuration;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Personnel;
use App\Models\RequestOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('customer_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $customers = Customer::when($search, function ($query, $search) {
            $query->orWhere('name', 'like', "%$search%");
            $query->orWhere('email', 'like', "%$search%");
            $query->orWhere('phone', 'like', "%$search%");
            $query->orWhere('code', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Customer/Index', [
            'customers' => $customers,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('customer_create');

        $customers = Customer::get();
        return Inertia::render('Customer/Create', [
            'customers' => $customers,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerRequest $request)
    {
        $this->authorize('customer_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Customer::generateCode();
        Customer::create($fields);

        return Redirect::route('customers.index');
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
        $this->authorize('customer_edit');

        $customer = Customer::findOrFail($id);
        $customers = Customer::get();
        return Inertia::render('Customer/Edit', [
            'customer' => $customer,
            'customers' => $customers,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CustomerRequest $request, string $id)
    {
        $this->authorize('customer_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $customer = Customer::findOrFail($id);
        $customer->update($fields);

        return Redirect::route('customers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('customer_destroy');

        $customer = Customer::findOrFail($id);

        $ordersCount = Order::where('customer_id', $customer->id)->count();
        if ($ordersCount > 0) {
            return redirect()->back()->withErrors([
                'error' => 'Cannot delete customer with existing orders.',
            ]);
        }

        $requestOrdersCount = RequestOrder::where('customer_id', $customer->id)->count();
        if ($requestOrdersCount > 0) {
            return redirect()->back()->withErrors([
                'error' => 'Cannot delete customer with existing request orders.',
            ]);
        }

        $personnelsCount = Personnel::where('customer_id', $customer->id)->count();
        if ($personnelsCount > 0) {
            return redirect()->back()->withErrors([
                'error' => 'Cannot delete customer with existing PIC.',
            ]);
        }

        $customer->delete();
        return Redirect::route('customers.index');
    }
}
