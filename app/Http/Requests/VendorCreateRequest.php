<?php

namespace App\Http\Requests;

use App\Models\Vendor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class VendorCreateRequest extends FormRequest
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
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(Vendor::class),
            ],
            'phone' => ['nullable', 'numeric'],
            'status' => ['required', 'in:inactive,banned,assesement,active'],
            'join_date' => ['required', Rule::date()->format('Y-m-d H:i:s')],
            'description' => ['nullable'],
        ];
    }
}
