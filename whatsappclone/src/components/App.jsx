import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  //Axios is a popular, promise-based HTTP client that sports an easy-to-use API and can be used in both the browser and Node. js. Making HTTP requests to fetch or save data is one of the most common tasks a client-side JavaScript application will need to do.

  const [messages, setmessages] = useState([]);

  useEffect(() => {
    axios.get("/message/sync").then((response) => {
      //storing
      setmessages(response.data); //data here is message which we want to fetch
    });
  }, []);

  useEffect(() => {
    //whenevr we attach listner we want it to use once thats what empty bracket says
    const pusher = new Pusher(process.env.CLUSTER_ID, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages"); //message here is channel name
    channel.bind("inserted", function (data) {
      setmessages([...messages, data]);
    });
    //clean up function when message change we only have one subscriber
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]); //messages added here as dependency because we are using here messages otherwise code here

  return (
    <div className="App">
      <div className="App_body">
        <Sidebar />
        <Chat msg={messages} />
      </div>
    </div>
  );
}

export default App;
