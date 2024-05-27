const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");

const file = fs.readFileSync("./docs/swagger.yaml", "utf8");
const swaggerYaml = yaml.parse(file);

module.exports.swaggerDocs = (app, port) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerYaml));
    app.get("/api/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerYaml);
    });

    console.log(
        `📄 Version 1 Docs available at http://localhost:${port}/api/docs`,
    );
};
