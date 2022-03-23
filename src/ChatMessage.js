import { useEffect, useState } from "react";
import "./ChatMessage.css"
import { twitchData } from "./Twitch"

export default function ChatMessage(props) {
    const badges = props.tags.badges
    const icons = Object.entries(badges).map((entry) => {
        let set = entry[0].replace(/[A-Z]/g, m => "-" + m.toLowerCase());
        let version = entry[1] === true ? 1 : entry[1]
        if (twitchData.channelBadges[set] && twitchData.channelBadges[set][version]) {
            return twitchData.channelBadges[set][version]
        }
        if (twitchData.globalBadges[set] && twitchData.globalBadges[set][version]) {
            return twitchData.globalBadges[set][version]
        }
        return null
    }).filter(v => v != null)

    const [fadeProp, setFadeProp] = useState({
        fade: 'fade-in'
    })

    useEffect(() => {
        const timeout = setInterval(() => {
            setFadeProp({
                fade: 'fade-out'
            })
        }, 7000);
        return () => clearInterval(timeout)
    }, [fadeProp])

    const replaceEmotes = (msg, emotes) => {
        emotes.sort((a, b) => a.start - b.start)
        console.log(emotes)
        var resultMsg = []
        var index = 0

        // Iterate over the emotes, adding them one by one into the resultant string
        // Text in between is also being added
        for (var i = 0; i < emotes.length; i++) {
            var emote = emotes[i]
            resultMsg.push(<span key={`msg_${i}`} className='offset-text'>{msg.substring(index, emote.start)}</span>)
            resultMsg.push((<img key={`emote_${i}`} className='emote' src={`https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/${props.isDark ? 'dark' : 'light'}/1.0`} alt={msg.substring(emote.start, emote.end)}/>))
            index = emote.end + 1
        }

        // After all emotes are added, append the ending of the string
        resultMsg.push(<span key={`msg_${i}`} className='offset-text'>{msg.substring(index, msg.length)}</span>)

        return resultMsg
    }

    return (
        <>
            <div className={`message-container ${fadeProp.fade}`} style={{ backgroundColor: props.isDark ? "#404040aa" : "#a0a0a0aa" }}>
                <div className="user">
                    {icons.map(badge => (<img key={badge} className="badge" src={badge}></img>))}
                    <span className="offset-text">
                        <span className="name" style={{ color: props.tags.color }}>{props.tags.displayName}</span>:
                    </span>
                </div>
                <span className="message">
                    {replaceEmotes(props.message, props.tags.emotes)}
                </span>
            </div>
        </>
    )
}