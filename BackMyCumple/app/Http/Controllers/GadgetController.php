<?php

namespace App\Http\Controllers;

use App\Models\GadgetInteraction;
use Illuminate\Http\Request;

class GadgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = GadgetInteraction::latest();

        if ($request->has('type')) {
            $query->where('gadget_type', $request->type);
        }

        return $query->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_name' => 'required|string|max:255',
            'gadget_type' => 'required|string|in:memory_bread,magic_pocket,anywhere_door,quiz,dorayaki_game,guestbook',
            'content' => 'required|string',
        ]);

        $interaction = GadgetInteraction::create($validated);

        return response()->json($interaction, 201);
    }
}
