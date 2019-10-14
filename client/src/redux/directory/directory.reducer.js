import DIRECTORY_DATA from './directory.data';

const INITIAL_STATE = {
  sections: DIRECTORY_DATA,
}

const directoryReducer = (state=INITIAL_STATE, action) => {
  return state;
}

export default directoryReducer;