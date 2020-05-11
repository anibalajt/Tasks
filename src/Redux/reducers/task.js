import {taskConstants} from '../constants';
let DATA = [
  {
    id: 1,
    task: 'task 1',
    detail: 'First Item',
  },
  {
    id: 2,
    task: 'task 2',
    detail: 'Second Item',
  },
  {
    id: 3,
    task: 'task 3',
    detail: 'Third Item',
  },
];
let id = 3;
const Tasks = (state = DATA, action) => {
  switch (action.type) {
    case taskConstants.TASKS:
      return state;
    case taskConstants.ADD:
      return [
        {
          id: ++id,
          ...action.data,
        },
        ...state,
      ];
    case taskConstants.EDIT:
      return state.map((task) =>
        task.id === action.data.id ? {...task, ...action.data} : task,
      );
    case taskConstants.DELETE:
      return state.filter((task) => {
        return task.id === action.data.id ? null : task;
      });
    default:
      return state;
  }
};

export default Tasks;
