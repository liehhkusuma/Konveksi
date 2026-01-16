<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class ProductionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => ['required', 'exists:employees,id'],
            'production_date' => ['required', Rule::date()->format('Y-m-d H:i:s')],
            'status' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'products'   => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.product' => 'required|string|max:150',
            'products.*.color' => 'required|string|max:150',
            'products.*.quantity' => 'required|numeric|gte:products.*.quantity',
            'products.*.complete_quantity' => 'required|numeric|lte:products.*.quantity',
            'products.*.complete_date' => ['nullable'],
            'products.*.price' => 'required|numeric|min:0',
            'products.*.total_price' => 'required|numeric|min:0',
        ];
    }
}
