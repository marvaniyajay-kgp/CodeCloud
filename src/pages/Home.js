import React, { useState } from 'react'
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();

  const [roomId,setRoomId]=useState('');
  const [username,setUsername]=useState('');

  const createNewRoom=(e)=>{
    e.preventDefault();  
    // to prevent refresh on clicking new room
    const id = uuidV4();
    setRoomId(id);
    // console.log(id);
    toast.success('Created a new room');
  }

  const joinRoom=()=>{
    if(!roomId || !username){
      toast.error('Room ID and username is required');
      return;
    }

    //Else Redirect
    navigate(`/editor/${roomId}`,{
      state:{
        username
      },
    });
  };
  const handleInputEnter=(e)=>{
    // console.log('event',e.code);
    if(e.code==='Enter'){
      joinRoom();
    }
  };

  return (
  <div className="homePageWrapper">
    <div className="formWrapper">
        <img className="homePageLogo" src="/code-sync.png" alt="code-sync-logo" style={{ maxWidth: '400px'}} />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
            <input 
            type="text" 
            className="inputBox" 
            placeholder="ROOM ID"
            onChange={(e)=>setRoomId(e.target.value)}  //for manually entering yours
            value={roomId}  //puts new room id
            onKeyUp={handleInputEnter}
            />
            <input 
            type="text" 
            className="inputBox" 
            placeholder="USERNAME"
            onChange={(e)=>setUsername(e.target.value)} 
            value={username}
            onKeyUp={handleInputEnter}
            />
            <button className="btn joinBtn" onClick={joinRoom}>Join</button>
            <span className="createInfo">
              If you don't have an invite the create a &nbsp;  {/*non breaking space: &nbsp */}
              <a onClick={createNewRoom} href="" className="createNewBtn"> {/*onClick : listner */}
                new room
              </a>
            </span>
        </div>
    </div>
    <footer>
      <h4>
        Built by <a href="https://github.com/Code52002">Shashi</a>
      </h4>
    </footer>
  </div>
  );
};

export default Home