const express = require("express");
const router = express.Router();

const utilizador = require('../controllers/utilizador.controller');

router.post("/utilizadores/create", utilizador.create);
router.get('/utilizadores/create', utilizador.show); //<--- rota de novo utilizador

router.get('/utilizadores', utilizador.findAll);

router.get("/utilizadores/:id", utilizador.findOne); //<--- rota antes da edição
router.post("/utilizadores/update", utilizador.update);

router.get("/utilizadores/delete/:id", utilizador.delete);
router.get("/utilizadores/delete", utilizador.deleteAll);

module.exports = router;