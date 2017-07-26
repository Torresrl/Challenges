import{NEW_PROFILE_IMAGE} from '../../Actions/types';


const INITIAL_STATE = {
  render_profile_pic : false
};

export default ( state = INITIAL_STATE, action ) => {
  switch(action.type){
    case NEW_PROFILE_IMAGE:
      return {...state, render_profile_pic : true}
    default:
        return state;
  }
}
