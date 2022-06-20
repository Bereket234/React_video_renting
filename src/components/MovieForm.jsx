import React  from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { saveMovie, getMovie } from '../services/movieService'

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate:''
    },
    genres:[],
    error:{}
   } 

   mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

   async populateGenres() {
    const {data: genres}= await getGenres()
    this.setState({
       genres
     })
   }

   async populateMovie(){
    try{
      const {id}= this.props.match.params
      if(id=== 'add') return
      let {data}= await getMovie(id)
      this.setState({data:this.mapToViewModel(data)})
    }catch(e){
      return this.props.history.replace('/not-found')
    }
   }

   async componentDidMount(){
    await this.populateGenres()
    await this.populateMovie()
   }

   schema= {
    _id: Joi.string(),
     title: Joi.string().required().label('Title'),
     genreId: Joi.string().required().label('Genre'),
     numberInStock: Joi.number().min(0).max(100).required().label('Stock'),
     dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
   }

   doSubmit=async ()=>{
    await saveMovie(this.state.data)
    this.props.history.replace('/')
   }
  render() { 
    const {genres}= this.state
    return (
      <React.Fragment>
        <h2>Movie form</h2>
      <form >
        {this.renderInput('title', 'Title')}
        {this.renderSelectOption(genres, 'Genres', 'genreId', 'genre')}
        {this.renderInput('numberInStock', 'Number in stock', 'number')}
        {this.renderInput('dailyRentalRate', 'Rate', 'number')}
        {this.renderButton('Submit')}
      </form>
      </React.Fragment>
    );
  }
}
 
export default MovieForm;