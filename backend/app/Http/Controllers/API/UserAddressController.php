<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserAddress;
use Illuminate\Support\Facades\Auth;

class UserAddressController extends Controller
{
    function getUserAddress(Request $req){
    $userId =  $req->user()->id;
    return UserAddress::where("user_id",$userId)->get();
    }
}
