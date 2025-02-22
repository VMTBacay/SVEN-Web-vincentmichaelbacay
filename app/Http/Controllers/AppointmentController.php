<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Http\Requests\StoreAppointmentRequest;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    public function store(StoreAppointmentRequest $request)
    {
        $data = $request->validated();

        $appointment = Appointment::create($data);
        return response()->json($appointment, 201);
    }
}
