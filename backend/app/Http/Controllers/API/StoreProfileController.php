<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StoreProfile;

class StoreProfileController extends Controller
{
    public static function getStoreById($id){
        $storeProfile = StoreProfile::where("user_id",$id)->first();
        return $storeProfile;
    }
}
