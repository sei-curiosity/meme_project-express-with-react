import React, {Component} from 'react';
import {index,destroy} from './api'
import {Link} from 'react-router-dom';

class MemeIndex extends Component{
    state={
        memes:[]
    }

    componentDidMount(){
        const user = this.props.user
        index(user)
        .then(response => {
           const allMemes = response.data.memes;
           this.setState({
               memes:allMemes
           })
        })
        .catch((error) => console.log(error))
    }

    destroy = (memeId) => {
        const user = this.props.user
        destroy(user,memeId)
        .then(() => alert('deleted'))
        .then(() => {
           const newMemes = this.state.memes.filter((meme) => meme._id != memeId)
            this.setState({
                memes:newMemes
            })
        })
        .catch((error) => console.log(error))
    }
    render(){
        console.log(this.props.user)
        return(
            <div>
                {this.state.memes.map((meme,index) => (
                   <div key={index}>
                        <Link to={`/memes/${meme._id}`}><h1>{meme.title}</h1></Link>
                        <img src={meme.imageUrl} alt=""/>
                        <button onClick={() => this.destroy(meme._id)}>Delete</button>
                        <Link to={`/memes/${meme._id}/edit`}><button>Edit</button></Link>
                    </div>
                ))}
            </div>
        )
    }
}



export default MemeIndex
