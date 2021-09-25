import { useEffect, useState } from 'react';
import './App.scss';
import Task from './Task/Task';

function App() {


  function checkLocalTodos(){
    let localTodos = localStorage.getItem("todoListV1");
  
    if (localTodos) {
      let parseTodo = JSON.parse(localTodos)
      return parseTodo;
    } else {
      return ([]);
    };
  }

  const [task , setTask] = useState({task : "", type : "home", etat : "en cours"});
  const [todosList, setTodosList] = useState(checkLocalTodos());

  function handleInput(e) {
    setTask({...task, task : e.target.value});
  }

  function handleSelect(e){
    setTask({...task, type : e.target.value});
  }

  function handleClick() {
    setTodosList([...todosList, task]);
    document.getElementById("tache").value = "";
  }

  useEffect(() => {
    localStorage.setItem("todoListV1", JSON.stringify(todosList));
    console.log(localStorage.getItem("todoListV1"));
  }, [todosList]);

  function setStyle(value){
    if (value === "home") {
      return ("home");
    } else if (value === "hobbie") {
      return ("hobbie");
    } else if (value === "admin") {
      return ("admin")
    }
  }


  function getTaskInProgresse(){
    let result = todosList.map((todo, key) => {
      if (todo.etat === "en cours") {
        return (
          <div key={key} className={"item " + setStyle(todo.type)}>
            <p>{todo.task}</p>
            <p>{todo.type}</p>
            <button onClick={() => switchToTerminée(todo)}>
              Terminer !
            </button>
          </div>
        );
      } else {
        return <div key={key}></div>
      }
    });
    return result;
  };

  function switchToTerminée(todoTask){
    let result = setTodosList((todosList) =>
      todosList.map((item) => {
        if (item === todoTask) {
          return (
            {...item, etat: "done"}
            )
        } else {
          return item
        }
      })
    );
    return result;        
  }

  function switchToDelete(todoTask){
    let result = setTodosList((todosList) =>
      todosList.map((item) => {
        if (item === todoTask) {
          return (
            {...item, etat: "delete"}
            )
        } else {
          return item
        }
      })
    );
    return result;        
  }
  
  function getTaskDone(){
    let result = todosList.map((todo, key) => {
      if (todo.etat === 'done') {
        return (
          <div key={key} className={"item " + setStyle(todo.type)}>
            <p>{todo.task}</p>
            <p>{todo.type}</p>
            <button onClick={() => switchToDelete(todo)}>
              Supprimer !
            </button>
          </div>
        );
      } else {
        return <div key={key}></div>
      }
    });
    return result;
    
  };
  function getTaskDelete(){
    let result = todosList.map((todo, key) => {
      if (todo.etat === 'delete') {
        return (
          <div key={key} className={"item " + setStyle(todo.type)}>
            <p>{todo.task}</p>
            <p>{todo.type}</p>
          </div>
        );
      } else {
        return <div key={key}></div>
      }
    });
    return result;
    
  };

  function handleReset() {
  let response = prompt("Voulez vous vraiment supprimer toute vous taches ?\n \"OUI\" ou \"NON\"");
    checkResponse(response);    
  }
  function checkResponse(response){
    if (response === "OUI") {
      localStorage.removeItem("todoListV1");
      setTodosList([]);
    } else if (response === "NON") {
    } else {
      handleReset();
    }
  }

  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <div className="container">
        <div className="formulaire">
          <input type="text" name="tache" id="tache" onChange={handleInput}/>
          <select name="type" id="type" onChange={handleSelect}>
            <option value="home">Ménage</option>
            <option value="hobbie">Loisir</option>
            <option value="admin">Administration</option>
          </select>
          <button onClick={handleClick}>Ajouter</button>
          <button onClick={handleReset} >Reset LocalStorage</button>
        </div>
      </div>
      <Task 
        task={getTaskInProgresse()}
        taskDone={getTaskDone()}
        taskDelete={getTaskDelete()}
      />
    </div>
  );
}

export default App;
