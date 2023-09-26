import {combineReducers} from 'redux';
import {applications} from './application/application';

export const NameSpace = {
  APPLICATION: 'APPLICATION',
};

export default combineReducers({
  [NameSpace.APPLICATION]: applications,
});
