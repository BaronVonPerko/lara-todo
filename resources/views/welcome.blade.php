@extends('layouts.app')

@section('content')
<div class="container" ng-app="todoApp">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Welcome</div>

                <div class="panel-body">
                    <todo-list></todo-list>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
