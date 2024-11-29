<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if a user can authenticate using valid credentials.
     */
    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'), // Ensure password matches the test input
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'message',
                     'user' => ['id', 'name', 'email'], // Ensure user structure matches response
                     'token',
                 ]);

        $this->assertAuthenticated(); // Verify user is authenticated
    }

    /**
     * Test if a user cannot authenticate with invalid credentials.
     */
    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422)
                 ->assertJson(['message' => 'These credentials do not match our records.']);

        $this->assertGuest(); // Verify no user is authenticated
    }

    /**
     * Test if a user can log out successfully.
     */
    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user); // Authenticate the user using Sanctum

        $response = $this->postJson('/api/logout');

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Logout successful.']);
    }
}
