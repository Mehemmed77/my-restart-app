import { useState } from "react"

function Task(props){
    const [taskName,setTaskName] = useState(props.task.name);

    function handleClick(){
        props.deleteTask(props.task.key);
    }

    function handleInput(e){
        props.completeTask(props.task,e);
    }

    return(
        <li className="todo stack-small">

            <div className="c-cb">
            <input id="todo-0" type="checkbox" defaultChecked={props.task.completed} onInput={handleInput}/>
            <input className="todo-input" htmlFor="todo-0" disabled defaultValue={props.task.name}/>
            </div>

            <div className="btn-group">
            <button type="button" className="btn">
                Edit <span className="visually-hidden">{props.task.name}</span>
            </button>
            
            <button type="button" className="btn btn__danger" onClick={handleClick}>
                Delete <span className="visually-hidden"></span>
            </button>
            
            </div>
        </li>
    )
}

export default Task
