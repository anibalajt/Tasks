import {userConstants} from '../constants';

const User = (state = {}, action) => {
  switch (action.type) {
    case userConstants.ADD:
      return {
        ...action.data,
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default User;
