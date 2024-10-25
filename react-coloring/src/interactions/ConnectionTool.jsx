import { Icon, Button } from 'semantic-ui-react';
import { setTool } from '../javascripts/Paper'; 

const paper = require('paper');
const _ = require('underscore');


var hitOptions = {
  segments: true,
  stroke: true,
  fill: true,
  tolerance: 5,
  match: function(hit) {
    return hit.item.parent && hit.item.parent.name === "flowBox";
  }
};
var hitResult2 ;
const ConnectionTool = () => {
    // define your hitOptions
    // use match to filter out the items you want to interact with
  
    const cT = new paper.Tool({
        path: null,
        startShape: null,
        endShape: null,
        onMouseDrag: function(event)
        {   
          
          if (this.path == null)
          {
          this.path = new paper.Path
            ({
              strokeWidth:10,
              strokeColor: 'black'
            });
          }
    
          // TODO
          this.path.add(event.point)
        },
        onMouseDown:function(event)
        {
          hitResult2 = paper.project.hitTest(event.point,hitOptions);
          if (hitResult2)
          {
            
            this.startShape = new paper.Path.Rectangle
            ({
                center: event.downPoint,
                size: new paper.Size(20, 20),
                fillColor: 'green'
            });
          }
          else 
          {
            this.startShape = new paper.Path.Circle
            ({
               center: event.downPoint, 
               radius: 10,
               fillColor: 'red'
            });
            
          }
        },
        onMouseUp: function(event){
         
         hitResult2 = paper.project.hitTest(event.point,hitOptions);
         if (hitResult2)
         {
          this.endShape = new paper.Path.Rectangle({
            center:event.point,
            size: new paper.Size(20, 20),
            fillColor: 'green'
          });
          }
          else
          {
            this.endShape = new paper.Path.Circle({
              center:event.point,
              radius: 10, 
              fillColor: 'red'
            });
          }
          this.path = null; 

          // TODO
        }
    });

    return (
        <Button icon onClick={() => setTool("circle")}>
            <Icon name='sitemap' />
        </Button>
    );
};

export { ConnectionTool };