<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'image_url',
        'title',
        'description',
        'link',
        'order_position',
        'is_active',
        'created_at',
    ];

    protected $casts = [
        'order_position' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
    ];
}
