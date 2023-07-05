import request from "./request";

export function getMultiQueryAnswer(history, sorted_answer_list) {
    const multi_query_texts =  {
        id: 1,
        history,
        sorted_answer_list
    }
    return request({
        url: '/get_multi_query_answer',
        method: 'post',
        data: {
            multi_query_texts
        }
    })
}