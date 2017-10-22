import {
  RE_AUTHENTICATION_FAIL,
  RE_AUTHENTICATION_SUCCESS,
  TRY_LOGIN,
  EMAIL_MISSING,
  EMAIL_CHANGE
} from '../../Actions';

const INITIAL_STATE = {
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RE_AUTHENTICATION_FAIL:
      return { ...state, error: 'Something went wrong', load: false };
    case RE_AUTHENTICATION_SUCCESS:
        return { ...state, user: action.payload, load: false, password: '' };
    case TRY_LOGIN:
        return { ...state, load: true };
    case EMAIL_MISSING:
      return { ...state, error: 'Invalid email' };
    case EMAIL_CHANGE:
  default:
    return state;
  }
};
