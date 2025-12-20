<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionCategory extends Model
{
    protected $fillable = ['title', 'is_active'];

    public function permission()
    {
        return $this->hasMany(Permission::class);
    }
    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
