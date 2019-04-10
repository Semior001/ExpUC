<?php

namespace App;

use Faker\Provider\Image;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class File extends Model
{

    public $guarded = [];

    // todo make real thumb
    public function getThumb(){
//        Image::make($this->)
    }

}
