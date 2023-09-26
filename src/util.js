import { v1 } from 'uuid';

export const initialProjects = [
  { id: v1(), title: 'Проект1' },
  { id: v1(), title: 'Проект2' },
  { id: v1(), title: 'Проект3' },
  { id: v1(), title: 'Проект4' },
  { id: v1(), title: 'Проект5' },
]

export const updateProjectsInLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
}


export const projects = JSON.parse(localStorage.getItem('projects')) ? JSON.parse(localStorage.getItem('projects')) : []

