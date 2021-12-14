<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;


class ProductController extends Controller
{
    public function add(Request $req){
        $validator = Validator::make($req->all(),[
            'name'=>'required|max:191',
            'price'=>'required|max:20',
            'weight'=>'required|max:5',
            'stock'=>'required|min:1',
            'imgMain'=>'required|image|mimes:jpeg,png,jpg|max:2560',
            'mainCategory'=>'required',
        ]);
        if($validator->fails()){
            return response()->json(['status'=>422,'errors'=>$validator->messages()]);
        }
        else{
            $product = new Product;
            $product->user_id = $req->input('userId');
            $product->name = $req->input('name');
            $product->price = $req->input('price');
            $product->weight = $req->input('weight');
            $product->stock = $req->input('stock');
            $product->description = $req->input('description');
            $product->main_category = $req->input('mainCategory');
            $product->sub_category = $req->input('subCategory');
            $product->expired = $req->input('expired');
            $product->durability = $req->input('durability');
            $product->preorder = $req->input('preorder');
            $product->discount = $req->input('discount');
            $product->discount_price = $req->input('discountPrice');
            $product->hide = $req->input('hide');

            if($req->hasFile('imgMain')){
                $file = $req->file('imgMain');
                $saved_path = $file->store('products/'.($req->input('userId')));
                $product->img_main = $saved_path;
            };
            if($req->hasFile('imgTop')){
                $file = $req->file('imgTop');
                $saved_path = $file->store('products/'.($req->input('userId')));
                $product->img_top = $saved_path;
            };
            if($req->hasFile('imgSide')){
                $file = $req->file('imgSide');
                $saved_path = $file->store('products/'.($req->input('userId')));
                $product->img_side = $saved_path;
            };
            if($req->hasFile('imgFront')){
                $file = $req->file('imgFront');
                $saved_path = $file->store('products/'.($req->input('userId')));
                $product->img_front = $saved_path;
            };
            if($req->hasFile('imgOther')){
                $file = $req->file('imgOther');
                $saved_path = $file->store('products/'.($req->input('userId')));
                $product->img_other = $saved_path;
            };
            if($req->hasFile('video')){
                $file = $req->file('video');
                $saved_path = $file->store('products/'.($req->input('userId')));
                $product->video = $saved_path;
            };
            

            if($product->save()){
                return response()->json(['status'=>200,'message'=>"Product Added Successfully"]);
            }
            else{
                return response()->json(['status'=>500,'message'=>"Internal Server Error"]);
            }
        }
        

    }
}
