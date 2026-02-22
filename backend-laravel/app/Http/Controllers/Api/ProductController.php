<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        if ($request->filled('id')) {
            $product = Product::with('brand')->find($request->query('id'));
            if (!$product || !$product->is_active) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            return response()->json(['success' => true, 'product' => $this->transformProduct($product)]);
        }

        $query = Product::with('brand')->where('is_active', true);

        if ($request->filled('brand_id')) {
            $query->where('brand_id', $request->query('brand_id'));
        }

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search): void {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('brand', function ($brandQ) use ($search): void {
                        $brandQ->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $query->orderByDesc('created_at');
        if ($request->filled('limit')) {
            $query->limit((int) $request->query('limit'));
        }

        return response()->json([
            'success' => true,
            'products' => $query->get()->map(fn (Product $product) => $this->transformProduct($product))->values(),
        ]);
    }

    private function transformProduct(Product $product): array
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
