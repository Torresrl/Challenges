import { NEW_PROFILE_IMAGE,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_FAILED } from '../../Actions/types';


const INITIAL_STATE = {
  render_profile_pic: false,
  profile_picture: '',
  chosen_picture_uri: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_PROFILE_IMAGE:
      return { ...state, render_profile_pic: true, chosen_picture_uri: action.payload };
    case UPLOAD_PROFILE_PICTURE:
      return { ...state, ...INITIAL_STATE, profile_picture: action.payload };
    case UPLOAD_PROFILE_PICTURE_FAILED:
        return { ...state, error: 'Failed to upload profile picture' };
    default:
      return state;
  }
};
