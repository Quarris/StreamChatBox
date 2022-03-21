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

    return (
        <>
            <div className="message-container" style={{ backgroundColor: props.isDark ? "#404040aa" : "#a0a0a0aa" }}>
                <div className="user">
                    {icons.map(icon => (<img key={icon} className="badge" src={icon}></img>))}
                    <span className="offset-text">
                        <span className="name" style={{ color: props.tags.color }}>{props.tags.displayName}</span>:
                    </span>
                </div>
                <span className="message offset-text">{props.message}</span>
            </div>
        </>
    )
}