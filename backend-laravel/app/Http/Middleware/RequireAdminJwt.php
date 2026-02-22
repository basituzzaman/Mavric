<?php

namespace App\Http\Middleware;

use App\Services\JwtService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireAdminJwt
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');
        $token = null;
        if (is_string($header) && str_starts_with($header, 'Bearer ')) {
            $token = substr($header, 7);
        }

        if (!$token) {
            return response()->json(['error' => 'Authentication required'], 401);
        }

        $payload = JwtService::verify($token);
        if (!$payload) {
            return response()->json(['error' => 'Invalid or expired token'], 401);
        }

        if (($payload['role'] ?? null) !== 'admin') {
            return response()->json(['error' => 'Admin access required'], 403);
        }

        $request->attributes->set('auth_user', $payload);

        return $next($request);
    }
}
