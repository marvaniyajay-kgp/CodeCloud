import {io} from 'socket.io-client';
let socket = null;//changed

export const initSocket = async() => {
  if (socket) return socket; //changed

    const options = {
        'force new connection':true,
        reconnectionAttempt:'Infinity',
        timeout : 10000,
        transports: ['websocket']
    };
    // const url = process.env.REACT_APP_BACKEND_URL;
    // console.log('Connecting to:', url);
    // return io(url, options);
    const url = process.env.REACT_APP_BACKEND_URL;
    // const url = 'http://localhost:5000';
    console.log('REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL);
    
    if (!url) {
      console.error('REACT_APP_BACKEND_URL is not defined');
      throw new Error('Backend URL is not configured');
    }
  
    console.log('Connecting to:', url);
    socket = io(url, options);  //changed
    // return io(url, options);
    return socket;
};