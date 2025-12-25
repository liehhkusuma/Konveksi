<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class DistributorRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'store' => ['required', 'string', 'max:150'],
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'max:15'],
            'address' => ['nullable', 'string'],
            'is_active' => ['required'],
            'members'   => 'required|array|min:1',
            'members.*.name' => 'required|string|max:150',
            'members.*.phone' => 'required|string|max:15',
        ];
    }
}
