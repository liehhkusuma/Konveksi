<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Models\Configuration;
use App\Models\Employee;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('employee_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $employees = Employee::with(['position'])->when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Employee/Index', [
            'employees' => $employees,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('employee_create');

        $positions = Position::active()->get(['id', 'name']);
        return Inertia::render('Employee/Create', [
            'positions' => $positions,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request)
    {
        $this->authorize('employee_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['code'] = Employee::generateCode();
        Employee::create($fields);

        return Redirect::route('employees.index');
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
        $this->authorize('employee_edit');

        $positions = Position::active()->get(['id', 'name']);
        $employee = Employee::findOrFail($id);
        return Inertia::render('Employee/Edit', [
            'employee' => $employee,
            'positions' => $positions,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, string $id)
    {
        $this->authorize('employee_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $employee = Employee::findOrFail($id);

        $employee->update($fields);

        return Redirect::route('employees.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('employee_destroy');

        $employee = Employee::findOrFail($id);
        if ($user = User::find($employee['user_id'])) {
            $user->delete();
        }
        $employee->delete();
        return Redirect::route('employees.index');
    }
}
