import { local, prod } from 'AppEnv';

export const isWindowDefined = () => {
  return typeof window !== 'undefined';
}

export const getDefaultPageMetadata = () => {
  let baseUrl = local.appUrl;
  if (typeof (window) !== 'undefined') {
    baseUrl = window.appConfig.env === 'production' ? prod.appUrl : local.appUrl;
  } else {
    baseUrl = process.env.NODE_ENV === 'production' ? prod.appUrl : local.appUrl;
  }

  return {
    image: 'https://static01.nyt.com/images/2018/04/06/business/00NORDSTROM04/merlin_136473777_d26b2d93-14ef-4f7c-b7ce-47a5706882c4-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
    title: 'Sale Hunter',
    description: 'Welcome to Sale Hunter! The awesomest sale and discount finder.',
    url: baseUrl,
    author: 'Jumpy Jump',
  };
}
