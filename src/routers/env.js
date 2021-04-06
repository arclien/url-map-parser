const getAppEnv = () => {
  return process.env.REACT_APP_ENV;
};

// @TODO
const getApiEndPoint = () => {
  switch (getAppEnv()) {
    case 'production':
      return '';
    case 'development':
    default:
      return '';
  }
};

const getUrlMapParserMapUrl = () => {
  switch (getAppEnv()) {
    case 'production':
      return '';
    case 'development':
    default:
      return '';
  }
};

export { getAppEnv, getApiEndPoint, getUrlMapParserMapUrl };
