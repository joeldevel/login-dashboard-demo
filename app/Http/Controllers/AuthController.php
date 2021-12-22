<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
          'username'=>'required|string|unique:users',
          'email'=>'required|email|string|unique:users',
          'password'=>'required|string|confirmed'
        ]);

        $user = User::create([
          'username'=>$fields['username'],
          'email'=>$fields['email'],
          'password'=>bcrypt($fields['password'])
        ]);

        $token = $user->createToken('thetoken')->plainTextToken;

        $response = [
          'user' => $user,
          'token' => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
          'username'=>'required|string',
          'password'=>'required|string'
        ]);

        // check email
        $user = User::where('username', $fields['username'])->first();
        // check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                "message"=> "invalid credentials"
            ], 401);
        }
        // everything ok
        $token = $user->createToken('thetoken')->plainTextToken;

        $response = [
          'user' => $user,
          'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return [
          'message'=>'logged out'
        ];
    }
}
