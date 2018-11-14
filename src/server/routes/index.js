const path = require('path');
const fs = require('fs');
const React = require('react');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';

const { default: configureStore } = require('../../src/store');
const { default: App } = require('../../src/App');
import Theme from '../../src/theme';
const logger = require('../logger');

const appUrl = process.env.NODE_ENV === 'production' ? prod.appUrl : local.appUrl;

const onLoad = (req, res) => {
  logger.info(`ON PAGE LOAD - ${req.url}`);
  const filePath = path.resolve(__dirname, '../../..', 'build', 'index.html');

  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    logger.info('INIT READ FILE');

    if (err) {
      logger.error(err);
      return res.status(404).end();
    }

    let context = {};
    logger.info(`INIT RESPONSE`);
    generateResponse(context, htmlData, req, res);
  });
};

const getPostId = (urlRequest) => {
  const result = urlRequest.match(/post\/(.*)/);
  if (result && result.length > 0) {
    return result[1];
  }

  return null;
}

const generateResponse = (context, htmlData, req, res) => {
  logger.info('GENERATING RESPONSE');

  try {
    const store = configureStore(context);
    const reduxState = store.getState();
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();
    const generateClassName = createGenerateClassName();
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={Theme} sheetsManager={sheetsManager}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </StaticRouter>
      </Provider>
    );
    const css = sheetsRegistry.toString();

    if (!context) {
      context = {};
    }

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url);
    } else {
      // we're good, send the response
      const reduxStateJson = JSON.stringify(reduxState).replace(/"/g, "'");;
      const renderedApp = htmlData
        .replace(/{{NODE_ENV}}/g, process.env.NODE_ENV)
        .replace(/{{APP_HTML}}/g, markup)
        .replace(/{{SERVER_STORE}}/g, reduxStateJson);

      const appWithMetaTags = attachMetaTags(renderedApp);
      res.send(appWithMetaTags);
    }
  } catch (error) {
    logger.error(error.stack);
  }
}

const attachMetaTags = (html, title, description, author, url, img) => {
  logger.info(`ATTACHING METATAGS title: ${title} | description: ${description} | author: ${author} | url: ${url} | img: ${img}`);
  const defaultImage = "https://static01.nyt.com/images/2018/04/06/business/00NORDSTROM04/merlin_136473777_d26b2d93-14ef-4f7c-b7ce-47a5706882c4-articleLarge.jpg?quality=75&auto=webp&disable=upscale";
  const defaultTitle = "Knot Diary";
  const defaultDescription = "Your all in one wedding planner!";
  const defaultAuthor = "Eut Technologies";
  const defaultUrl = appUrl;

  return html
    .replace(/{{META_TITLE}}/g, title || defaultTitle)
    .replace(/{{META_IMG}}/g, img || defaultImage)
    .replace(/{{META_DESCRIPTION}}/g, description || defaultDescription)
    .replace(/{{META_AUTHOR}}/g, author || defaultAuthor)
    .replace(/{{META_URL}}/g, url || defaultUrl);
}

module.exports = onLoad;
