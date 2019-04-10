<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OfficeHours extends Model
{
    public $table = 'office_hours';

    protected $guarded = [];

    public function teacher(){
        return $this->belongsTo(Teacher::class);
    }

}
