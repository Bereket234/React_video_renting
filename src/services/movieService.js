import config from '../config.json'
import http from './httpService'


export function getMovies() {
  return http.get(`${config.apiEndpoint}movies`)
}

export function getMovie(id) {
  return http.get(`${config.apiEndpoint}movies/${id}`)
}

export async function saveMovie(movie) {
  if(movie._id){
    const data= {...movie}
    delete data._id
    return http.put(`${config.apiEndpoint}movies/${movie._id}`, data)
  }
  http.post(`${config.apiEndpoint}movies/`, movie)
}

export async function deleteMovie(id) {
  return http.delete(config.apiEndpoint+'movies/'+id)
}
