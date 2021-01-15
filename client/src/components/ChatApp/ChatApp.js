import React, {useState, useEffect} from 'react';
import './ChatApp.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

const ChatApp = ()=>{

    const [state, setState] = useState({message: ''});
    const [fitnessChat, setFitnessChat] = useState([]);
    const [musicChat, setMusicChat] = useState([]);
    const [politicsChat, setPoliticsChat] = useState([]);
    const [religionChat, setReligionChat] = useState([]);
    const [sportsChat, setSportsChat] = useState([]);
    const [room, setRoom] = useState('');
    const dateObject = new Date();
    const date = new Date().toISOString().split('T')[0];
    const time = dateObject.toLocaleTimeString();




    useEffect(()=>{
        socket.on('fitness', ({message})=>{
            setFitnessChat([...fitnessChat, message]);
        })
        socket.on('music', ({message})=>{
            setMusicChat([...musicChat, message]);
        })
        socket.on('politics', ({message})=>{
            setPoliticsChat([...politicsChat, message]);
        })
        socket.on('politics', ({message})=>{
            setReligionChat([...religionChat, message]);
        })
        socket.on('politics', ({message})=>{
            setSportsChat([...sportsChat, message]);
        })
    },[fitnessChat, musicChat, politicsChat, religionChat, sportsChat])

    const setRoomFunction = (e)=>{
        setRoom(e.target.innerText);
    }

    const onTextChange = (e)=>{
        setState({message: e.target.value});
    }

    const renderChat = (room)=>{

        let chatLog = '';


        switch(room){
            case 'Fitness': 
            chatLog = fitnessChat.map((item, index)=>{
                console.log('Now we are in');
                return <h4 key={index}>{item}</h4>
                
            });
            break;
            case 'Music':
            chatLog = musicChat.map((item, index)=>{
                return <h4 key={index}>{item}</h4>
            });
            break;
            case 'Politics':
            chatLog = politicsChat.map((item, index)=>{
                return <h4 key={index}>{item}</h4>
            });
            break;
            case 'Religion':
            chatLog = religionChat.map((item, index)=>{
                return <h4 key={index}>{item}</h4>
            });
            break;
            case 'Sports':
            chatLog = sportsChat.map((item, index)=>{
                return <h4 key={index}>{item}</h4>
            });
            break;
        }

        return chatLog;
    }


    const onSubmit = (e)=>{
        e.preventDefault();

        console.log(room);

        switch(room){
            case 'Fitness': 
            socket.emit('fitness', {
                message: state.message,
                date: date,
                time: time
            })
            break;
            case 'Music': 
            socket.emit('music', {
                message: state.message,
                date: date,
                time: time
            })
            break;
            case 'Politics': 
            socket.emit('politics', {
                message: state.message,
                date: date,
                time: time
            })
            break;
            case 'Religion': 
            socket.emit('religion', {
                message: state.message,
                date: date,
                time: time
            })
            break;
            case 'Sports': 
            socket.emit('sports', {
                message: state.message,
                date: date,
                time: time
            })
            break;
        }
    }


    return (
        <div className="app-container">
            <div className="chatrooms">
                <h4 onClick={e=>setRoomFunction(e)}>Fitness</h4>
                <h4 onClick={e=>setRoomFunction(e)}>Music</h4>
                <h4 onClick={e=>setRoomFunction(e)}>Politics</h4>
                <h4 onClick={e=>setRoomFunction(e)}>Religion</h4>
                <h4 onClick={e=>setRoomFunction(e)}>Sports</h4>
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