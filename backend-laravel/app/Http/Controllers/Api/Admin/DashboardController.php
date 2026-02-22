<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'revenue' => (float) (Order::where('status', '!=', 'cancelled')->sum('total_amount') ?? 0),
        ];

        $recentOrders = Order::orderByDesc('created_at')->limit(5)->get();
        $lowStock = Product::where('stock_quantity', '<=', 5)
            ->orderBy('stock_quantity')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'stats' => $stats,
            'recent_orders' => $recentOrders,
            'low_stock' => $lowStock,
        ]);
    }
}
