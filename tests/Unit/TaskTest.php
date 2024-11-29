<?php

namespace Tests\Unit;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_task_can_be_created()
    {
        $task = Task::factory()->create([
            'title' => 'Sample Task',
            'completed' => false,
        ]);

        $this->assertDatabaseHas('tasks', ['title' => 'Sample Task']);
    }

    public function test_task_can_be_updated()
    {
        $task = Task::factory()->create();

        $task->update(['title' => 'Updated Title']);
        $this->assertDatabaseHas('tasks', ['title' => 'Updated Title']);
    }

    public function test_task_can_be_deleted()
    {
        $task = Task::factory()->create();
        $taskId = $task->id;

        $task->delete();
        $this->assertDatabaseMissing('tasks', ['id' => $taskId]);
    }
}
