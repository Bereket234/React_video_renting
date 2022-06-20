import React, { Component } from 'react';
import _ from 'lodash'
import MoviesTable from './MoviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import { Paginate } from '../util/paginate';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Movies extends Component {
    state = { 
        movies: [],
        genres:[] ,
        pageSize: 4,
        currentPage: 1,
        selectedGenre: "All Movies",
        sortColumns: {},
        searchQuery: ''
     } 

     async componentDidMount(){
         const {data}= await getGenres()
         const {data:movies}= await getMovies()
         
        this.setState({
            movies,
            genres: [{_id: "1", name: "All Movies"}, ...data]
        })
     }
     handelDelete=async (_id)=> {
         const original= this.state.movies
         const movies= original.filter(movie=> movie._id !== _id)
         this.setState({movies})
         try{
             await deleteMovie(_id)
         } catch(ex){
             toast.error('unknown error occured')
             this.setState({movies: original})
         }
     }
     handelLike= (movie)=>{
        let movies= [...this.state.movies]
        const index= movies.indexOf(movie)
        movies[index]= {...movie}
        movies[index].liked= !movies[index].liked
        this.setState({movies})
     }

     handleSearch=({currentTarget: input})=>{
        const searchQuery= input.value
        this.setState({searchQuery, selectedGenre: 'All Movies', currentPage: 1})
        
     }

     handelPageChange=(page)=>{
         this.setState({currentPage: page})
     }

     handelSelectGenre= (val)=>{
        this.setState({ selectedGenre: val, searchQuery:'' , currentPage: 1})
     }

     handelSort= (sortColumns)=> {
         this.setState({
             sortColumns
         })
     }

     getSelectedMovies= ()=> {

        const {movies, pageSize, currentPage, selectedGenre, sortColumns, searchQuery}= this.state

        let filtered= movies

        if(searchQuery.length>0){
            filtered= movies.filter(m=> m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        )}
        else if(selectedGenre !== "All Movies"){
            filtered= movies.filter(m => m.genre.name === selectedGenre)}
        const sorted= _.orderBy(filtered, [sortColumns.path], [sortColumns.order])

        const selectedMovies= Paginate(sorted, currentPage, pageSize)

        return{selectedMovies, count: filtered.length}
     }

    render() { 
        const { pageSize, currentPage, genres, selectedGenre, sortColumns, searchQuery}= this.state
        const {selectedMovies, count}= this.getSelectedMovies()
        const {user}= this.props
        
        
        return (
            <React.Fragment>
            <div className='row'>
                <div className="col-3">
                    <ListGroup
                        items= {genres}
                        onItemSlect= {this.handelSelectGenre}
                        selectedItem= {selectedGenre}
                    />
                    
                </div>
                 <div className="col">
                    {user && <Link className='btn btn-primary m-3' to='/movies/add'>New Movie</Link>}
                    {selectedMovies.length> 0 ?<p> there are {count} in to rent.</p>: <p>there is no movie to rent</p>}
                    <SearchBox
                        onChange={this.handleSearch}
                        value={searchQuery}
                    />
                    {count>0 && 
                    <div>
                        <MoviesTable
                            selectedMovies= {selectedMovies}
                            onDelete= {this.handelDelete}
                            onLike= {this.handelLike}
                            onSort= {this.handelSort}
                            sortColumns= {sortColumns}
                        />
                        <Pagination
                            pageSize= {pageSize}
                            currentPage= {currentPage}
                            count= {count}
                            onPageChange={this.handelPageChange}
                        />
                    </div>
               } </div>
            </div>
            </React.Fragment>

        );
    }
}
 
export default Movies;