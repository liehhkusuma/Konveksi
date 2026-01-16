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
use App\Models\Purchase;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sales = Sale::sum('total_price');
        $purchases = Purchase::sum('total_price');
        $productions = Production::count();
        $payrolls = Payroll::sum('total_price');

        return Inertia::render('Dashboard', [
            'sales' => $sales,
            'purchases' => $purchases,
            'productions' => $productions,
            'payrolls' => $payrolls,
            'status' => session('status'),
        ]);
    }
}
