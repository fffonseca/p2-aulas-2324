const Utilizador = require("../models/utilizador.model");

//create
exports.create = (req, res) => {
  /********************************************************************
   * Verifica se os dados foram recebidos pelo controlador            *
   *******************************************************************/
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  /********************************************************************
   * Define um objeto 'Utilizador' com os dados recebidos                  *
   *******************************************************************/
  const utilizador = new Utilizador({
    nome: req.body.nome,
    password: req.body.password,
    dta_registo: req.body.dta_registo,
    dta_atualizacao: req.body.dta_atualizacao,
  });

  /********************************************************************
   * Efetua o pedido de criação do novo Utilizador ao model                *
   * (com os dados recebidos)                                         *
   *******************************************************************/
  Utilizador.create(utilizador, (error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      //console.log(data);
      return true;
    }
  });

  /*******************************************************************************
   * após criar o novo Utilizador, solicita todos os Utilizadores para enviar    *
   * para a página com a lista de Utilizadores                                   *
   *******************************************************************************/
  Utilizador.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao tentar aceder aos dados dos utilizadores. [" +
          error.message +
          "]",
      });
    } else {
      res.render("pages/index", { op: 1, success: true, dados: data });
    }
  });
};

//findAll
exports.findAll = (req, res) => {
  /********************************************************************
   * Efetua o pedido dos dados ao model                               *
   *******************************************************************/
  Utilizador.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      /********************************************************************
       * Executa o render() do template e envia os respetivos parâmetros   *
       ********************************************************************/
      res.render("pages/index", { op: 1, success: true, dados: data });
    }
  });
};

//nos slides chama-se findOne
exports.findOne = (req, res) => {
  //console.log("o id é " + req.params.id); //debug (esta linha de código pode ser apagada)

  /********************************************************************
   * Efetua o pedido dos dados ao model                               *
   *******************************************************************/
  Utilizador.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(400).send({
          success: false,
          message: "Utilizador com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados do Utilizador com o ID ${req.params.id}",
        });
      }
    } else {
      /********************************************************************
       * Executa o render() do template e envia os respetivos parâmetros   *
       ********************************************************************/
      res.render("pages/index", { op: 3, success: true, dados: data });
    }
  });
};

//update
exports.update = (req, res) => {
  /********************************************************************
   * Verifica se os dados foram recebidos pelo controlador            *
   ********************************************************************/
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  /********************************************************************
   * Efetua o pedido de atualização dos dados do Utilizador na BD          *
   ********************************************************************/
  Utilizador.updateById(
    req.body.id,
    new Utilizador(req.body),
    (error, data) => {
      if (error) {
        if (error.result === "não encontrado") {
          res.status(404).send({
            success: false,
            message:
              "Utilizador com o ID " +
              req.body.id +
              ", não encontrado. [" +
              error.message +
              "]",
          });
        } else {
          res.status(500).send({
            success: false,
            message:
              "Ocorreu um erro ao tentar atualizar os dados do Utilizador com o ID " +
              req.body.id +
              ". [" +
              error.message +
              "]",
          });
        }
      } else {
        return true; //operação executada com sucesso
      }
    }
  );

  /********************************************************************
   * após atualizar os dados do Utilizador, solicita todos os dados para   *
   * enviar para a página com a lista de Utilizadors                       *
   ********************************************************************/
  Utilizador.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro a aceder aos dados dos utilizadores. [" +
          error.message +
          "]",
      });
    } else {
      res.render("pages/index", { op: 1, success: true, dados: data });
    }
  });
};

//delete
exports.delete = (req, res) => {
  Utilizador.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message: "Utilizador com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados dos utilizadores com o ID ${req.params.id}",
        });
      }
    } else {
      return true; //operação executada com sucesso
    }
  });

  /********************************************************************
   * após apagar os dados do Utilizador, solicita os dados atuais          *
   * para enviar para a página com a lista de Utilizadors                  *
   ********************************************************************/
  Utilizador.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao adquirir os dados dos Utilizadors. [" +
          error.message +
          "]",
      });
    } else {
      res.render("pages/index", { op: 1, success: true, dados: data });
    }
  });
};

//deleteAll
exports.deleteAll = (req, res) => {
  Utilizador.removeAll((error, data) => {
    if (error) {
      res
        .status(500)
        .send({ success: false, message: "Conteúdo inexistente." });
    } else {
      /* CÓDIGO ANTIGO
      res.status(200).send({
        success: true,
        message: "Todos os Utilizadors foram eliminados com sucesso.",
      }); */

      return true; //operação executada com sucesso
    }
  });

  /********************************************************************
   * após apagar os dados dos Utilizadors, solicita os dados atuais        *
   * para enviar para a página com a lista de Utilizadors                  *
   * (previsivelmente não haverá Utilizadors para listar)                  *
   ********************************************************************/
  Utilizador.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao adquirir os dados dos Utilizadors. [" +
          error.message +
          "]",
      });
    } else {
      res.render("pages/index", { op: 1, success: true, dados: data });
    }
  });
};

//mostra a UI de criado com sucesso
exports.show = (req, res) => {
  res.render("pages/index", { op: 2, success: true });
};