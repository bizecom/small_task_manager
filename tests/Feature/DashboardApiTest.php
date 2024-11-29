<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_returns_correct_data()
    {
        $user = User::factory()->create();

        // Create 7 tasks, 3 of which are completed
        Task::factory(7)->state(new Sequence(
            ['completed' => true], // 3 completed tasks
            ['completed' => false],
            ['completed' => false],
            ['completed' => true],
            ['completed' => false],
            ['completed' => true],
            ['completed' => false],
        ))->create();

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/dashboard');

        $response->assertStatus(200)
            ->assertJson([
                'total_tasks' => 7,
                'completed_tasks' => 3,
            ])
            ->assertJsonStructure([
                'tasks_grouped_by_due_date' => [
                    '*' => ['due_date', 'task_count'],
                ],
            ]);
    }


    public function test_dashboard_requires_authentication()
    {
        $response = $this->getJson('/api/dashboard');
        $response->assertStatus(401);
    }
}
