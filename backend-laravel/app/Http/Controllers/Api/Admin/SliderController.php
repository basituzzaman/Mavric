<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'sliders' => Slider::orderBy('order_position')->get(),
        ]);
    }

    public function store(Request $request)
    {
        if (!$request->filled('image_url')) {
            return response()->json(['error' => 'Image URL is required'], 400);
        }
        $id = Slider::create($request->only(['image_url', 'title', 'description', 'link', 'order_position', 'is_active']))->id;
        return response()->json(['success' => true, 'id' => $id]);
    }

    public function update(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Slider ID required'], 400);
        }
        $success = Slider::where('id', $id)->update($request->only(['image_url', 'title', 'description', 'link', 'order_position', 'is_active'])) > 0;
        return response()->json(['success' => $success]);
    }

    public function destroy(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Slider ID required'], 400);
        }
        $success = Slider::where('id', $id)->delete() > 0;
        return response()->json(['success' => $success]);
    }
}
