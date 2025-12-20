<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleCreateRequest;
use App\Http\Requests\RoleRequest;
use App\Http\Requests\RoleUpdateRequest;
use App\Models\Configuration;
use App\Models\PermissionCategory;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('role_view');
        $pagination = Configuration::getValueAttribute('pagination', 10);

        $search = $request->query('search');
        $roles = Role::when($search, function ($query, $search) {
            $query->where('title', 'like', "%$search%");
        })->paginate($pagination);

        return Inertia::render('Role/Index', [
            'roles' => $roles,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('role_create');

        $categories = PermissionCategory::active()->with(['permission'])->whereHas('permission', function ($permission) {
            $permission->active();
        })->get();
        return Inertia::render('Role/Create', [
            'categories' => $categories,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleCreateRequest $request)
    {
        $this->authorize('role_create');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $role = Role::create($fields);
        $role->permissions()->sync($fields['permissions']);

        return Redirect::route('roles.index');
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
        $this->authorize('role_edit');

        $categories = PermissionCategory::active()->with(['permission'])->whereHas('permission', function ($permission) {
            $permission->active();
        })->get();
        $role = Role::with(['permissions'])->findOrFail($id);
        $role->permission_ids = collect($role->permissions)->pluck('id');
        return Inertia::render('Role/Edit', [
            'role' => $role,
            'categories' => $categories,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleUpdateRequest $request, string $id)
    {
        $this->authorize('role_edit');

        $validations = $request->validated();
        $fields = request()->only(array_keys($validations));

        $role = Role::findOrFail($id);
        $role->update($fields);
        $role->permissions()->sync($fields['permissions']);

        return Redirect::route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('role_destroy');

        $role = Role::findOrFail($id);
        $role->permissions()->delete();
        $role->delete();
        return Redirect::route('roles.index');
    }
}
