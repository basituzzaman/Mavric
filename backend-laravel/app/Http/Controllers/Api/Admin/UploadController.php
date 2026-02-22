<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['error' => 'No file uploaded'], 400);
        }

        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,webp|max:5120',
            'type' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid file type. Only JPG, PNG, GIF, WebP allowed.'], 400);
        }

        $type = $request->input('type', 'products');
        $file = $request->file('file');
        $filename = uniqid().'_'.time().'.'.$file->getClientOriginalExtension();
        $file->move(public_path('uploads/'.$type), $filename);

        return response()->json([
            'success' => true,
            'url' => '/uploads/'.$type.'/'.$filename,
            'filename' => $filename,
        ]);
    }
}
