import React from 'react';
import Count from './Count.jsx';
import TypeList from './TypeList.jsx';
import {render} from 'react-dom';
var update = require('react-addons-update');

class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this._taskIdMap = {}; // For easy lookup 
    this.state = {
      todo: [],
      progress: [],
      done: []
    };
  }

  findById(taskId) {
    var state = this.state;
    const findInBucket = function (taskId, bucket) {
      var res;
      state[bucket].some(function(task, index) {
        if (task.id === taskId) {
          res = {bucket: bucket, index: index};
          return true;
        }
      });
      return res;
    };
    var res = findInBucket(taskId, 'todo');
    if (!res) {
      res = findInBucket(taskId, 'progress');
    }
    if (!res) {
      res = findInBucket(taskId, 'done');
    }
    if (res) {
      res.task = this.state[res.bucket][res.index];
    }
    return res;
  }

  add(event) {
    var elem = (event.target || event.srcElement);      
    if (event.keyCode == 13 && elem.value) {
      var task = {id: new Date().getTime(), name: elem.value};
      var newState = update(this.state, {
        todo: {
            $splice: [[0, 0, task]]
        }
      });
      this.setState(newState);
      elem.value = '';
      $('.List').sortable({containment: '.Container'});
      var me = this;
      $( ".List" ).droppable({
        tolerance: "intersect", 
        drop: function(event, ui) {
          var elem = ui.draggable[0] || (event.originalEvent.target || event.originalEvent.srcElement);
          var taskId = Number(elem.getAttribute('id'));
          if (this !== elem.parentNode) {
            var type = this.getAttribute('data-type');
            if (type === 'todo') {
              me.markOpen(taskId);
            } else if (type === 'progress') {
              me.markInProgress(taskId);
            } else if (type === 'done') {
              me.markDone(taskId);
            }
            event.preventDefault();
            return false;
          }          
        }
      });
    }
  }

  markOpen(taskId) {
    var taskInfo = this.findById(taskId);
    if(!taskInfo || taskInfo.bucket === 'todo') return;

    var task = taskInfo.task;
    var newState = update(this.state, {
      todo: {
          $splice: [[0, 0, task]]
      },
      [[taskInfo.bucket]]: {
          $splice: [[taskInfo.index, 1]]
      }
    });
    this.setState(newState);
  }

  markInProgress(taskId) {
    var taskInfo = this.findById(taskId);
    if(!taskInfo || taskInfo.bucket === 'progress') return;

    var task = taskInfo.task;
    var newState = update(this.state, {
      progress: {
          $splice: [[0, 0, task]]
      },
      [[taskInfo.bucket]]: {
          $splice: [[taskInfo.index, 1]]
      }
    });
    this.setState(newState);    
  }

  markDone(taskId) {
    var taskInfo = this.findById(taskId);
    if(!taskInfo || taskInfo.bucket === 'done') return;

    var task = taskInfo.task;
    var newState = update(this.state, {
      done: {
          $splice: [[0, 0, task]]
      },
      [[taskInfo.bucket]]: {
          $splice: [[taskInfo.index, 1]]
      }
    });
    this.setState(newState);   
  }

  reorderTask(taskId, toIndex) {
    var taskInfo = this.findById(taskId);
    if(!taskInfo) return;
    var list = this.state[taskInfo.bucket];
    list.splice(toIndex, 0, list.splice(taskInfo.index, 1)[0]);
    var newState = update(this.state, {
      [[taskInfo.bucket]]: {
          $set: list
      }
    });
    this.setState(newState);   
  }

  render() {
    return (
      <div>
        <div className='Header'>
          <div className='align label'>add project</div>
          <div className='align input'><input type="text" onKeyDown={this.add.bind(this)} /></div>
          <div className='total align'>TOTAL</div> 
          <Count count={this.state.todo.length + this.state.progress.length + this.state.done.length} />
        </div> 
        <div className='Container'>
          <TypeList list={this.state.todo} type='todo' label='To do'/>
          <TypeList list={this.state.progress} type='progress' label='In Progress'/>
          <TypeList list={this.state.done} type='done' label='Done'/>
        </div>
      </div>
    );
  }
}

render(<TodoApp />, document.getElementById('app'));

//export default TodoApp;