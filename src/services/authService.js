import jwtDecode from 'jwt-decode';
import http from './httpService'
import config from '../config.json'

const tokenKey= 'token'

http.setJwt(getJwt())
export async function auth (email, password){
    const {data: jwt}=await http.post(`${config.apiEndpoint}auth`, {email, password})
    
    localStorage.setItem(tokenKey, jwt)
}

export function loginWithJwt (jwt){
    localStorage.setItem(tokenKey, jwt)
}

export function getCurrentUser(){
    try {
        const result =localStorage.getItem(tokenKey)
        const user= jwtDecode(result)
        return user
      } catch (ex) {
        return null
      }
}

export function logout(){
    localStorage.removeItem(tokenKey)
}

function getJwt(){
    return localStorage.getItem('token')
}
