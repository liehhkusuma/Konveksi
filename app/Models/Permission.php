<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{

    protected function casts(): array
    {
        return [
            'permission_category_id' => 'integer',
        ];
    }

    protected $fillable = ['permission_category_id', 'title', 'is_active'];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }
    public static function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
