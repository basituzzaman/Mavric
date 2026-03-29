<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'product_code',
        'description',
        'price',
        'original_price',
        'discount_percentage',
        'image_url',
        'image_url_1',
        'image_url_2',
        'image_url_3',
        'image_url_4',
        'image_url_5',
        'additional_images',
        'features',
        'stock_quantity',
        'brand_id',
        'is_active',
        'is_featured',
        'second_badge_text',
    ];

    protected $casts = [
        'price' => 'float',
        'original_price' => 'float',
        'discount_percentage' => 'integer',
        'stock_quantity' => 'integer',
        'brand_id' => 'integer',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'additional_images' => 'array',
        'features' => 'array',
    ];

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
