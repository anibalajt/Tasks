import {taskConstants, userConstants} from '../constants';

export const addUser = (data) => {
  return {
    type: userConstants.ADD,
    data,
  };
};
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
export const cleanTask = (data) => {
  return {
    type: taskConstants.CLEAN,
    data,
  };
};
export const logout = (data) => {
  return {
    type: userConstants.LOGOUT,
    data,
  };
};
