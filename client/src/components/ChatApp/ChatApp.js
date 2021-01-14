import React, {useState, useEffect} from 'react';
import './ChatApp.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

const ChatApp = ()=>{

    const [state, setState] = useState({message: ''});
    const [chat, setChat] = useState([]);
    const [secondChat, setSecondChat] = useState([]);
    const [thirdChat, setThirdChat] = useState([]);
    const [room, setRoom] = useState('');


    useEffect(()=>{
        socket.on('message1', ({message})=>{
            setChat([...chat, message]);
        })
        socket.on('message2', ({message})=>{
            setSecondChat([...secondChat, message]);
        })
        socket.on('message3', ({message})=>{
            setThirdChat([...thirdChat, message]);
        })
    },[chat, secondChat, thirdChat])

    const setRoomFunction = (e)=>{
        setRoom(e.target.innerText);
    }

    const onTextChange = (e)=>{
        setState({message: e.target.value});
    }

    const renderChat = (room)=>{

        let chatLog = '';


        switch(room){
            case 'Room1': 
            chatLog = chat.map((item, index)=>{
                return <h3 key={index}>{item}</h3>
            });
            break;
            case 'Room2':
            chatLog = secondChat.map((item, index)=>{
                return <h3 key={index}>{item}</h3>
            });
            break;
            case 'Room3':
            chatLog = thirdChat.map((item, index)=>{
                return <h3 key={index}>{item}</h3>
            });
            break;
        }

        return chatLog;
    }


    const onSubmit = (e)=>{
        e.preventDefault();

        switch(room){
            case 'Room1': 
            socket.emit('message1', {
                message: state.message
            })
            break;
            case 'Room2': 
            socket.emit('message2', {
                message: state.message
            })
            break;
            case 'Room3': 
            socket.emit('message3', {
                message: state.message
            })
            break;
        }
    }


    return (
        <div className="app-container">
            <div className="chatrooms">
                <h2 onClick={e=>setRoomFunction(e)}>Room1</h2>
                <h2 onClick={e=>setRoomFunction(e)}>Room2</h2>
                <h2 onClick={e=>setRoomFunction(e)}>Room3</h2>
            </div>
            <div className="chatwindow">
            { renderChat(room)}
            </div>
            <div className="submit">
              <form>
                  <input onChange={e =>onTextChange(e)} type="text" name="message" value={state.message}></input>
                  <button onClick={e=>onSubmit(e)}>Send message</button>
              </form>
              
            </div>
        </div>
    )


}
export default ChatApp