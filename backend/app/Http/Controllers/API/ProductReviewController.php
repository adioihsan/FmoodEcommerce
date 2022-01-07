<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\OrderController;
use Illuminate\Http\Request;
use App\Models\ProductReview;
class ProductReviewController extends Controller
{
    public function addReview(Request $req){
        $productReview = new ProductReview;
        $productReview->product_id = $req->productId;
        $productReview->user_id = $req->user()->id;
        $productReview->order_id = $req->orderId;
        $productReview->rating = $req->rating;
        $productReview->review = $req->review;
        
        if($productReview->save() && OrderController::reviewedOrder($req->orderId)){
            return response()->json(["status"=>200,"message"=>"success"]);
        }
        else{
            return response()->json(["status"=>500,"message"=>"failed"]);
        }
    }
}
