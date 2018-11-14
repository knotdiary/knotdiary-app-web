import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { FiImage } from 'react-icons/fi';

import './ImageSlider.scss';

const propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  childrenClassName: PropTypes.string,
  responsiveSettings: PropTypes.arrayOf(PropTypes.object),
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  arrows: PropTypes.bool,
  showEmptyImage: PropTypes.bool,
  onImageClick: PropTypes.func,
};

const defaultProps = {
  childrenClassName: 'image-slider--item',
  slidesToShow: 5,
  slidesToScroll: 5,
  arrows: true,
  responsiveSettings: [],
  showEmptyImage: true,
  onImageClick: () => {},
};

const getImageBg = (imageUrl) => {
  return {
    backgroundImage: `url(${imageUrl})`,
  };
};

const onImageClick = (ev, index, onClick) => {
  if (!ev || !ev.preventDefault || !onClick) {
    return;
  }

  ev.preventDefault();
  onClick(index);
}

const ImageSlider = (props) => {
  const settings = {
    dots: props.images && props.images.length > 7 ? false : true,
    infinite: false,
    arrows: props.arrows,
    slidesToShow: props.slidesToShow,
    slidesToScroll: props.slidesToScroll,
    responsive: props.responsiveSettings,
  };

  if ((!props.images || props.images.length === 0) && props.showEmptyImage) {
    return (
      <div className="image-slider">
        <div className="image-slider--no-images">
          <FiImage className="image-slider--no-images-icon" />
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <Slider className="image-slider" {...settings}>
      {
        props.images.map((image, index) =>
          <div role="menuitem" onClick={(ev) => onImageClick(ev, index, props.onImageClick)} key={index}>
            <div className={props.childrenClassName} style={getImageBg(image)} />
          </div>
        )
      }
    </Slider>
  )
};

ImageSlider.propTypes = propTypes;
ImageSlider.defaultProps = defaultProps;

export default ImageSlider;
