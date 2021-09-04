/* eslint-disable no-new */

import './style-src.css';
import Sortable from 'sortablejs';
import {
  showList, updateLocalStorage, addTask, editTask, updateStatus,
  getLocalStorage, updateAfterDrag, removeCompletedTasks, removeTask,
} from './task.js';

let tasks = getLocalStorage();

showList(tasks);

const listDiv = document.getElementById('list');
const clearAllButton = document.getElementById('clear-list');
listDiv.addEventListener('click', (event) => {
  if (event.target !== event.currentTarget) {
    if (event.target.className === 'check') {
updateAndShowTasks(tasks, parseInt(event.target.parentElement.parentElement.id, 10), true);
    }
    if (event.target.className === 'fas fa-check') {
      updateAndShowTasks(tasks, parseInt(event.target.parentElement.parentElement.id, 10), false);
    }
    if (event.target.className === 'fas fa-trash') {
      tasks = getLocalStorage();
      tasks = removeTask(tasks, parseInt(event.target.parentElement.id, 10));
    }
    if (event.target.classList.contains('description')) {
      tasks = getLocalStorage();
      editTask(tasks, event.target);
    }
  }
  event.stopPropagation();
});

clearAllButton.addEventListener('click', () => {
  tasks = removeCompletedTasks(tasks);
});

const addTaskButton = document.getElementById('add');
addTaskButton.addEventListener('click', () => {
  addTask(tasks);
  updateLocalStorage(tasks);
  showList(tasks);
});

new Sortable(listDiv, {
  animation: 100,
  ghostClass: 'dragging',
});

listDiv.addEventListener('dragend', (event) => {
  updateAfterDrag(listDiv);
  event.stopPropagation();
});
