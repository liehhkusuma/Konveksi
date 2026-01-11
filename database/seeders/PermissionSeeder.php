<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\PermissionCategory;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'role' => 1,
            'user_account' => 2,
            'configuration' => 3,
            'vendor' => 4,
            'employee' => 5,
            'customer' => 6,
            'product' => 7,
            'measurement' => 8,
            'material' => 9,
            'material_category' => 10,
            'distributor' => 11,
            'seller' => 12,
            'purchase' => 13,
            'sale' => 14,
        ];
        foreach ($categories as $key => $value) {
            $exist = PermissionCategory::where('title', $key)->first();
            if (!$exist) {
                PermissionCategory::create([
                    'id' => $value,
                    'title' => $key,
                ]);
            }
        }

        $permissions = [


            ['permission_category_id' => $categories['role'], 'title' => 'role_view'],
            ['permission_category_id' => $categories['role'], 'title' => 'role_create'],
            ['permission_category_id' => $categories['role'], 'title' => 'role_edit'],
            ['permission_category_id' => $categories['role'], 'title' => 'role_destroy'],
            // ['permission_category_id' => $categories['role'], 'title' => 'role_replicate'],

            ['permission_category_id' => $categories['user_account'], 'title' => 'user_account_view'],
            ['permission_category_id' => $categories['user_account'], 'title' => 'user_account_create'],
            ['permission_category_id' => $categories['user_account'], 'title' => 'user_account_edit'],
            ['permission_category_id' => $categories['user_account'], 'title' => 'user_account_destroy'],
            // ['permission_category_id' => $categories['user_account'], 'title' => 'user_account_replicate'],

            ['permission_category_id' => $categories['configuration'], 'title' => 'configuration_view'],
            // ['permission_category_id' => $categories['configuration'], 'title' => 'configuration_create'],
            ['permission_category_id' => $categories['configuration'], 'title' => 'configuration_edit'],
            // ['permission_category_id' => $categories['configuration'], 'title' => 'configuration_destroy'],
            // ['permission_category_id' => $categories['configuration'], 'title' => 'configuration_replicate'],

            ['permission_category_id' => $categories['vendor'], 'title' => 'vendor_view'],
            ['permission_category_id' => $categories['vendor'], 'title' => 'vendor_create'],
            ['permission_category_id' => $categories['vendor'], 'title' => 'vendor_edit'],
            ['permission_category_id' => $categories['vendor'], 'title' => 'vendor_destroy'],
            ['permission_category_id' => $categories['vendor'], 'title' => 'vendor_replicate'],

            ['permission_category_id' => $categories['employee'], 'title' => 'employee_view'],
            ['permission_category_id' => $categories['employee'], 'title' => 'employee_create'],
            ['permission_category_id' => $categories['employee'], 'title' => 'employee_edit'],
            ['permission_category_id' => $categories['employee'], 'title' => 'employee_destroy'],
            ['permission_category_id' => $categories['employee'], 'title' => 'employee_replicate'],

            ['permission_category_id' => $categories['customer'], 'title' => 'customer_view'],
            ['permission_category_id' => $categories['customer'], 'title' => 'customer_create'],
            ['permission_category_id' => $categories['customer'], 'title' => 'customer_edit'],
            ['permission_category_id' => $categories['customer'], 'title' => 'customer_destroy'],
            // ['permission_category_id' => $categories['customer'], 'title' => 'customer_replicate'],

            ['permission_category_id' => $categories['product'], 'title' => 'product_view'],
            ['permission_category_id' => $categories['product'], 'title' => 'product_create'],
            ['permission_category_id' => $categories['product'], 'title' => 'product_edit'],
            ['permission_category_id' => $categories['product'], 'title' => 'product_destroy'],
            // ['permission_category_id' => $categories['product'], 'title' => 'product_replicate'],

            ['permission_category_id' => $categories['measurement'], 'title' => 'measurement_view'],
            ['permission_category_id' => $categories['measurement'], 'title' => 'measurement_create'],
            ['permission_category_id' => $categories['measurement'], 'title' => 'measurement_edit'],
            ['permission_category_id' => $categories['measurement'], 'title' => 'measurement_destroy'],
            // ['permission_category_id' => $categories['measurement'], 'title' => 'measurement_replicate'],

            ['permission_category_id' => $categories['material'], 'title' => 'material_view'],
            ['permission_category_id' => $categories['material'], 'title' => 'material_create'],
            ['permission_category_id' => $categories['material'], 'title' => 'material_edit'],
            ['permission_category_id' => $categories['material'], 'title' => 'material_destroy'],
            // ['permission_category_id' => $categories['material'], 'title' => 'material_replicate'],

            ['permission_category_id' => $categories['material_category'], 'title' => 'material_category_view'],
            ['permission_category_id' => $categories['material_category'], 'title' => 'material_category_create'],
            ['permission_category_id' => $categories['material_category'], 'title' => 'material_category_edit'],
            ['permission_category_id' => $categories['material_category'], 'title' => 'material_category_destroy'],
            // ['permission_category_id' => $categories['material_category'], 'title' => 'material_category_replicate'],

            ['permission_category_id' => $categories['distributor'], 'title' => 'distributor_view'],
            ['permission_category_id' => $categories['distributor'], 'title' => 'distributor_create'],
            ['permission_category_id' => $categories['distributor'], 'title' => 'distributor_edit'],
            ['permission_category_id' => $categories['distributor'], 'title' => 'distributor_destroy'],
            // ['permission_category_id' => $categories['distributor'], 'title' => 'distributor_replicate'],

            ['permission_category_id' => $categories['seller'], 'title' => 'seller_view'],
            ['permission_category_id' => $categories['seller'], 'title' => 'seller_create'],
            ['permission_category_id' => $categories['seller'], 'title' => 'seller_edit'],
            ['permission_category_id' => $categories['seller'], 'title' => 'seller_destroy'],
            // ['permission_category_id' => $categories['seller'], 'title' => 'seller_replicate'],

            ['permission_category_id' => $categories['purchase'], 'title' => 'purchase_view'],
            ['permission_category_id' => $categories['purchase'], 'title' => 'purchase_create'],
            ['permission_category_id' => $categories['purchase'], 'title' => 'purchase_edit'],
            ['permission_category_id' => $categories['purchase'], 'title' => 'purchase_destroy'],
            // ['permission_category_id' => $categories['purchase'], 'title' => 'purchase_replicate'],

            ['permission_category_id' => $categories['sale'], 'title' => 'sale_view'],
            ['permission_category_id' => $categories['sale'], 'title' => 'sale_create'],
            ['permission_category_id' => $categories['sale'], 'title' => 'sale_edit'],
            ['permission_category_id' => $categories['sale'], 'title' => 'sale_destroy'],
            // ['permission_category_id' => $categories['sale'], 'title' => 'sale_replicate'],


        ];

        foreach ($permissions as $key => $permission) {
            $exist = Permission::where('title', $permission['title'])->first();
            if (!$exist) {
                Permission::create($permission);
            }
        }
    }
}
