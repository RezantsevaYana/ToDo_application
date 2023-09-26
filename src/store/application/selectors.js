import {NameSpace} from '../reducer';

export const getProjects = (state) => state[NameSpace.APPLICATION].projects;
export const getTasks = (state) => state[NameSpace.APPLICATION].tasks;
