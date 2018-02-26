import Axios from "axios";
import qs from 'qs';
var myToken;

var getToken = Axios.create({
  baseURL: ' https://cs-554-spotify-proxy.herokuapp.com/api',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  auth: {
    username: '0ea2a450503d4f62afec2062e3230ee7',
    password: '8a3a7f845cef4198a5733805163179e1'
  }
});

var getSong = Axios.create({
  baseURL: 'https://api.spotify.com/v1'
});


let token = async () => {
  let httpResponse = await getToken.post('/token', qs.stringify({ 'grant_type': 'client_credentials' }));
  return httpResponse.data.access_token;
}


export let searchForSongs = async query => {

  if (myToken === undefined) {
    myToken = await token();
  }

  getSong.defaults.headers.common['Authorization'] = 'Bearer ' + myToken;

  let httpResponse = await getSong.get('/search', {
    params: {
      q: 'track:'.concat(query),
      type: 'track',
      limit: '30'
    }
  });


  let tracks = [];
  httpResponse.data.tracks.items.forEach(function (element) {
    let artists = [];
    element.artists.forEach(function (element) {
      let artist = {
        artistName: element.name,
        artistUrl: element.external_urls.spotify
      }
      artists.push(artist);
    });

    let albumArt="";
    if (element.album.images[1]!==undefined) {
      albumArt = element.album.images[1].url;
    }
   
    
   let previewUrl
   if(element.preview_url){
     previewUrl = element.preview_url;
   }

    let track = {
      id: element.id,
      name: element.name,
      artists: artists,
      albumUrl: element.album.external_urls.spotify,
      album: element.album.name,
      albumArt: albumArt,
      popularity:element.popularity,
      previewUrl:previewUrl
    }
    tracks.push(track);

  });
  return tracks;
};



