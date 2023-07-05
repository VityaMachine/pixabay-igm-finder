import React, { Component } from "react";

import styles from "./Modal.module.css";

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener("keydown", this.handleEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscClose);
  }

  handleEscClose = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    const { largeImgUrl, imgDescr, onClose } = this.props;

    return (
      <div className={styles.Overlay}>
        <div className={styles.Modal}>
          <img src={largeImgUrl} alt={imgDescr} />
        </div>
        <button className={styles.CloseBtn} onClick={onClose}></button>
      </div>
    );
  }
}
