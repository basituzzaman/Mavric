<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::query();
        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        $orders = $query
            ->with(['items:id,order_id,product_id,quantity'])
            ->orderByDesc('created_at')
            ->get()
            ->map(function (Order $order): array {
                $data = $order->toArray();
                $data['product_ids'] = $order->items
                    ->pluck('product_id')
                    ->filter(fn ($id) => !is_null($id))
                    ->values()
                    ->all();

                return $data;
            })
            ->values();

        return response()->json([
            'success' => true,
            'orders' => $orders,
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Order ID required'], 400);
        }

        $status = $request->input('status');
        if (!$status) {
            return response()->json(['error' => 'Status required'], 400);
        }

        $success = Order::where('id', $id)->update(['status' => $status]) > 0;
        return response()->json(['success' => $success]);
    }

    public function destroy(Request $request)
    {
        $id = $request->query('id');
        if (!$id) {
            return response()->json(['error' => 'Order ID required'], 400);
        }

        $success = Order::where('id', $id)->delete() > 0;
        return response()->json(['success' => $success]);
    }
}
