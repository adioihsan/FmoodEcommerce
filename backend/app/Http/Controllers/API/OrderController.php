<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function createOrder(Request $req){
        $order = new Order;
        $order->user_id = $req->user()->id;
        $order->total_cost = $req->totalCost;
        $order->shipment_cost = $req->shipmentCost;
        $order->status = $req->status;
        $order->payment_id = 0;
        if($order->save()){
            $order_id = $order->id;
            foreach($req->products as $product){
                $order_item = new OrderItem;
                $order_item->order_id = $order_id;
                $order_item->product_id = $product['productId'];
                $order_item->quantity = $product['quantity'];
                $order_item->save();
            }
            return response()->json(["status"=>200,"order_id"=>$order_id,"message"=>"Order success"]);
        }
        else{
            return response()->json(["status"=>500,"order_id"=>"0","message"=>"internal server error"]);
        }
    }
}
