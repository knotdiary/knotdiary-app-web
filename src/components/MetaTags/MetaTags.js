import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { getDefaultPageMetadata } from 'lib/globalUtils';

const metadata = getDefaultPageMetadata();

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  author: PropTypes.string,
};

const defaultProps = {
  title: metadata.title,
  description: metadata.description,
  url: metadata.url,
  image: metadata.image,
  author: metadata.author,
};

const MetaTags = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="author" content={props.author} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={props.title} />
      <meta name="twitter:creator" content={props.author} />
      <meta name="twitter:image:src" content={props.image} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${metadata.url}${props.url}`} />
      <meta property="og:image" content={props.image} />
      <link rel="canonical" href={`${metadata.url}${props.url}`} />
    </Helmet>
  )
}

MetaTags.propTypes = propTypes;
MetaTags.defaultProps = defaultProps;

export default MetaTags;
