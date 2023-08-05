import { useState } from 'react';
import { v4 } from 'uuid'
import Task from './Tasks';

function App() {
	const [tasks,setTasks] = useState([]);
	const [activeTasks,setActiveTasks] = useState([]);
	const [completedTasks,setCompletedTasks] = useState([]);
  	const [value,setValue] = useState("");
	const [filter,setFilter] = useState("all");

	let a = {
		"all":tasks,
		"active":activeTasks,
		"completed":completedTasks
	}

	const handleInput = (input) => {
		setValue(input.target.value);
	};

	const refreshTasks = () => {
		setActiveTasks(tasks.filter(e => e.completed===false));
		setCompletedTasks(tasks.filter(e => e.completed===true));
	};
	
	const deleteTask = (key) => {
		setTasks(tasks.filter(e => e.key!==key));
		refreshTasks();
	};

	function showActive(){
		setFilter("active");
	};
	
	function showCompleted(){
		setFilter("completed");
	};

	function showAll(){
		setFilter("all");
	}

	const completeTask = (task,e) => {
		let key = task.key;
		let newTasks = tasks;
		let index = tasks.findIndex(e => e.key===key);
		
		if(e.target.checked===true){
			newTasks[index].completed = true;
			setTasks(newTasks);
		}

		else{
			newTasks[index].completed = false;
			setTasks(newTasks);
		};

		refreshTasks();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (value!==""){
			let newTask = {key: v4(),name: value, completed: false};
			setTasks([...tasks,newTask]);
		};
	};

	return (
			<div className="todoapp stack-large">
				<h1>TodoMatic</h1>
				<form>
				<h2 className="label-wrapper">
					<label htmlFor="new-todo-input" className="label__lg">
					What needs to be done?
					</label>
				</h2>
				<input type="text" id="new-todo-input" className="input input__lg" name="text" autoComplete="off" onChange={handleInput}
				/>
				<button type="submit" onClick={handleSubmit} className="btn btn__primary btn__lg">
					Add
				</button>
				</form>

				<div className="filters btn-group stack-exception">
					<button type="button" className="btn toggle-btn" aria-pressed="true" onClick={showAll}>
						<span>all</span>
						<span> tasks</span>
					</button>
					<button type="button" className="btn toggle-btn" aria-pressed="false" onClick={showActive}>
						<span>Active</span>
						<span > tasks</span>
					</button>
					<button type="button" className="btn toggle-btn" aria-pressed="false" onClick={showCompleted}>
						<span>Completed</span>
						<span> tasks</span>
					</button>
				</div>

				<h2 id="list-heading">{tasks.length} tasks remaining</h2>

				<ul
				role="list"
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading">
					{a[filter].map(e => {
						return <Task key={e.key} task={e} 
						deleteTask={deleteTask} completeTask={completeTask} ></Task>
					})}

				</ul>
			</div>
	);
}

export default App;
