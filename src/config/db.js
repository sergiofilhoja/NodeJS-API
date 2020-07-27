// CONFIGURANDO BANCO DE DADOS

const mongoose = require('mongoose'); // Importando o MONGOOSE

// Trabalhando com conexão no Mongo
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, // -> Novo modelo de URL
  useUnifiedTopology: true,
  useFindAndModify: false,
}); // mongodb://servidor(local)/nomedoDB -> URL de COnexão

module.exports = mongoose;
