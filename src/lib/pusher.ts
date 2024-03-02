// import Pusher from 'pusher'
// import PusherClient from 'pusher-js'

// export const pusherClient = new PusherClient(process.env.PUSHER_KEY ?? '', {
//     cluster: 'ap1',
// })

// export const pusher = new Pusher({
//     appId: process.env.PUSHER_APP_ID ?? '',
//     key: process.env.PUSHER_KEY ?? '',
//     secret: process.env.PUSHER_SECRET ?? '',
//     cluster: 'ap1',
//     useTLS: true,
// })

import Pusher from 'pusher'
import PusherClient from 'pusher-js'

export const pusherClient = new PusherClient('4911d01c14cd642a161a', {
    cluster: 'ap1',
})

export const pusher = new Pusher({
    appId: '1762735',
    key: '4911d01c14cd642a161a',
    secret: 'c89a14df33b8701659f2',
    cluster: 'ap1',
    useTLS: true,
})
