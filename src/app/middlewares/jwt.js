// Trabalhando com Json Web Token
const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // Importando o promisify
const logger = require('../../helper/logger');

module.exports = async (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não enviado' });
  }

  const jwtParts = authHeader.split(' '); // Split aponta uma string que havera corte

  if (jwtParts.length !== 2) {
    return res.status(401).json({ error: 'Token com formato inválido' });
  }

  const [scheme, token] = jwtParts;

  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Token com prefixo inválido' });
  }

  // Validando requisições do token ( escrita, Id, tempo e etc )
  try {
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      process.nextTick.JWT_KET
    );
    return next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({ error: 'Token com problema' });
  }
};
