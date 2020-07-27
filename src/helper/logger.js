const { createLogger, format, transports, info } = require('winston'); // Importando algumas funcionalidades para o CONSOLE.LOG

// Customizando o log de erros ou etc
const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss', // Colocando data no terminal
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`) // info = o que está dentro do parênteses (console.log('teste'))
  ),
  transports: [new transports.Console()], // Colocando para aparecer no console do VSCODE
});

module.exports = logger;
