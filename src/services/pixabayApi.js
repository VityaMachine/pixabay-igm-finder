function fetchImages(imageDescr, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${imageDescr}&page=${page}&key=18096168-1a47ddc4f6b43b68eb373a2c6&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`no ${imageDescr} images`));
  });
}

const apiServices = {
  fetchImages,
};

export default apiServices;


