import React, { Component } from "react";
import styles from "./App.module.css";

import apiServices from "../services/pixabayApi";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";

import Loader from "./Loader/Loader";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Modal from "./Modal/Modal";
import IdlePage from "./IdleView/IdleView";
import ErrorView from "./ErrorView/ErrorView";

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
        imagesArr: [],
        page: null,
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
              status: "rejected",
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

  handleImgDescrChange = (newDescr) => {
    this.setState({
      imageDescription: newDescr,
    });
  };

  handleLoadMoreClick = () => {
    this.setState({
      status: "pending",
    });

    const { imageDescription, page } = this.state;

    const newPage = page + 1;

    apiServices.fetchImages(imageDescription, newPage).then((data) =>
      this.setState((prevState) => ({
        status: "resolved",
        page: newPage,
        imagesArr: [...prevState.imagesArr, ...data.hits],
      }))
    );
  };

  handleModalOpen = (largeImgUrl, imgDescr) => {
    this.setState({
      largeImgUrl,
    });
  };

  handleModalClose = () => {
    this.setState({
      largeImgUrl: null,
    });
  };

  render() {
    const {
      status,
      imagesArr,
      page,
      totalHits,
      largeImgUrl,
      imageDescription,
      error,
    } = this.state;

    const loadMoreDisabledStatus = totalHits < page * 12;

    return (
      <div className={styles.app}>
        <Searchbar onSearchClick={this.handleImgDescrChange} />

        {status === "idle" && <IdlePage />}

        {(status === "resolved" ||
          (status === "pending" && imagesArr.length > 0)) && (
          <ImageGallery>
            {imagesArr.map((el) => (
              <ImageGalleryItem
                key={el.id}
                imgUrl={el.webformatURL}
                largeImgUrl={el.largeImageURL}
                imgText={el.tags}
                onModalOpen={this.handleModalOpen}
              />
            ))}
          </ImageGallery>
        )}

        {status === "resolved" && (
          <LoadMoreBtn
            onLoadMoreClick={this.handleLoadMoreClick}
            isDisabled={loadMoreDisabledStatus}
          />
        )}

        {status === "rejected" && <ErrorView error={error} />}

        {status === "pending" && <Loader />}

        {largeImgUrl && (
          <Modal
            largeImgUrl={largeImgUrl}
            imgDescr={imageDescription}
            onClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
