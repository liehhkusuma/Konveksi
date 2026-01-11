<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class PurchaseRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'distributor_id' => ['required', 'exists:distributors,id'],
            'purchase_date' => ['required', Rule::date()->format('Y-m-d H:i:s')],
            'notes' => ['nullable', 'string'],
            // 'sub_price' => ['required', 'numeric', 'min:0'],
            'total_price' => ['required', 'numeric', 'min:0'],
            'materials'   => 'required|array|min:1',
            'materials.*.material_id' => 'required|exists:materials,id',
            'materials.*.measurement_id' => 'required|exists:measurements,id',
            'materials.*.material' => 'required|string|max:150',
            'materials.*.measurement' => 'required|string|max:150',
            'materials.*.quantity' => 'required|numeric',
            'materials.*.price' => 'required|numeric|min:0',
        ];
    }
}
