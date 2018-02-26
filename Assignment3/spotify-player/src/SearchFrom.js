import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      orderByPopularity: false
    };
  }

  onSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery) {
      this.props.onSearch(this.state.searchQuery, this.state.orderByPopularity);
    }
  };

  toggleNameOrdering = e => {
    this.setState({
      orderByPopularity: e.target.checked
    });
  };

  onSearchQueryChange = e => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="form-group col-12">
            <h1><label htmlFor="songName">
              What song do you want to search for?
          </label></h1>
            <input
              type="text"
              value={this.state.searchQuery}
              onChange={this.onSearchQueryChange}
              className="form-control"
              id="songName"
              placeholder="song..."
            />

          </div>
          <button type="submit" className="btn btn-primary ml-3" id="searchBtn">
            Search
           </button>
          <div className="form-group ml-3">
            <label>
              <input
                type="checkbox"
                checked={this.state.orderByPopularity}
                onChange={this.toggleNameOrdering}
              />
              Order by popularity
            </label>
          </div>

        </div>
      </form>
    );
  }
}

export default SearchForm;
