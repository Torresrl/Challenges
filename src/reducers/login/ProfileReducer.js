import { NEW_PROFILE_IMAGE,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_FAILED,
  USER_INFO_FETCH_SUCCESS,
  NEW_NAME_CHANGE,
  USER_UPDATE,
  USER_UPLOAD_UPDATE_SUCCESS } from '../../Actions/types';


const INITIAL_STATE = {
  render_profile_pic: false,
  profilePicture: 'content://com.challenges.provider/app_images/Android/data/com.challenges/files/Pictures/image-7fe7afff-c3bf-4791-8599-86554c471778.jpg',
  user: {},
  chosen_picture_uri: '',
  error: '',
  displayName: '',
  email: '',
  phoneNumber: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_PROFILE_IMAGE:
      return { ...state, render_profile_pic: true, chosen_picture_uri: action.payload };
    case UPLOAD_PROFILE_PICTURE:
      return { ...state, ...INITIAL_STATE, profilePicture: action.payload };
    case UPLOAD_PROFILE_PICTURE_FAILED:
      return { ...state, error: 'Failed to upload profile picture' };
    case USER_INFO_FETCH_SUCCESS:
      return { ...state, user: action.payload };
    case NEW_NAME_CHANGE:
        return { ...state, name: action.payload };
    case USER_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
    case USER_UPLOAD_UPDATE_SUCCESS:
        return { ...state, render_profile_pic: true };
    default:
      return state;
  }
};
