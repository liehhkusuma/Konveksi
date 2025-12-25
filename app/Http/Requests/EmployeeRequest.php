<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class EmployeeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'position_id' => ['required'],
            'name' => ['required', 'string', 'max:150'],
            'category' => ['required', 'in:daily,project'],
            'type' => ['required', 'in:exterior,interior,default'],
            'phone' => ['required', 'numeric', 'max_digits:15'],
            'cashbon' => ['required', 'numeric', 'min:0'],
            'salary' => ['required_if:category,daily', 'numeric', 'min:0'],
            'is_active' => ['required'],
            'address' => ['nullable'],
        ];
    }
}
