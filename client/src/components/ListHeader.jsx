import React from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

function ListHeader({ listName }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [showModal, setShowModal] = React.useState(false);

  const signOut = () => {
    console.log("signout");
    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };
  return (
    <div className="list-header">
      <h1>🌴 {listName}</h1>
      <div className="header__nav">
        <div className="button-container">
          <button className="create" onClick={() => setShowModal(true)}>
            ADD NEW
          </button>
          <button className="signout" onClick={signOut}>
            SIGN OUT
          </button>
        </div>
        <p className="user-email">Welcome back {cookies.Email}</p>
      </div>
      {showModal && <Modal mode={"create"} setShowModal={setShowModal} />}
    </div>
  );
}

export default ListHeader;
