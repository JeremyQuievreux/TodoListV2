import './Task.scss';

function Task({task, taskDone, taskDelete}) {

    


    return(
        <div className="task-container">
            <div className="en-cours">
                <div>
                    <h2>Taches en cours : </h2>
                </div>
                <div className="items">
                    {task}  
                </div>
            </div>
            <div className="done">
                <div>
                    <h2>Taches en terminées : </h2>
                </div>
                <div className="items">
                    {taskDone}  
                </div>
            </div>
            <div className="delete">
                <div>
                    <h2>Taches en supprimées : </h2>
                </div>
                <div className="items">
                    {taskDelete}  
                </div>
            </div>
        </div>
    )
}

export default Task;