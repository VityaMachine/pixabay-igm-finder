import React, { Component } from "react";
import styles from "./App.module.css";

import apiServices from "../services/pixabayApi";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";

import Loader from "./Loader/Loader";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

export default class App extends Component {
  state = {
    status: "idle",
    imageDescription: "",
    page: null,
    imagesArr: [],
    totalHits: 0,
    error: null,
    largeImgUrl: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImgDescr = prevState.imageDescription;
    const thisImgDescr = this.state.imageDescription;

    if (thisImgDescr.length > 0 && prevImgDescr !== thisImgDescr) {
      this.setState({
        status: "pending",
      });

      apiServices
        .fetchImages(thisImgDescr)
        .then((data) => {
          if (data.hits.length > 0) {
            this.setState({
              status: "resolved",
              imagesArr: [...data.hits],
              totalHits: data.totalHits,
              page: 1,
            });
          }

          if (data.hits.length === 0) {
            this.setState({
              status: "rejeected",
              error: `images ${thisImgDescr} not found`,
              images: [],
              totalHits: 0,
              page: null,
            });
          }
        })
        .catch((error) =>
          this.setState({
            error: error.message,
            status: "rejected",
            images: [],
            totalHits: 0,
            page: null,
          })
        );
    }
  }

  // componentDidMount() {
  //   apiServices.fetchImages("dog", 1).then((images) => console.log(images));
  // }

  handleImgDescrChange = (newDescr) => {
    this.setState({
      imageDescription: newDescr,
    });
  };

  render() {
    const { status, imagesArr, page, totalHits } = this.state;

    const loadMoreDisabledStatus = totalHits < page * 12;

    return (
      <div className={styles.app}>
        <Searchbar onSearchClick={this.handleImgDescrChange} />

        {status === "resolved" && (
          <ImageGallery>
            {imagesArr.map((el) => (
              <ImageGalleryItem
                key={el.id}
                imgUrl={el.webformatURL}
                imgText={el.tags}
              />
            ))}
          </ImageGallery>
        )}

        {status === "resolved" && (
          <LoadMoreBtn isDisabled={loadMoreDisabledStatus} />
        )}

        {status === "pending" && <Loader />}
      </div>
    );
  }
}
