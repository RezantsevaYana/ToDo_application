import {combineReducers} from 'redux';
import {applications} from './application/application';
import {popups} from './popups/popups';
import {filters} from './filters/filters';

export const NameSpace = {
  APPLICATION: 'APPLICATION',
  POPUPS: 'POPUPS',
  FILTERS: 'FILTERS',
};

export default combineReducers({
  [NameSpace.APPLICATION]: applications,
  [NameSpace.POPUPS]: popups,
  [NameSpace.FILTERS]: filters,
});

