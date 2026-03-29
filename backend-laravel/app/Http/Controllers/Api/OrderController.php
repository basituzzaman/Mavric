<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        if (
            !isset($data['customer_name']) ||
            !isset($data['customer_phone']) ||
            !isset($data['delivery_address']) ||
            !isset($data['items'])
        ) {
            return response()->json(['error' => 'Required fields missing'], 400);
        }

        if (!is_array($data['items']) || count($data['items']) === 0) {
            return response()->json(['error' => 'Order items required'], 400);
        }

        try {
            $result = DB::transaction(function () use ($data): array {
                $orderNumber = 'ORD-'.date('Ymd').'-'.strtoupper(substr(uniqid(), -6));

                $order = Order::create([
                    'order_number' => $orderNumber,
                    'customer_name' => $data['customer_name'],
                    'customer_phone' => $data['customer_phone'],
                    'customer_email' => $data['customer_email'] ?? null,
                    'delivery_address' => $data['delivery_address'],
                    'delivery_zone' => $data['delivery_zone'] ?? 'inside',
                    'delivery_charge' => $data['delivery_charge'] ?? ($data['delivery_zone'] === 'outside' ? 120 : 70),
                    'total_amount' => $data['total_amount'],
                    'payment_method' => $data['payment_method'] ?? 'Cash on Delivery',
                    'status' => $data['status'] ?? 'pending',
                    'notes' => $data['notes'] ?? null,
                ]);

                foreach ($data['items'] as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'product_name' => $item['product_name'],
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                        'subtotal' => $item['price'] * $item['quantity'],
                    ]);

                    Product::where('id', $item['product_id'])
                        ->decrement('stock_quantity', (int) $item['quantity']);
                }

                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                ];
            });

            return response()->json([
                'success' => true,
                'order_id' => $result['id'],
                'order_number' => $result['order_number'],
            ]);
        } catch (Throwable $exception) {
            return response()->json(['error' => 'Failed to create order: '.$exception->getMessage()], 500);
        }
    }
}
