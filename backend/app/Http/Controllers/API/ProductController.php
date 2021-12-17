<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\ProductRating;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Arr;


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
    public function getAll(Request $req){
        $products = product::orderBy('id','desc')->paginate(3);
        return response()->json([
            'status'=>200,
            'products'=>$products
        ]);
    }
    public function getVisible(){
        $products = DB::table('products')->where('hide',0)->paginate(3);
        return response()->json([
            'status'=>200,
            'products'=>$products
        ]);
    }

    public function test(Request $req){
        // $products = Product::leftjoin('product_ratings','products.id','=','product_ratings.product_id')
        // ->leftjoin('order_items','products.id','=','order_items.product_id')
        // ->leftjoin('orders','order_items.order_id','=','orders.id')
        // ->where('hide',0)->select('products.*',DB::raw('avg(product_ratings.rating) as rating'))->groupBy('products.id')->paginate(3);

        $products = Product::where('hide',0)->paginate(8);
        $data=[];
        $pagination=[];
        data_fill($pagination,'current_page',$products->currentPage());
        data_fill($pagination,'last_page',$products->lastPage());
        data_fill($pagination,'total',$products->total());

        foreach($products->items() as $item){
            $product = array(
                'id'=>$item->id,'name'=>$item->name,
                'img_main'=>$item->img_main,
                'price'=>$item->price,'discount_price'=>$item->discount_price,
                'discount_percent'=>$this->countPercent($item->price,$item->discount_price),
                'origin'=>'Padang',
                'rating'=>$this->getRating($item->id),
                'sold'=>$this->soldCount($item->id),
            );
            array_push($data,$product);
        };
        
        return response()->json(["status"=>200,"pagination"=>$pagination,"products"=>$data]);
    }
    public function getRating($product_id){
        $rating = ProductRating::where('product_id',$product_id)->avg('rating');
        return round($rating,1);
    }
    public function soldCount($product_id){
        $sold =  OrderItem::leftjoin('orders','order_items.order_id','=','orders.id')
        ->where('product_id','=',$product_id)->where('orders.status','delivered')->sum('order_items.quantity');
        return $sold;
    }
    public function countPercent($price,$disc_price){
        $percentage = ($price-$disc_price)/$price*100;
        return round($percentage);
    }
}
