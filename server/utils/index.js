function buildUrl(baseUrl, path, params) {
  return baseUrl + path + Object
    .keys(params)
    .map(param => {
      return `${param}=${params[param]}`;
    })
    .join('&');
}

module.exports = { buildUrl };