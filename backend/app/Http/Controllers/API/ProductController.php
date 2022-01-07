<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\StoreProfile;
use Illuminate\Support\Arr;


class ProductController extends Controller
{
    public function add(Request $req){
        $validator = Validator::make($req->all(),[
            'name'=>'required|max:191',
            'price'=>'required|max:20',
            'weight'=>'required|max:5',
            'stock'=>'required|min:1',
            'imgMain'=>'required|image|max:2560',
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
            $product->reg_code = $req->input('regCode');
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
    public function getAll($userId){
        $products = product::orderBy('id','desc')->where('user_id',$userId)->paginate(3);
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

    public function getNewProducts(){
      $data=[];
       $products = Product::where('hide',0)->orderByDesc("id")->limit(5)->get();
       foreach($products as $item){
        $product = array(
            'id'=>$item->id,'name'=>$item->name,
            'img_main'=>$item->img_main,
            'real_price'=>$item->price,
            'sell_price'=>$this->getSellPrice($item->price,$item->discount_price,$item->discount),
            'is_discount'=>$item->discount,
            'discount_price'=>$item->discount_price,
            'discount_percent'=>$this->countPercent($item->price,$item->discount_price,$item->discount),
            'origin'=>'Padang',
            'rating'=>$this->getRating($item->id),
            'sold'=>$this->soldCount($item->id),
        );
        array_push($data,$product);
    };
       return $data;
    }

    public function getDiscountProducts(){
        $data=[];
         $products = Product::where('hide',0)->where("discount",1)->orderBy("id")->limit(5)->get();
         foreach($products as $item){
          $product = array(
              'id'=>$item->id,'name'=>$item->name,
              'img_main'=>$item->img_main,
              'real_price'=>$item->price,
              'sell_price'=>$this->getSellPrice($item->price,$item->discount_price,$item->discount),
              'is_discount'=>$item->discount,
              'discount_price'=>$item->discount_price,
              'discount_percent'=>$this->countPercent($item->price,$item->discount_price,$item->discount),
              'origin'=>'Padang',
              'rating'=>$this->getRating($item->id),
              'sold'=>$this->soldCount($item->id),
          );
          array_push($data,$product);
      };
         return $data;
      }

      public function getCheapProducts(){
        $data=[];
         $products = Product::where('hide',0)->orderBy("price")->limit(5)->get();
         foreach($products as $item){
          $product = array(
              'id'=>$item->id,'name'=>$item->name,
              'img_main'=>$item->img_main,
              'real_price'=>$item->price,
              'sell_price'=>$this->getSellPrice($item->price,$item->discount_price,$item->discount),
              'is_discount'=>$item->discount,
              'discount_price'=>$item->discount_price,
              'discount_percent'=>$this->countPercent($item->price,$item->discount_price,$item->discount),
              'origin'=>'Padang',
              'rating'=>$this->getRating($item->id),
              'sold'=>$this->soldCount($item->id),
          );
          array_push($data,$product);
      };
         return $data;
      }

    public function findProductByName(Request $req){
        $keyword = $req->input('keyword');
        $products = Product::where('hide',0)->where('name','like','%'.$keyword.'%')->paginate(8);
        $data=[];
        $pagination=[];
        data_fill($pagination,'current_page',$products->currentPage());
        data_fill($pagination,'last_page',$products->lastPage());
        data_fill($pagination,'total',$products->total());

        foreach($products->items() as $item){
            $product = array(
                'id'=>$item->id,'name'=>$item->name,
                'img_main'=>$item->img_main,
                'real_price'=>$item->price,
                'sell_price'=>$this->getSellPrice($item->price,$item->discount_price,$item->discount),
                'is_discount'=>$item->discount,
                'discount_price'=>$item->discount_price,
                'discount_percent'=>$this->countPercent($item->price,$item->discount_price,$item->discount),
                'origin'=>'Padang',
                'rating'=>$this->getRating($item->id),
                'sold'=>$this->soldCount($item->id),
            );
            array_push($data,$product);
        };
        
        return response()->json(["status"=>200,"pagination"=>$pagination,"products"=>$data]);
        // return $keyword;
    }



    public function getRating($product_id){
        $rating = ProductReview::where('product_id',$product_id)->avg('rating');
        return round($rating,1);
    }
    public function reviewsCount($product_id){
        $reviewsCount = ProductReview::where('product_id',$product_id)->count('id');
        return $reviewsCount;
    }
    public function soldCount($product_id){
        $sold =  OrderItem::leftjoin('orders','order_items.order_id','=','orders.id')
        ->where('product_id',$product_id)->where('orders.status','delivered')
        ->orWhere('orders.status','reviewed')->sum('order_items.quantity');
        return $sold;
    }
    public function getSellPrice($price,$disc_price,$is_discount){
        $sell_price = $price;
        $sell_price = (($price > $disc_price) && $is_discount) ? $disc_price : $price;
        return $sell_price;
    }
    public function countPercent($price,$disc_price,$is_discount){
        $percentage = ($price-$disc_price)/$price*100;
        if($percentage < 0 || $is_discount == "0" ) $percentage = 0;
        return round($percentage);
    }
    public function getProductDetail($id){
        $product = Product::find($id);
        $prices = ["sell_price"=>$this->getSellPrice($product->price,$product->discount_price,$product->discount),
        "discount_price"=>$product->discount_price,
        "real_price"=>$product->price,
        "discount_percent"=> $this->countPercent($product->price,$product->discount_price,$product->discount)];
        data_fill($product,'rating',$this->getRating($id));
        data_fill($product,'sold',$this->soldCount($id));
        data_fill($product,'reviews',$this->reviewsCount($id));
        data_fill($product,'prices',$prices);
    
        $store = $this->getStoreProfile($product->user_id); 
        return response()->json([
            'status'=>200,
            'product'=>$product,
            'store'=>$store,
        ]);
    }
    public function getStoreProfile($user_id){
        return StoreProfile::where("user_id",$user_id)->first();
    }
    public static function getProductById($id){
        return Product::where("id",$id)->select("id","name","img_main","price","discount_price","discount")->first();
    }
}
