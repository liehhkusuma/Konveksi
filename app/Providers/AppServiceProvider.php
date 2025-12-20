<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Relation::enforceMorphMap([
            'order' => \App\Models\Order::class,
            'proposal' => \App\Models\Proposal::class,
            'purchase-request' => \App\Models\PurchaseRequest::class,
            'purchase-order' => \App\Models\PurchaseOrder::class,
            'project' => \App\Models\Project::class,
        ]);

        Vite::prefetch(concurrency: 3);
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}
