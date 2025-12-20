<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionRole extends Model
{
    protected function casts(): array
    {
        return [
            'permission_id' => 'integer',
            'role_id' => 'integer',
        ];
    }
    protected $fillable = ['permission_id', 'role_id'];
}
