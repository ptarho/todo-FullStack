import React from "react";
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useCookies } from "react-cookie"

export const AppContext = React.createContext();

function App() {
  const [cookies, setCookie, removeCookie] = useCookies()
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email;
  const [tasks, setTasks] = React.useState([]);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
      );
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  console.log("the tasks is ");
  console.log(tasks);

  //sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <AppContext.Provider value={{ getData: getData }}>
      <div className="app">
        {!authToken && <Auth />}
        {authToken && 
          <>
            <ListHeader listName={"Holiday tick list"} />
            
            {sortedTasks?.map((task) => (
              <ListItem key={task.id} task={task} />
            ))}
          </>
        }
      </div>
    </AppContext.Provider>
  );
}

export default App;
