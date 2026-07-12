<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    /**
     * Display all menus.
     */
    public function index()
    {
        $menus = Menu::with('parent')
            ->orderByRaw('COALESCE(parent_id, id)')
            ->orderBy('parent_id')
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'menus' => $menus,
        ]);
    }

    /**
     * Store a new menu.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'parent_id'      => ['nullable', 'exists:menus,id'],
            'title'          => ['required', 'string', 'max:100'],
            'route'          => ['nullable', 'string', 'max:255'],
            'icon'           => ['nullable', 'string', 'max:100'],
            'permission_key' => ['nullable', 'string', 'max:100'],
            'sort_order'     => ['nullable', 'integer', 'min:0'],
            'status'         => ['nullable', 'boolean'],
        ]);

        $menu = Menu::create([
            'parent_id'      => $validated['parent_id'] ?? null,
            'title'          => $validated['title'],
            'route'          => $validated['route'] ?? null,
            'icon'           => $validated['icon'] ?? null,
            'permission_key' => $validated['permission_key'] ?? null,
            'sort_order'     => $validated['sort_order'] ?? 0,
            'status'         => $validated['status'] ?? true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Menu created successfully.',
            'menu'    => $menu,
        ], 201);
    }

    /**
     * Update a menu.
     */
    public function update(Request $request, Menu $menu)
    {
        //
    }

    /**
     * Delete a menu.
     */
    public function destroy(Menu $menu)
    {
        //
    }

    /**
     * Get Sidebar Menus
     */
    public function sidebar()
    {
        $user = auth('api')->user();

        $menus = $user->role
            ->menus()
            ->whereNull('parent_id')
            ->where('status', true)
            ->with([
                'children' => function ($query) use ($user) {
                    $query->where('status', true)
                        ->whereIn('id', $user->role->menus()->pluck('menus.id'))
                        ->orderBy('sort_order');
                }
            ])
            ->orderBy('sort_order')
            ->get()
            ->makeHidden('pivot');

        return response()->json([
            'success' => true,
            'menus' => $menus,
        ]);
    }
}
