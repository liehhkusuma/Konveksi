<?php

use App\Http\Controllers\ConfigurationController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DistributorController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\MaterialCategoryController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\UserAccountController;
use App\Http\Controllers\VendorController;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/test', [MainController::class, 'test'])->name('test');

Route::prefix('backend')->middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/profile/{tab}', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('user-accounts', UserAccountController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('roles', RoleController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });

    Route::resource('vendors', VendorController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('employees', EmployeeController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('customers', CustomerController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('products', ProductController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });

    Route::resource('measurements', MeasurementController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('material-categories', MaterialCategoryController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('materials', MaterialController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('configurations', ConfigurationController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('distributors', DistributorController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
    Route::resource('sellers', SellerController::class)->missing(function (Request $request) {
        return Redirect::route('dashboard');
    });
});

require __DIR__ . '/auth.php';
