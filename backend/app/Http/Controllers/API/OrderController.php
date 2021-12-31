<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\StoreProfileController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\UserController;
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
        $order->product_cost = $req->productCost;
        $order->status = $req->status;
        $order->store_id = $req->storeId;
        $order->user_address = $req->userAddress;
        $order->shipment_service = $req->shipmentService;
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
    public function getOrders(Request $req){
        $user_id = $req->user()->id;
        $order =  Order::leftjoin("order_items","orders.id","=","order_items.order_id")
        ->where("user_id",$user_id)->orderByDesc('orders.id')->get();
        $groupByOrderId = $this->group_order_by("order_id",$order->toArray());
        $store = StoreProfileController::getStoreById(4);
        return $groupByOrderId;

    }
    function group_order_by($key, $data) {
        $result = array();
        foreach($data as $val) {
            if(array_key_exists($key, $val)){
                $product = $result[$val[$key]]["products"][] = ProductController::getProductById($val['product_id']);
                $product["quantity"] = $val['quantity'];
                if(!array_key_exists("store",$result[$val[$key]]))
                    $result[$val[$key]]["store"] = StoreProfileController::getStoreById($val['store_id']);
                    $result[$val[$key]]["detail"] = ["order_id"=>$val['order_id'],"user_id"=>$val['user_id'],"total_cost"=>$val['total_cost'],
                    "shipment_cost"=>$val['shipment_cost'],"shipment_service"=>$val['shipment_service'],"shipment_code"=>$val['shipment_code'],
                    "product_cost"=>$val['product_cost'],"status"=>$val['status'],"required_date"=>$val['required_date'],
                    "shipped_date"=>$val['shipped_date'],"created_at"=>$val['updated_at'],"updated_at"=>$val['updated_at'],
        ];
            }else{
                $product = $result[""]["products"][] = ProductController::getProductById($val['product_id']);
                $product["quantity"] = $val['quantity'];
            }
        }
        return $result;
    }
    function getStoreOrders(Request $req,$status){
        $store_id = $req->user()->id;
        $orderWpaginate =  Order::leftjoin("order_items","orders.id","=","order_items.order_id")
        ->where("store_id",$store_id)->where("status",$status)->paginate(13)->toArray();
        $order = $orderWpaginate['data'];
        $groupByOrderId = $this->group_order_by_2("order_id",$order);
        $orderWpaginate['data'] = $groupByOrderId; 
        return $orderWpaginate;
    }

    function group_order_by_2($key, $data) {
        $result = array();
        foreach($data as $val) {
            if(array_key_exists($key, $val)){
                $product = $result[$val[$key]]["products"][] = ProductController::getProductById($val['product_id']);
                $product["quantity"] = $val['quantity'];
                if(!array_key_exists("user",$result[$val[$key]]))
                    $result[$val[$key]]["user"] = UserController::getUserById($val['user_id']);
                    $result[$val[$key]]["detail"] = ["order_id"=>$val['order_id'],"user_id"=>$val['user_id'],"total_cost"=>$val['total_cost'],
                    "shipment_cost"=>$val['shipment_cost'],"shipment_service"=>$val['shipment_service'],"shipment_code"=>$val['shipment_code'],
                    "user_address"=>$val['user_address'],"product_cost"=>$val['product_cost'],"status"=>$val['status'],
                    "required_date"=>$val['required_date'],
                    "shipped_date"=>$val['shipped_date'],"created_at"=>$val['updated_at'],"updated_at"=>$val['updated_at'],
        ];
            }else{
                $product = $result[""]["products"][] = ProductController::getProductById($val['product_id']);
                $product["quantity"] = $val['quantity'];
            }
        }
        return $result;
    }
    public function processOrder($orderId){
        $order = Order::find($orderId);
        $order->status = "onprocess";
        if($order->save()){
            return response()->json(["status"=>200,"message"=>"success"]);
        }else{
            return response()->json(["status"=>500,"message"=>"failed"]);
        }
    }
    public function sendOrder($orderId,$shipmentCode){
        $order = Order::find($orderId);
        $order->status = "ondelivery";
        $order->shipment_code = $shipmentCode;
        if($order->save()){
            return response()->json(["status"=>200,"message"=>"success"]);
        }else{
            return response()->json(["status"=>500,"message"=>"failed"]);
        }
    }
    public function deliveredOrder($orderId){
        $order = Order::find($orderId);
        $order->status = "delivered";
        if($order->save()){
            return response()->json(["status"=>200,"message"=>"success"]);
        }else{
            return response()->json(["status"=>500,"message"=>"failed"]);
        }
    }
}
