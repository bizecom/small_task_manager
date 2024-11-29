<?php

use Illuminate\Support\Facades\Route;

Route::get('/version', function () {
  return ['Laravel' => app()->version()];
});

Route::view('/{path?}', 'app')->where('path', '.*');

