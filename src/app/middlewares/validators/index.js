const yup = require('yup');

class Validators {
  // Validando no método POST
  async userCreateValidator(req, res, next) {
    const userMask = yup.object().shape({
      // Montando um JSON e validando tipo de string
      name: yup.string().required(), // Name, do tipo String e o valor é obrigatório!
      email: yup.string().email().required(),
      pass: yup.string().required(),
    });

    const userValidate = await userMask.isValid(req.body); // Validando dados do req.body pelo YUP

    if (!userValidate) {
      // Validando para ver se o Usuário existe
      return res.status(400).json({ msg: 'Dados incorretos' });
    }

    next();
  }

  // Validando no método PUT
  async userUpdateValidator(req, res, next) {
    const userMask = yup.object().shape({
      // Montando um JSON e validando tipo de string
      name: yup.string().required(), // Name, do tipo String e o valor é obrigatório!
      email: yup.string().email().required(),
    });

    const userValidate = await userMask.isValid(req.body, { strict: true }); // Validando dados do req.body pelo YUP

    if (!userValidate) {
      // Validando para ver se o Usuário existe
      return res.status(400).json({ msg: 'Dados incorretos' });
    }

    next();
  }
}

module.exports = new Validators();
