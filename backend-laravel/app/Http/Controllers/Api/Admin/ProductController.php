<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Throwable;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        if ($request->filled('id')) {
            $product = Product::with('brand')->find($request->query('id'));
            if (!$product) {
                return response()->json(['error' => 'Product not found'], 404);
            }
            return response()->json(['success' => true, 'product' => $this->mapProduct($product)]);
        }

        $query = Product::with('brand');
        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->query('brand_id'));
        }
        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search): void {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return response()->json([
            'success' => true,
            'products' => $query->orderByDesc('created_at')->get()->map(fn (Product $product) => $this->mapProduct($product))->values(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if (!isset($data['name']) || !isset($data['price'])) {
            return response()->json(['error' => 'Name and price are required'], 400);
        }

        $id = Product::create($this->normalizePayload($data))->id;

        return response()->json(['success' => true, 'id' => $id]);
    }

    public function update(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Product ID required'], 400);
        }

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['success' => false], 404);
        }

        $product->update($this->normalizePayload($request->all()));

        return response()->json(['success' => true]);
    }

    public function destroy(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Product ID required'], 400);
        }

        try {
            OrderItem::where('product_id', $id)->delete();
            Product::where('id', $id)->delete();
            return response()->json(['success' => true, 'message' => 'Product deleted successfully']);
        } catch (Throwable) {
            return response()->json(['error' => 'Server error during delete'], 500);
        }
    }

    private function normalizePayload(array $data): array
    {
        if (array_key_exists('additional_images', $data) && is_array($data['additional_images'])) {
            $data['additional_images'] = array_values(array_filter($data['additional_images']));
        }

        return $data;
    }

    private function mapProduct(Product $product): array
    {
        $data = $product->toArray();
        $data['brand_name'] = $product->brand?->name;

        $images = [];
        if (is_array($product->additional_images)) {
            $images = $product->additional_images;
        }

        foreach (['image_url_1', 'image_url_2', 'image_url_3', 'image_url_4', 'image_url_5'] as $legacyField) {
            if (!empty($product->{$legacyField})) {
                $images[] = $product->{$legacyField};
            }
        }

        $images = array_values(array_unique(array_filter($images, fn ($image) => is_string($image) && trim($image) !== '' && $image !== $product->image_url)));
        $data['additional_images'] = $images;

        return $data;
    }
}
