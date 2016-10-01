import React from 'react';
import Count from './Count.jsx';
import TypeList from './TypeList.jsx';
import {render} from 'react-dom';
var update = require('react-addons-update');

class TodoApp extends React.Component {

  constructor(props) {
    super(props);
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

  enableDragAndDrop() {
    var me = this,
      elem,
      taskId;

    $('.List').sortable({containment: '.Container'});      
    $( ".List" ).droppable({
      tolerance: "intersect", 
      drop: function(event, ui) {
        elem = ui.draggable[0] || (event.originalEvent.target || event.originalEvent.srcElement);
        taskId = Number(elem.getAttribute('id'));
        if (taskId && this !== elem.parentNode) { // Cross list
          me.movetask(taskId, this.getAttribute('data-type'));
          event.preventDefault();
          return false;
        }          
      }
    });
  }

  add(event) {
    var elem = (event.target || event.srcElement),
      task,
      newState;      
    if (event.keyCode == 13 && elem.value) {
      task = {id: new Date().getTime(), name: elem.value};
      newState = update(this.state, {
        todo: {
            $splice: [[0, 0, task]]
        }
      });
      this.setState(newState);
      elem.value = '';    
      this.enableDragAndDrop();  
    }
  }

  moveTask(taskId, toBucket) {
    var taskInfo = this.findById(taskId),
      task,
      newState;
    
    if(!taskInfo || taskInfo.bucket === toBucket) return; // Same bucket

    task = taskInfo.task;
    newState = update(this.state, {
      [[toBucket]]: {
          $splice: [[0, 0, task]]
      },
      [[taskInfo.bucket]]: {
          $splice: [[taskInfo.index, 1]]
      }
    });
    this.setState(newState);  
  }

  reorderTask(taskId, toIndex) {
    var taskInfo = this.findById(taskId),
      list,
      newState;
    
    if(!taskInfo) return;
    
    list = this.state[taskInfo.bucket];
    list.splice(toIndex, 0, list.splice(taskInfo.index, 1)[0]);
    newState = update(this.state, {
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
