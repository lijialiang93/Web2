import React from "react";

function SongListEntry({ song }) {
  let previewDiv;
  if (song.previewUrl !== undefined) {
    previewDiv = <audio controls><source src={song.previewUrl} type="audio/mp3" /> </audio>
  }
  else {
    previewDiv = <div className="alert alert-warning"><strong>No preview</strong></div>
  }
  return (

    <div className="card mb-3 text-center">
      <img className="card-img-top" src={song.albumArt} alt={song.name} />
      <div className="card-block">
        <p className="card-title">{song.name}</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Album:&nbsp;
            <a target="_blank" href={song.albumUrl}>{song.album}</a>
          </li>
          <li className="list-group-item">Artist(s):
            {song.artists.map((artist=> {
              return (
                <div key={artist.artistName}>
                  <a target="_blank" href={artist.artistUrl}>{artist.artistName}</a>
                </div>
              )
            }))}
          </li>
          <li className="list-group-item">Popularity:&nbsp;
            {song.popularity}
          </li>
          <li className="list-group-item">
            {previewDiv}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SongListEntry;
