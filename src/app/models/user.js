const bcrypt = require('bcryptjs');
const mongoose = require('../../config/db'); // Importando configurações do DB

const UserSchema = mongoose.Schema(
  // Configurando o banco de dados com Name, Email, Senha e etc
  {
    name: {
      type: String, // Tipo String
      require: true, // Dado obrigatório -> Todo usuário tem que ter nome
    },

    email: {
      type: String,
      require: true,
    },

    pass: {
      type: String,
      require: true,
    },
  }
);

// Utilizando o bcrypt
UserSchema.pre('save', async function (next) {
  const hashPass = await bcrypt.hash(this.pass, 10);
  this.pass = hashPass;
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
