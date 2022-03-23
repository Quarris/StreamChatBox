import TwitchJs from 'twitch-js'

const username = process.env.REACT_APP_USER
const token = process.env.REACT_APP_TOKEN
const channel = process.env.REACT_APP_CHANNEL
const clientId = process.env.REACT_APP_CLIENT_ID


const { chat, api } = new TwitchJs({ token, clientId, username })

const twitchData = {}

function connectToChat(onMessage) {
    downloadGlobalBadges()
    chat.connect().then(() => {
        console.log('Connected to Twitch')
        console.log('Joining ' + channel)
        chat.join(channel).then(channelResponse => {
            getUserId(channel.substring(1)).then(() => downloadChannelBadges(twitchData.broadcaster_id)).then(() => console.log(twitchData))
        })
        chat.on('PRIVMSG', res => {
            onMessage(res.message, res.tags)
        })
    }, () => console.log('Failed to connect to Twitch'))
}

function getUserId(username) {
    return api.get(`users?login=${username}`).then(usersResponse => {
        twitchData.broadcaster_id = usersResponse.data[0].id
    })
}

function downloadGlobalBadges() {
    api.get('chat/badges/global').then(res => {
        twitchData.globalBadges = res.data.reduce((acc, curr) => {
            acc[curr.setId] = curr.versions.reduce((acc2, curr2) => {
                acc2[curr2.id] = curr2.imageUrl2X
                return acc2
            }, {})
            return acc
        }, {})
    })
}

function downloadChannelBadges(broadcaster_id) {
    api.get(`chat/badges?broadcaster_id=${broadcaster_id}`).then(res => {
        twitchData.channelBadges = res.data.reduce((acc, curr) => {
            acc[curr.setId] = curr.versions.reduce((acc2, curr2) => {
                acc2[curr2.id] = curr2.imageUrl2X
                return acc2
            }, {})
            return acc
        }, {})
    })
}

export { connectToChat, twitchData }