<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::get('category',[CategoryController::class,'getCategories']);
Route::get('subcategory/{parent_id}',[CategoryController::class,'getSubCategories']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum','hasStore')->group(function(){
  
});

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/isLogin',function(){
        return response()->json(['status'=>200,'message'=>"You are Logged in"]);
    });
    Route::post('logout',[AuthController::class,'logout']);
});