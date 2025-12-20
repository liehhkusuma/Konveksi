<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAccountCreateRequest;
use App\Http\Requests\UserAccountUpdateRequest;
use App\Models\Configuration;
use App\Models\Employee;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('user_account_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $users = User::where('is_admin', false)->when($search, function ($query, $search) {
            $query->where('name', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('User/Account/Index', [
            'users' => $users,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('user_account_create');

        $roles = Role::active()->get(['id', 'title']);
        return Inertia::render('User/Account/Create', [
            'roles' => $roles,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserAccountCreateRequest $request)
    {
        $this->authorize('user_account_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $fields['password'] = Hash::make($fields['password']);
        $fields['username'] = User::generateUsername($fields['name']);
        $user = User::create($fields);
        $user->roles()->sync($fields['role_id']);

        return Redirect::route('user-accounts.index');
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
        $this->authorize('user_account_edit');

        $user = User::where('is_admin', false)->with('roles')->findOrFail($id);
        $roles = Role::active()->get(['id', 'title']);
        return Inertia::render('User/Account/Edit', [
            'user' => $user,
            'roles' => $roles,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserAccountUpdateRequest $request, string $id)
    {
        $this->authorize('user_account_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $user = User::where('is_admin', false)->findOrFail($id);
        $fields['password'] = isset($fields['password']) ? Hash::make($fields['password']) : $user['password'];
        $fields['username'] = $user['name'] != $fields['name'] ? User::generateUsername($fields['name']) : $user['name'];
        $user->update($fields);
        $user->roles()->sync($fields['role_id']);

        if ($employee = Employee::where('user_id', $id)->first()) {
            $employee->update($fields);
        }

        return Redirect::route('user-accounts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('user_account_destroy');

        $user = User::findOrFail($id);
        if ($employee = Employee::where('user_id', $id)->first()) {
            $employee->delete();
        }
        $user->delete();
        return Redirect::route('user-accounts.index');
    }
}
