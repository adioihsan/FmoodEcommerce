<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UserAddressController;
use App\Http\Controllers\API\FmoodPayController;
use App\Http\Controllers\API\RajaOngkir;
use App\Http\Controllers\API\OrderController;
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
Route::get('get-products/all/{user_id}',[ProductController::class,'getAll']);
Route::get('get-products/visible',[ProductController::class,'getVisible']);
Route::get('find-product-by-name',[ProductController::class,'findProductByName']);
Route::get('test',[ProductController::class,'getStoreProfile']);
Route::get('get-product-detail/{id}',[ProductController::class,'getProductDetail']);
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

    // Categories, add to seperate auth group later !
    Route::get('category',[CategoryController::class,'getCategories']);
    Route::get('subcategory/{parent_id}',[CategoryController::class,'getSubCategories']);

    // Products add to seperate auth group later !
    Route::post('add-product',[ProductController::class,'add']);

    //add to cart only for login user
    Route::post('add-cart',[CartController::class,'addCart']);

    //get user address
    Route::get('get-user-address',[UserAddressController::class,'getUserAddress']);

    //get shipment cost
    Route::post('get-shipment-cost',[RajaOngkir::class,'getShipmentCost']);

    //get user fmoodPay balance
    Route::get('get-fmood-pay-balance',[FmoodPayController::class,'getBalance']);

    //create order
    Route::post('create-order',[OrderController::class,'createOrder']);

    //get orders
    Route::get('get-orders',[OrderController::class,'getOrders']);

    //create userAddress
    Route::post('create-user-address',[UserAddressController::class,'CreateUserAddress']);

    //get user cart
    Route::get('get-cart',[CartController::class,'getCart']);

    //get user adderss
    Route::get('get-user-address',[UserAddressController::class,'getUserAddress']);

    //get store orders
    Route::get('get-store-orders/{status}',[OrderController::class,'getStoreOrders']);

    //process order
    Route::get('process-order/{orderId}',[OrderController::class,'processOrder']);
});

