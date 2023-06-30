import request from './request'

export function getAnswer(texts) {
   return  request({
        // url: '/api/get_chat_response',
        method: 'post',
        url: '/get_chat_response',
        data: {
            texts
        }
    })
}