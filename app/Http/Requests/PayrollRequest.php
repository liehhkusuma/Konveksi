<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class PayrollRequest extends FormRequest
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
            'payroll_date' => ['required', Rule::date()->format('Y-m-d H:i:s')],
            'sub_price' => ['required', 'numeric', 'min:0'],
            'minus' => ['required', 'numeric', 'min:0'],
            'cashbon' => ['required', 'numeric', 'min:0'],
            'tip' => ['required', 'numeric', 'min:0'],
            'total_price' => ['required', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string'],
            // 'remains' => ['required', 'numeric', 'min:0'],
            'products'   => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            // 'products.*.production_id' => 'required|exists:productions,id',
            'products.*.product' => 'required|string|max:150',
            'products.*.color' => 'required|string|max:150',
            'products.*.quantity' => 'required|numeric',
            'products.*.price' => 'required|numeric|min:0',
        ];
    }
}
