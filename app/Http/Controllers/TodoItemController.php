<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\TodoItem;

class TodoItemController extends Controller
{
    public function index() {
        $items = TodoItem::all();
        
        return response()->json($items);
    }
    
    public function getItem($id) {
        $item = TodoItem::find($id);
        
        return response()->json($item);
    }
    
    public function postItem(Request $request) {
        $item = TodoItem::create($request->all());
        
        return response()->json($item);
    }
    
    public function deleteItem($id) {
        $item = TodoItem::find($id);
        $item->delete();
        
        return response()->json('deleted');
    }
}
