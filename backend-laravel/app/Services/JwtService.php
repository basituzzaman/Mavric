<?php

namespace App\Services;

class JwtService
{
    public static function generate(array $payload): string
    {
        $secret = env('JWT_SECRET', 'your-secret-key-change-this-in-production');
        $expire = (int) env('JWT_EXPIRE', 86400);
        $time = time();

        $header = ['typ' => 'JWT', 'alg' => 'HS256'];
        $payload['iat'] = $time;
        $payload['exp'] = $time + $expire;

        $base64Header = self::base64UrlEncode(json_encode($header));
        $base64Payload = self::base64UrlEncode(json_encode($payload));
        $signature = hash_hmac('sha256', $base64Header.'.'.$base64Payload, $secret, true);
        $base64Signature = self::base64UrlEncode($signature);

        return $base64Header.'.'.$base64Payload.'.'.$base64Signature;
    }

    public static function verify(?string $token): array|false
    {
        if (!$token) {
            return false;
        }

        $secret = env('JWT_SECRET', 'your-secret-key-change-this-in-production');
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return false;
        }

        [$base64Header, $base64Payload, $base64Signature] = $parts;
        $signature = hash_hmac('sha256', $base64Header.'.'.$base64Payload, $secret, true);
        $expectedSignature = self::base64UrlDecode($base64Signature);

        if (!hash_equals($expectedSignature, $signature)) {
            return false;
        }

        $payload = json_decode(self::base64UrlDecode($base64Payload), true);
        if (!is_array($payload) || !isset($payload['exp']) || $payload['exp'] < time()) {
            return false;
        }

        return $payload;
    }

    private static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/').str_repeat('=', 3 - (3 + strlen($data)) % 4));
    }
}
