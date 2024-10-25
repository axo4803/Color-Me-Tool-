import { Button, Icon } from 'semantic-ui-react';
import { useEffect } from 'react';

let _ = require('underscore');
let paper = require('paper');



const HistoryTracker = ({paperReady, undoStack, setUndoStack, redoStack, setRedoStack})=>{
    useEffect(() => {
        if(paperReady && paper.project){ 
          paper.project.clear();
        }
      }, [paperReady])

    const undo = () => {
        console.log("Undo pressed.");
        if (undoStack.length > 0)
        {
            const Myhistory = undoStack.shift(); 
            Myhistory.inverse(); 
            redoStack.push(Myhistory); 
            setUndoStack([...undoStack]); 
            setRedoStack([Myhistory,...redoStack]); 
        }
    }
    
    const redo = () => {
        console.log("Redo pressed.");
     
        if (redoStack.length > 0)
        {
            const Myhistory = redoStack.shift(); 
            Myhistory.action(); 
            redoStack.push(Myhistory);     
            setUndoStack([Myhistory, ...undoStack]);        
            setRedoStack([...redoStack]); 
        }
        // TODO
    }
    
    return (
        <div>
            <Button icon onClick={undo}>
                <Icon name='undo' />
            </Button>
            <Button icon onClick={redo}>
                <Icon name='redo' />
            </Button>
        </div>
    )
}


export {HistoryTracker};