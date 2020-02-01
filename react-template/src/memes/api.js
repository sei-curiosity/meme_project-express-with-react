import apiUrl from '../apiConfig';
import Axios from 'axios'


export const index = (user) => {
    return  Axios({
        method:'GET',
        url: apiUrl + '/memes',
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
    })
}

export const show = (user, memeId) => {
    return Axios({
        method:'GET',
        url: apiUrl + `/memes/${memeId}`,
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
    })
}


export const create = (user,newMeme) => {
    return Axios({
        method:'POST',
        url:apiUrl + '/memes',
        headers:{
            "Authorization":`Bearer ${user.token}`
        },
        data:{
            meme:newMeme
        }
    })
}


export const destroy = (user,memeId) => {
    return Axios({
        method:"DELETE",
        url:apiUrl + `/memes/${memeId}`,
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
    })
}


export const update = (user,updateMeme,memeId) => {
    return Axios({
        method:'PUT',
        url:apiUrl + `/memes/${memeId}`,
        headers:{
            "Authorization":`Bearer ${user.token}`
        },
        data:{
            meme:updateMeme
        }
    })
}