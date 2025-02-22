<?php

namespace App\Http\Requests;

use App\Constants\Days;
use App\Constants\Frequencies;
use App\Constants\Times;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'frequency' => ['required', Rule::in(Frequencies::all())],
            'start_date' => 'required|date|after_or_equal:today',
            'days' => ['required', 'array'],
            'days.*' => ['integer', Rule::in(Days::all())],
            'times' => ['required', 'array'],
            'times.*' => ['integer', Rule::in(Times::all())],
            'notes' => 'nullable|string',
        ];
    }
}
