import {taskConstants} from '../constants';

export const addTask = (data) => {
  return {
    type: taskConstants.ADD,
    data,
  };
};
export const editTask = (data) => {
  return {
    type: taskConstants.EDIT,
    data,
  };
};
export const deleteTask = (data) => {
  return {
    type: taskConstants.DELETE,
    data,
  };
};
