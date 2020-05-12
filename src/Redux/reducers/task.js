import {taskConstants} from '../constants';

const Tasks = (state = [], action) => {
  switch (action.type) {
    case taskConstants.TASKS:
      return state;
    case taskConstants.ADD:
      return [
        {
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
    case taskConstants.CLEAN:
      return [];
    default:
      return state;
  }
};

export default Tasks;
