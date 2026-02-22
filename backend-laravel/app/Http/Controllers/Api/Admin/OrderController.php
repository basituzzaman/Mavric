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

        return response()->json([
            'success' => true,
            'orders' => $query->orderByDesc('created_at')->get(),
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
