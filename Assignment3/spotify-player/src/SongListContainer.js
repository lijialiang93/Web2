import React, { Component } from "react";
import { searchForSongs } from "./utility/spotifyApi";
import SongList from "./SongList";


class SongListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfMatchingSongs: [],
            searched : false
        };
    }

    componentDidMount = async props => {
        if (this.props.songName) {
            const matches = await searchForSongs(this.props.songName);
            this.setState({
                listOfMatchingSongs: matches,
                searched : true
            });
        }
    };

    componentWillReceiveProps = async newProps => {
        if (newProps.songName && newProps.songName !== this.props.songName) {
            const matches = await searchForSongs(newProps.songName);
            this.setState({
                listOfMatchingSongs: matches,
                searched : true
            });
        }


    };

    render() {

        const songs = [...this.state.listOfMatchingSongs];
        if(this.props.orderByPopularity){
            songs.sort((x, y) => {
                if (x.popularity < y.popularity) return 1;
                if (x.popularity > y.popularity) return -1;
                return 0;
              });    
        }
       

        if(songs.length>0&&this.state.searched){
            return <SongList songList={songs} songName={this.props.songName}/>;
        }
        else if(this.state.searched){
            return(
                <div className="alert alert-danger mt-3">
               '{this.props.songName}' Not found
                </div>
            );
        }
        else{
            return(<div className="alert alert-info mt-3">result goes here</div>);
        }
    }
}

export default SongListContainer;
