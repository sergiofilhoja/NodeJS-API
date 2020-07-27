const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importanto Json Web Token

const userModel = require('../models/user'); // Importando banco de dados do USER

class UserController {
  // POST - Criar usuário
  async store(req, res) {
    const user = await userModel.create(req.body); // Passando o Json (req.body) para o create -> Create salva informação

    user.pass = undefined;

    console.log(user);
    return res.status(201).json({ user });
  }

  // DELETE -> Deletar usuário
  async destroy(req, res) {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    return res.json({ msg: 'Usuário deletado' });
  }

  // PUT -> Atualizar usuário
  async update(req, res) {
    const { id } = req.params;

    delete req.body.pass; // Remove o PASS do user

    const user = await userModel.findOneAndUpdate(id, req.body, {
      new: true, // Retorna a versão atualizada do Mongo
    });

    user.pass = undefined;

    return res.json({ user });
  }

  // GET com ID -> Listar 1 Usuário
  async show(req, res) {
    const { id } = req.params;
    const user = await userModel.findById(id); // Buscando determinado usuário com o ID
    return res.json({ user });
  }

  // GET com TODOS os usuários
  async index(req, res) {
    const users = await userModel.find(); // função Find -> Busca todos os usuários
    return res.json({ users });
  }

  // Validando, alterando (Senha, email e etc)
  async auth(req, res) {
    const { email, pass } = req.body;

    const user = await userModel.findOne({ email }); // email: email -> Chave e valor que quer buscar

    if (!user) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
    const correctUser = await bcrypt.compare(pass, user.pass); //  Comparando a HASH com a senha do usuário

    if (!correctUser) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    // Trabalhando com JWT
    const { _id: id } = user; // Mongo cria o usuário -> '_id'
    const token = jwt.sign({ id }, process.env.JWT_KEY, {
      expiresIn: '1d', // Determianando tempo de validade do Token
    }); // Criando Token

    return res.json({ token });
  }
}

module.exports = new UserController(); // Exportando com CLASSE
