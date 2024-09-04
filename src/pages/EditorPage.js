import React, { useState, useRef, useEffect } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
  const socketRef = useRef(null); //changing useRef will not re render the component(we wanted that on changing socketRef, it should not change)
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
 //Hard coding - these are states
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket(); //geting promise from the async function returning it
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));
//whatever is the error display it in console log
      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again");  //notification 
        reactNavigator("/");  //redirected to home page
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username, //from homepage(redirect section)
      });

      //listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
       ({clients,username,socketId}) => {
        if(username!==location.state?.username){
          toast.success(`${username} joined the room.`);
          console.log(`${username} joined`);
        }
        setClients(clients);  //getting many users: whenever making changes here
       }
      )
    };
    init();
  }, []); //give empty array to prevent it from called upon every render

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList"></div>
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>

        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
