<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_tasks_can_be_listed_with_pagination()
    {
        $user = User::factory()->create();

        Task::factory(25)->create();

        $response = $this->actingAs($user, 'sanctum')
                        ->getJson('/api/tasks?per_page=10&page=2');

        $response->assertStatus(200)
                ->assertJsonFragment(['current_page' => 2])
                ->assertJsonCount(10, 'data');
    }


    public function test_task_can_be_created()
    {
        $user = User::factory()->create();

        $payload = [
            'title' => 'New Task',
            'description' => 'This is a test task.',
            'due_date' => now()->addDay()->format('Y-m-d'),
            'completed' => false,
        ];

        $this->actingAs($user, 'sanctum')
            ->postJson('/api/tasks', $payload)
            ->assertStatus(201)
            ->assertJsonFragment(['title' => 'New Task']);
    }

    public function test_task_can_be_updated()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->putJson("/api/tasks/{$task->id}", [
                'title' => 'Updated Title',
                'completed' => false,
            ])
            ->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated Title']);
    }

    public function test_task_can_be_deleted()
    {
        $user = User::factory()->create();
        $task = Task::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/tasks/{$task->id}")
            ->assertStatus(204);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_unauthorized_access_is_blocked()
    {
        $this->getJson('/api/tasks')->assertStatus(401);
    }
}
