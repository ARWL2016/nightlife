function buildUrl(app, path, params) {
  return app.get('baseUrl') + path + Object
    .keys(params)
    .map(param => {
      return `${param}=${params[param]}`;
    })
    .join('&');
}

module.exports = { buildUrl };