import React, { Component } from 'react';
import Likes from './common/likes'
import Table from './common/table';
import { Link } from 'react-router-dom';
import { getCurrentUser } from './../services/authService';


class MoviesTable extends Component {

    columns= [
        {path: 'title', label: 'Title', content: movie=> <Link to= {`/movies/${movie._id}`}>{movie.title}</Link>},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: 'like', content: movie=> <Likes onClick= {()=> this.props.onLike(movie)} isLiked={movie.liked} />}
    ]
    deleteColumn(){
        return(
            {key: 'delete', 
            content: movie=>
                <button className='btn btn-danger btn-sm' onClick={()=> this.props.onDelete(movie._id)} >
                    Delete
                </button>
            }  
        )
    }
    constructor(){
        super()
        const user= getCurrentUser()
        if(user&&user.isAdmin)
            this.columns.push(this.deleteColumn())
    }

    render() { 
        const {selectedMovies, onSort, sortColumns}= this.props
        return ( 
            <div>
                <Table
                    sortColumns= {sortColumns}
                    columns={this.columns}
                    onSort={onSort}
                    data={selectedMovies}
                />
            </div>
         );
    }
}
 
export default MoviesTable;