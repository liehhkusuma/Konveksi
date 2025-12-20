<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    use HasFactory;

    protected $fillable  = [
        'slug',
        'name',
        'data'
    ];

    public static function getValueAttribute($slug, $default = null)
    {
        $config = Configuration::where('slug', $slug)->first();
        $value = $config ? $config->data : $default;

        // Convert numeric strings to integers
        if (is_numeric($value)) {
            return (int) $value;
        }
        return $value;
    }
}
