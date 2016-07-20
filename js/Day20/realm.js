import Realm from 'realm';
import {Todo, TodoList} from '../schema';
export default new Realm({
  path: 'day20.realm',
  schema: [Todo, TodoList]
});
