<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('name');
            $table->double('price');
            $table->integer('weight');
            $table->integer('stock');
            $table->longText('description');
            $table->string('img_main');
            $table->string('img_top');
            $table->string('img_side');
            $table->string('img_front');
            $table->string('img_other');  
            $table->string('video'); 
            $table->string('main_category',30);
            $table->text('sub_category',200);
            $table->date('expired');
            $table->integer('durability');
            $table->boolean('preorder');
            $table->boolean('discount');
            $table->double('discount_price');
            $table->boolean('hide');
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
        Schema::dropIfExists('products');
    }
}
