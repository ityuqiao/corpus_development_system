import request from './request'

export function getAnswer(texts) {
   return  request({
        method: 'post',
        url: '/get_chat_response',
        data: {
            texts
        }
    })
}

export function submit(message) {
    return request({
        url: '/restart_chat',
        method: 'post',
        data: {
            message,
            is_reset: 'yes'
        }
    })
}