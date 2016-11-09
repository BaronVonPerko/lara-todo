var todoApp = angular.module('todoApp', [])

.constant('Api', {
    'base': 'http://ng-laravel-chrisperko.c9users.io/api/'
})

.component('todoList', {
   template: '\
        <h1>Todo List</h1>\
        <input type="text" ng-model="list.newItem"/>\
        <button class="btn btn-primary" ng-click="list.add()">Add</button>\
        <div ng-repeat="item in list.items">\
            <button class="btn" ng-click="list.delete(item)">Delete</button>\
            {{item.title}}\
        </div>\
   ',
   controllerAs: 'list',
   controller: function TestCtrl(TodoService) {
       var self = this;
       self.items = [];
       self.newItem = '';

       self.add = function() {
           if(self.newItem === '') return;
           
           TodoService.post(self.newItem).then(function(data) {
              self.newItem = ''; 
              self.items.push(data);
           });
       };
       
       self.delete = function(todoItem) {
           TodoService.delete(todoItem.id).then(function() {
               self.refreshData();
           });
       };
       
       self.refreshData = function() {
           TodoService.get().then(function(data) {
               self.items = data;
           });
       }
       self.refreshData();
   }
})

.service('TodoService', function($http, $q, Api) {
    this.get = function() {
        return $q(function(resolve) {
           $http({
               method: 'GET',
               url: Api.base + 'todo'
           }).then(function success(response) {
               resolve(response.data);
           });
        });
    };
    
    this.post = function(title) {
      return $q(function(resolve) {
          $http({
              method: 'POST',
              url: Api.base + 'todo',
              data: {title: title}
          }).then(function success(response) {
             resolve(response.data); 
          });
      });
    };
    
    this.delete = function(id) {
        return $q(function(resolve) {
           $http({
               method: 'DELETE',
               url: Api.base + 'todo/' + id
           }) .then(function success(response) {
              resolve(); 
           });
        });
    };
})