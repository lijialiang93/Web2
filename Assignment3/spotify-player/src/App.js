import React, { Component } from 'react';
import SearchForm from './SearchFrom';
import SongListContainer from './SongListContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: "",
      orderByPopularity: false
    };
  }

  onSearch = (searchQuery, orderBy) => {
    this.setState({
      songName: searchQuery,
      orderByPopularity: orderBy
    });
  };


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SearchForm onSearch={this.onSearch}></SearchForm>
            <SongListContainer songName={this.state.songName}
              orderByPopularity={this.state.orderByPopularity}>
            </SongListContainer>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
