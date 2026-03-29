<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slider;

class SliderController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'sliders' => Slider::where('is_active', true)->orderBy('order_position')->limit(3)->get(),
        ]);
    }
}
