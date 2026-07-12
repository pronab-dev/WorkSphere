<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'title',
        'route',
        'icon',
        'permission_key',
        'sort_order',
        'status',
    ];

    /**
     * Parent Menu
     */
    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }

    /**
     * Child Menus
     */
    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id')
            ->where('status', true)
            ->orderBy('sort_order');
    }

    /**
     * Roles assigned to this menu
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_menu');
    }
}