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

        $payload = $this->normalizePayload($request);
        if ($payload['is_active'] && Slider::where('is_active', true)->count() >= 3) {
            return response()->json(['error' => 'Maximum 3 active sliders allowed'], 400);
        }

        $id = Slider::create($payload)->id;
        return response()->json(['success' => true, 'id' => $id]);
    }

    public function update(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Slider ID required'], 400);
        }

        $slider = Slider::find($id);
        if (!$slider) {
            return response()->json(['success' => false], 404);
        }

        $payload = $this->normalizePayload($request);
        if (
            $payload['is_active']
            && !$slider->is_active
            && Slider::where('is_active', true)->count() >= 3
        ) {
            return response()->json(['error' => 'Maximum 3 active sliders allowed'], 400);
        }

        $success = Slider::where('id', $id)->update($payload) > 0;
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

    private function normalizePayload(Request $request): array
    {
        return [
            'image_url' => $request->input('image_url'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'link' => $request->input('link'),
            'order_position' => (int) $request->input('order_position', 0),
            'is_active' => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
        ];
    }
}
