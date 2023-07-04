import styles from "./Searchbar.module.css";

import React, { Component } from "react";

export default class Searchbar extends Component {
  state = {
    searchInput: "",
  };

  handleInputChange = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };


  handleSubmit = e  => {

    e.preventDefault();

    console.log(this.state.searchInput);

  }

  render() {
    const { searchInput } = this.state;

    return (
      <header className={styles.searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchInput}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
