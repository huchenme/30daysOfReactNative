import Realm from 'realm';

export class Todo extends Realm.Object {}
Todo.schema = {
  name: 'Todo',
  properties: {
    completed: {type: 'bool', default: false},
    text: 'string',
  },
};

export class TodoList extends Realm.Object {}
TodoList.schema = {
  name: 'TodoList',
  properties: {
    title: 'string',
    theme: 'string',
    list: {type: 'list', objectType: 'Todo'},
  },
};
