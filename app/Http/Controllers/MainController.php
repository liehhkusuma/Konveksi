<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserAccountCreateRequest;
use App\Http\Requests\UserAccountUpdateRequest;
use App\Models\Approval;
use App\Models\ApprovalConfig;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MainController extends Controller
{

    public function test()
    {
        return dd(public_path('logo/logo-blue.png'), file_exists(public_path('logo/logo-blue.png')));
    }
}
