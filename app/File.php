<?php

namespace App;

use Faker\Provider\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class File extends Model
{

    public $guarded = [];

}
