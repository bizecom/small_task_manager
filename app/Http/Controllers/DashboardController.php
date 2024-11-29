<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalTasks = Task::count();
        $completedTasks = Task::where('completed', true)->count();
        $tasksGroupedByDueDate = Task::select('due_date')
            ->selectRaw('count(*) as task_count')
            ->groupBy('due_date')
            ->get();

        return response()->json([
            'total_tasks' => $totalTasks,
            'completed_tasks' => $completedTasks,
            'tasks_grouped_by_due_date' => $tasksGroupedByDueDate,
        ]);
    }
}
