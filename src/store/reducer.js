import {combineReducers} from 'redux';
import {applications} from './application/application';
import {popups} from './popups/popups';

export const NameSpace = {
  APPLICATION: 'APPLICATION',
  POPUPS: 'POPUPS',
};

export default combineReducers({
  [NameSpace.APPLICATION]: applications,
  [NameSpace.POPUPS]: popups,
});
