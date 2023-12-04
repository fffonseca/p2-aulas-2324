const conexao = require("./conexao.db");

const Utilizador = function (dados) {
  (this.id = dados.id),
    (this.nome = dados.nome),
    (this.password = dados.password),
    (this.dta_registo = dados.dta_registo),
    (this.dta_atualizacao = dados.dta_atualizacao);
};

Utilizador.create = (novoUtilizador, result) => {
  conexao.query("INSERT INTO utilizador SET ?", novoUtilizador, (error, res) => {
    if (error) {
      console.log("DEBUG > ERRO - " + error.message);
      result(error, null);
      return;
    }

    result(null, { id: res.insertId, ...novoUtilizador });
  });
};

Utilizador.findById = (id, result) => {
  conexao.query("SELECT * FROM utilizador WHERE id = ?", id, (error, res) => {
      if (error) {
          console.log("Ocorreu um erro ", error);
          result(error, null);
          return;
      }

      if (res.length > 0) {
          console.log("Utilizador encontrado: ", res[0]);
          result(null, res[0]);
          return;
      }

      result({ result: "utilizador não encontrado"}, null);
  })
}

Utilizador.getAll = (result) => {
  conexao.query('SELECT * FROM utilizador', (error, res) => {
      if (error) {
          console.log("Ocorreu um erro ", error);
          result(error, null);
          return;
      }

      console.log("utilizadores: ", res);
      result(null, res);
  });
};

Utilizador.updateById = (id, utilizador, result) => {
  conexao.query(
    "UPDATE utilizador SET nome=?, password=?, dta_registo=?, dta_atualizacao=? WHERE id=?",
    [
      utilizador.nome,
      utilizador.password,
      utilizador.dta_registo,
      utilizador.dta_atualizacao,
      utilizador.id,
    ],
    (error, res) => {
      if (error) {
        console.log("Ocorreu um erro ", error);
        result(error, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ result: "não encontrado" }, null);
        return;
      }

      console.log("Utilizador atualizado: ", { id: id, ...utilizador });
      result(null, { id: id, ...utilizador });
    }
  );
};

Utilizador.remove = (id, result) => {
  conexao.query('DELETE FROM utilizador WHERE id=?', id, (error, res) => {
      if (error) {
          console.log("Ocorreu um erro ", error);
          result(error, null);
          return;
      }

      if (res.affectedRows == 0) {
          result({ result: "não encontrado"}, null);
          return;
      }

      console.log("Utilizador removido com sucesso! [ID: ", id, "]");
      result(null, res);
  });
};

Utilizador.removeAll = (result) => {
  conexao.query('DELETE FROM utilizador', (error, res) => {
      if (error == true) {
          console.log("Ocorreu um erro ", error);
          result(error, null);
          return;
      }

      console.log("Foram removidos ${res.affectedRows} utilizador(es).");
      result(null, res);
  });
};

module.exports = Utilizador;