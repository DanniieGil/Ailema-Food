function setHeaders(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://143.198.164.43'); // ! ACTUALIZAR CON EL DOMINIO DEL FORNTEND
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  };

  module.exports = setHeaders;