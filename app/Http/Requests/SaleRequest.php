<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class SaleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'seller_id' => ['required', 'exists:sellers,id'],
            'sale_date' => ['required', Rule::date()->format('Y-m-d H:i:s')],
            'notes' => ['nullable', 'string'],
            // 'sub_price' => ['required', 'numeric', 'min:0'],
            'total_price' => ['required', 'numeric', 'min:0'],
            'products'   => 'required|array|min:1',
            'products.*.product_id' => 'required|exists:products,id',
            'products.*.product' => 'required|string|max:150',
            'products.*.color' => 'required|string|max:150',
            'products.*.quantity' => 'required|numeric',
            'products.*.price' => 'required|numeric|min:0',
        ];
    }
}
