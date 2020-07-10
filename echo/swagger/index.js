const swaggerJSDoc = require("swagger-jsdoc");
var path = require("path");

const swaggerDefinition = {
  swagger: "2.0",

  info: {
    title: "ECHO API",
    version: "1.0.0",
    description: "This is a ECHO backend server.",
    termsOfService: "http://swagger.io/terms/",
  },

  host: "/",
  schemes: process.env.RUNNIG_ENV == "server" ? "https" : "http",

  tags: ["test"],

  securityDefinitions: {
    tokenstore_auth: {
      type: "oauth2",
      authorizationUrl: "http://tokenstore.swagger.io/oauth/dialog",
      flow: "implicit",
      scopes: {
        "write:tokens": "modify tokens in your account",
        "read:tokens": "read your tokens",
      },
    },
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
  },

  externalDocs: {
    description: "Find out more about Swagger",
    url: "http://swagger.io",
  },
};

const options = {
  swaggerDefinition,
  apis: [__dirname + "/*"],
};

module.exports = () => {
  console.log(swaggerJSDoc(options));
  return swaggerJSDoc(options);
};
