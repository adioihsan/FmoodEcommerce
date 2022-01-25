<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("user_id");
            $table->bigInteger("store_id");
            $table->double("total_cost");
            $table->double("shipment_cost");
            $table->double("product_cost");
            $table->integer("payment_id");
            $table->string("shipment_service",30);
            $table->string("shipment_code",100);
            $table->text("user_address");
            $table->string("status",10);
            $table->date("required_date");
            $table->date("shipped_date");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
