<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiKeyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $expectedKey = 'day8-demo-key';

        if ($request->header('X-API-Key') !== $expectedKey) {
            return response()->json([
                'message' => 'Unauthorized: valid X-API-Key header is required.',
            ], 403);
        }

        return $next($request);
    }
}
