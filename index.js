/* importar o módulo do EXPRESS */
const express = require("express");
const app = express(); //definir a nossa app em EXPRESS

//configurações do bootstrap
app.use(express.static("./assets"));
app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/js", express.static("./node_modules/jquery/dist"));

//definir o EJS
app.set("view engine", "ejs");
app.set("views", "./views");

//configurações do SERVER
app.set('port', process.env.port || process.env.PORT || 5000);
app.use(express.urlencoded({extended: true})); //permitir pedidos do exterior

const rotas = require("./routes/main.route");
app.use("/", rotas);

app.use("/", require("./routes/utilizador.route")); // <--- nova rota adicionar

//instancia e inicia o servidor
app.listen(app.get("port"), () => {
    console.log("Servidor iniciado na porta: "+ app.get("port"));
});