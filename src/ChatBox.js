import React from 'react'
import './ChatBox.css'
import ChatMessage from './ChatMessage'

function ChatBox(props) {
    return (
        <>
            <div className="chat-box">
                {props.messages.map((data, i) => <ChatMessage key={i} isDark={props.oddDark == (i % 2 == 1)} message={data.message} tags={data.tags} />)}
                <div className="chat-pad" />
            </div>
        </>
    )
}

export default ChatBox