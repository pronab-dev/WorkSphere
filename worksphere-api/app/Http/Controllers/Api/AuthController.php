<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (! $token = Auth::guard('api')->attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid email or password.',
            ], 401);
        }

        $user = JWTAuth::user();

        $user->forceFill([
            'last_login' => now(),
        ])->save();

        $user->load('role');

        return response()->json([
            'success' => true,
            'message' => 'Login successful. Redirecting to your dashboard...',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 7200,
            'user' => JWTAuth::user()->load('role'),
        ]);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully.',
        ]);
    }
}
