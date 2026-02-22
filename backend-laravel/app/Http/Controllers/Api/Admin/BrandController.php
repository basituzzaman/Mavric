<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'brands' => Brand::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        if (!$request->filled('name')) {
            return response()->json(['error' => 'Name is required'], 400);
        }
        $id = Brand::create($request->only(['name', 'logo_url', 'is_active']))->id;
        return response()->json(['success' => true, 'id' => $id]);
    }

    public function update(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Brand ID required'], 400);
        }
        $success = Brand::where('id', $id)->update($request->only(['name', 'logo_url', 'is_active'])) > 0;
        return response()->json(['success' => $success]);
    }

    public function destroy(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Brand ID required'], 400);
        }
        $success = Brand::where('id', $id)->delete() > 0;
        return response()->json(['success' => $success]);
    }
}
