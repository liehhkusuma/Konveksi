<?php

namespace App\Providers;

use App\Models\Permission;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function boot()
    {
        try {
            foreach (Permission::pluck('title') as $permission) {
                Gate::define($permission, function ($user) use ($permission) {
                    if ($user->is_admin) return true;
                    return $user->roles()->whereHas('permissions', function ($q) use ($permission) {
                        $q->where('title', $permission);
                    })->count() > 0;
                });
            }
        } catch (\Exception $e) {
            info('registerUserAccessToGates: Database not found or not yet migrated. Ignoring user permissions while booting app.');
        }
    }
}
