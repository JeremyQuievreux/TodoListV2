import { useEffect, useState } from 'react';
import './App.scss';
import Task from './Task/Task';

function App() {
  //Check du localstorage
  function checkLocalTodos(){
    let localTodos = localStorage.getItem("todoListV1");
    if (localTodos) {
      let parseTodo = JSON.parse(localTodos)
      return parseTodo;
    } else {
      return ([]);
    };
  }
  //les states
  const [task , setTask] = useState({task : "", type : "home", etat : "en cours"});
  const [todosList, setTodosList] = useState(checkLocalTodos());
  //les handles des inputs / select et button valider
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
  //useEffect sur le tableau des taches, qui refresh avec le localstorage
  //a chaque changement du tableau le localStorage est mis a jour
  useEffect(() => {
    localStorage.setItem("todoListV1", JSON.stringify(todosList));
  }, [todosList]);
  //Fonction pour donner du style au div crées dans la fonction filtre
  function setStyle(value){
    if (value === "home") {
      return ("home");
    } else if (value === "hobbie") {
      return ("hobbie");
    } else if (value === "admin") {
      return ("admin")
    }
  }
  //Fonction générique de filtrage pour etat des taches
  function getTaskByEtat(valeur){
    let result = todosList.map((todo) => {
      if (todo.etat === valeur) {
        return (
          //appel de la fonction pour le style
          //ligne 58 = ternaire (il else en ligne) qui affiche ou pas un button selon l'etat de la tache,
          //et appel de la function qui change la valeur a l'interieur du boutton selon l'etat de la tache
          <div key={todo.id} className={"item " + setStyle(todo.type)}>
            <p>{todo.task}</p>
            <p>{todo.type}</p>
            {(todo.etat === "en cours" || todo.etat === "done") ? <button onClick={() => switchTo(todo, valeur)}> {setButton(todo.etat)} </button> : <p></p>} 
            </div>        
        );
      } else {
        return <div key={todo.id}></div>
      }
    });
    return result;
  };
  //Fonction que change le contenu du boutton
  function setButton(valeur){
    if (valeur === "en cours") {
        return "Terminer !"
    } else {
        return "Supprimer !"
    }
  }
  //Fonction on click sur les boutons des post it
  //et qui change leurs etats
  function switchTo(todoTask, valeur){
    let newvaleur ="";
    if (valeur === "en cours") {
      newvaleur = "done";
    } else if (valeur === "done") {
      newvaleur = "delete"
    }
    let result = setTodosList((todosList) =>
      todosList.map((item) => {
        if (item === todoTask) {
          return (
            {...item, etat: newvaleur}
            )
        } else {
          return item
        }
      })
    );
    return result;        
  }  
  //Fonction on click sur le btn reset
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
        task={getTaskByEtat("en cours")}
        taskDone={getTaskByEtat("done")}
        taskDelete={getTaskByEtat("delete")}
      />
    </div>
  );
}

export default App;
