<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;

class BrandController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'brands' => Brand::where('is_active', true)->orderBy('name')->get(),
        ]);
    }
}
