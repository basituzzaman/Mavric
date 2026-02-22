<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Slider;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MavricSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'email' => 'admin@mavric.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        $brands = [
            ['name' => 'ROLEX', 'logo_url' => '/uploads/brands/rolex.png', 'is_active' => true],
            ['name' => 'OMEGA', 'logo_url' => '/uploads/brands/omega.png', 'is_active' => true],
            ['name' => 'PATEK PHILIPPE', 'logo_url' => '/uploads/brands/patek.png', 'is_active' => true],
            ['name' => 'TAG HEUER', 'logo_url' => '/uploads/brands/tag.png', 'is_active' => true],
        ];

        foreach ($brands as $brand) {
            Brand::firstOrCreate(['name' => $brand['name']], $brand);
        }

        $sliders = [
            ['image_url' => '/uploads/sliders/slider1.jpg', 'title' => 'Premium Collection', 'description' => 'Discover our exclusive watch collection', 'link' => '/products', 'order_position' => 1, 'is_active' => true],
            ['image_url' => '/uploads/sliders/slider2.jpg', 'title' => 'Luxury Watches', 'description' => 'Timeless elegance for every occasion', 'link' => '/products', 'order_position' => 2, 'is_active' => true],
        ];

        foreach ($sliders as $slider) {
            Slider::firstOrCreate(['image_url' => $slider['image_url']], $slider);
        }
    }
}
