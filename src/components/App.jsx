import React, { Component } from "react";
import styles from "./App.module.css";

import apiServices from "../services/pixabayApi";

import Searchbar from "./Searchbar";

export default class App extends Component {
  state = {
    status: "idle",
    imageDescription: "",
    page: null,
    images: [],
  };

  // example fetch using
  // componentDidMount() {
  //   apiServices.fetchImages("dog", 1).then((images) => console.log(images));
  // }

  render() {
    return (
      <div className={styles.app}>
        <Searchbar />
      </div>
    );
  }
}
