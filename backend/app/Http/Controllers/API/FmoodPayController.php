<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FmoodPay;

class FmoodPayController extends Controller
{
    function getBalance(Request $req){
        $userId =  $req->user()->id;
        return FmoodPay::where("user_id",$userId)->first()["balance"];
    }
}
