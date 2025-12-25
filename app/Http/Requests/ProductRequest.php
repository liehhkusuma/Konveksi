<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class ProductRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'photo' => ['nullable', 'file', 'mimes:jpg,jpeg,png', 'max:2000'],
            'purchase_price' => ['required', 'numeric', 'min:0', function ($attribute, $value, $fail) {
                $packing_price = $this->input('packing_price');
                $other_price = $this->input('other_price');
                $base_production_price = $this->input('base_production_price');
                $exterior = $this->input('exterior_production_price');
                $internal = $this->input('interior_production_price');
                $totalProduction = $internal + $exterior + $packing_price + $other_price + $base_production_price;

                if ($value <= $totalProduction) {
                    $fail("The {$attribute} must be greater than the sum of production costs.");
                }
            }],
            'packing_price' => ['required', 'numeric', 'min:0'],
            'other_price' => ['required', 'numeric', 'min:0'],
            'base_production_price' => ['required', 'numeric', 'min:0'],
            'exterior_production_price' => ['required', 'numeric', 'min:0'],
            'interior_production_price' => ['required', 'numeric', 'min:0'],
            'price' => ['required', 'numeric', 'min:0', 'gt:purchase_price'],
            'is_active' => ['required'],
            'desc' => ['nullable'],
            'materials'   => 'required|array|min:1',
            'materials.*.material_id' => 'required|exists:materials,id',
            'materials.*.measurement_id' => 'required|exists:measurements,id',
            'materials.*.quantity' => 'required|numeric',
            'materials.*.price' => 'required|numeric|min:0',
            'materials.*.notes' => 'required|string|max:150',
        ];
    }
}
