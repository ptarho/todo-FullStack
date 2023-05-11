import React from "react";
import { AppContext } from "../App";
import { useCookies } from "react-cookie"

function Modal({ mode, setShowModal, task}) {
  const [cookies, setCookie, removeCookie] = useCookies()
  const editMode = mode === "edit" ? true : false;
  const { getData } = React.useContext(AppContext)

  const [data, setData] = React.useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title:  editMode ? task.title : "",
    progress:  editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log(response)
        setShowModal(false)
        getData()
      }
    } catch(err) {
      console.log(err)
    }
  }

  const editData = async (e) => {
    e.preventDefault()
    console.log(`editing!`)
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log(response)
        setShowModal(false)
        getData()
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name] : value
    }))
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal__title">
          <h3>{mode[0].toUpperCase() + mode.slice(1)} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form action="">
          <input
            required
            name="title"
            value={data.title}
            placeholder="Write your task"
            maxLength={30}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Select your current progress</label>
          <input
            required
            id="range"
            type="range"
            min={0}
            max={100}
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input className={mode} type="submit" value={mode} onClick={editMode ? editData : postData}/>
        </form>
      </div>
    </div>
  );
}

export default Modal;
