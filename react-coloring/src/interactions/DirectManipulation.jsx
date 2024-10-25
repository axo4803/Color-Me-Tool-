import { Path } from 'paper/dist/paper-core';
import { useEffect } from 'react';

let _ = require('underscore');
let paper = require('paper');

const createDMCircle = ()=>{
    const t = new paper.Path.Circle({
    
      center: paper.view.center,
      radius:150,
      strokeColor: 'red', 
      fillColor: 'red',
      draggable: false,

      onMouseDrag: function(event)
      {
        if (this.draggable)
        {
            this.position = this.position.add(event.delta);
        }
      }, 

      onMouseDown: function(event)
      {
        //TODO
        this.draggable = true;
        if (this.draggable)
        {
          this.fillColor = 'blue';
          this.strokeColor = 'blue';
        }
      },
      onMouseUp: function(event)
      {
       
        {
          this.fillColor = 'red';
          this.strokeColor = 'red';
        }
      }
     
    });
    t.position = paper.view.center;
}

const DirectManipulation = (paperReady) => {
  useEffect(() => {
    if(paperReady && paper.project){ 
      paper.project.clear();
      createDMCircle();
    }
  }, [paperReady])
}

export {DirectManipulation};