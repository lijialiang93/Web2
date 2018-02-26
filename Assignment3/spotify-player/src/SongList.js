
import React, { Component } from "react";
import SongListEntry from "./SongListEntry";

class SongList extends Component {

  render() {
    return (
      <div>
        <div className="mt-3 alert alert-success">
          Most relevant {this.props.songList.length} results for '{this.props.songName}'
        </div>
        <div className="row">
          {this.props.songList.map(song => {
            return  (<div key={song.id} className="col-sm-12 col-md-6 col-lg-4">
            <SongListEntry song={song}></SongListEntry></div>);
          })}
        </div>
      </div>
    );
  }
}

export default SongList;
