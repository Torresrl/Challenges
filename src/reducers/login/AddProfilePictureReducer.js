import { NEW_PROFILE_IMAGE,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_FAILED,
  USER_INFO_FETCH_SUCCESS } from '../../Actions/types';


const INITIAL_STATE = {
  render_profile_pic: false,
  profilePicture: 'content://com.challenges.provider/app_images/Android/data/com.challenges/files/Pictures/image-7fe7afff-c3bf-4791-8599-86554c471778.jpg',
  name: '',
  chosen_picture_uri: '',
  error: ''
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
      return { ...state, profilePicture: action.payload[0], name: action.payload[1] };
    default:
      return state;
  }
};
