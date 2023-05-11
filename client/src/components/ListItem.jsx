import React from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import { AppContext } from "../App";

function ListItem({ task }) {
  const [showModal, setShowModal] = React.useState(false);
  const { getData } = React.useContext(AppContext)

  const deleteItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "DELETE"
      })
      if (response.status === 200) {
        getData()
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <li className="list__item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>EDIT</button>
        <button className="delete" onClick={deleteItem}>DELETE</button>
      </div>
      {showModal && <Modal mode="edit" setShowModal={setShowModal} task={task} />}
    </li>
  );
}

export default ListItem;
