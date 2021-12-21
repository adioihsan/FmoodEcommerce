<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Cart;
class CartController extends Controller
{
    public function addCart(Request $req){
        $validator = Validator::make($req->all(),[
            'userId'=>'required',
            'productId'=>'required',
            'quantity'=>'required|min:1',
            'note'=>'max:254',
        ]);
        if($validator->fails()){
            return response()->json(['status'=>422,'errors'=>$validator->messages()]);
        }else{
            $cart = new Cart;
            $cart->user_id = $req->input('userId');
            $cart->product_id = $req->input('productId');
            $cart->quantity = $req->input('quantity');
            $cart->note = $req->input('note');
            
            // $cart = Cart::updateOrCreate(['user_id'=>$user_id,'produc_id'=>$product_id],
            // ['quantity'=>$quantity]
            
            $existCard = Cart::where('user_id',
            $req->input('userId'))->where('product_id',$req->input('productId'))->first();
            if($existCard){
                $isUpdate = $this->updateCart($existCard->id,$req->input('quantity'),$req->input('note'));
                if($isUpdate){
                    return response()->json(['status'=>200,'message'=>"Cart Added Successfully"]);
                }
                else{
                    return response()->json(['status'=>500,'message'=>"Internal Server Error"]);
                }
            }
            else if($cart->save()){
                return response()->json(['status'=>200,'message'=>"Cart Added Successfully"]);
            }
            else{
                return response()->json(['status'=>500,'message'=>"Internal Server Error"]);
            }
        }

    }

    public function updateCart($cart_id,$quantity,$note){
        $cart = Cart::find($cart_id);
        $cart->quantity = $cart->quantity + $quantity;
        $cart->note = $note;
        return($cart->save());
    }
}
