import { useEffect, useState } from 'react';
import './App.css';
import ChatBox from './ChatBox';
import { connectToChat } from './Twitch';

function App() {
    const [messagesData, setMessages] = useState([])
    const [oddDark, setOddDark] = useState(false)

    const onMessage = (message, tags) => {
        let data = { message: message, tags: tags }
        messagesData.unshift(data)
        if (messagesData.length > 20) {
            messagesData.pop()
        }

        setOddDark(v => !v)
        setMessages([...messagesData])
    }

    useEffect(() => {
        connectToChat(onMessage)
    }, [])

    return (
        <div className="app">
            <ChatBox oddDark={oddDark} messages={messagesData}></ChatBox>
        </div>
    );
}

export default App;
