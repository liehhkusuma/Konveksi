<?php

namespace App\Http\Middleware;

use App\Models\Configuration;
use App\Models\Employee;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'is_admin' => $request->user()->is_admin,
                    'role' => $this->getRole($request->user()->roles),
                ] : null,
                'can' => Permission::active()->get()->map(function ($permission) {
                    if (Auth::check()) {
                        return [$permission['title'] => Auth::user()->can($permission['title'])];
                    }
                    return [$permission['title'] => false];
                })->collapse()->all(),
            ],
            'configuration' => [
                'signatory_name' => Configuration::getValueAttribute('signatory_name'),
                'company_name' => Configuration::getValueAttribute('signatory_company'),
                'company_address' => Configuration::getValueAttribute('company_address'),
                'company_phone' => Configuration::getValueAttribute('company_phone'),
                'company_email' => Configuration::getValueAttribute('company_email'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
                'pathname' => $request->path(),
                'uploads' => env('APP_URL') . '/uploads',
            ],
            'flash' => [
                'dataFlashId' => fn() => $request->session()->get('dataFlashId')
            ],
        ];
    }

    public function getRole($roles)
    {
        if (count($roles)) {
            return $roles[0]['title'];
        }
        return '-';
    }
}
