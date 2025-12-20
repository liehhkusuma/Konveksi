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
                // Mengambil input dari request saat ini
                $exterior = $this->input('exterior_production_price');
                $internal = $this->input('interior_production_price');
                $totalProduction = $internal + $exterior;

                if ($value <= $totalProduction) {
                    $fail("The {$attribute} must be greater than the sum of internal and external production costs.");
                }
            }],
            'exterior_production_price' => ['required', 'numeric', 'min:0'],
            'interior_production_price' => ['required', 'numeric', 'min:0'],
            'price' => ['required', 'numeric', 'min:0', 'gt:purchase_price'],
            'is_active' => ['required'],
            'desc' => ['nullable'],
        ];
    }
}
