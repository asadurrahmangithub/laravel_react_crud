<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia; // We are going to use this class to render React components

Route::get('/', function () {
    return Inertia::render('Master'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});


Route::get('/students', function () {
    return Inertia::render('Master');
});

Route::get('/student/create', function () {
    return Inertia::render('Master');
});

Route::get('/product/create', function () {
    return Inertia::render('Master');
});

Route::get('/product/manage', function () {
    return Inertia::render('Master');
});
