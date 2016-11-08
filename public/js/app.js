var todoApp = angular.module('todoApp', [])

.constant('Api', {
    'base': 'http://ng-laravel-chrisperko.c9users.io/api/'
})

.component('todoList', {
   template: '\
        <h1>Todo List</h1>\
        <input type="text" ng-model="list.newItem"/>\
        <button class="btn btn-primary" ng-click="list.add()">Add</button>\
        <p ng-repeat="item in list.items">{{item.title}}</p>\
   ',
   controllerAs: 'list',
   controller: function TestCtrl(TodoService) {
       var self = this;
       self.items = [];
       self.newItem = '';

       self.add = function() {
           TodoService.post(self.newItem).then(function(data) {
              self.newItem = ''; 
              self.items.push(data);
           });
       };
       
       TodoService.get().then(function(data) {
           self.items = data;
       });
   }
})

.service('TodoService', function($http, $q, Api) {
    this.get = function() {
        return $q(function(response) {
           $http({
               method: 'GET',
               url: Api.base + 'todo'
           }).then(function success(apiResponse) {
               response(apiResponse.data);
           });
        });
    };
    
    this.post = function(title) {
      return $q(function(response) {
          $http({
              method: 'POST',
              url: Api.base + 'todo',
              data: {title: title}
          }).then(function success(apiResponse) {
             response(apiResponse.data); 
          });
      });
    };
})