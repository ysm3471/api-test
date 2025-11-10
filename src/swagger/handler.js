const path = require("path");

const swaggerTags = [
  {
    name: "User",
    description: "사용자 API",
  },
  {
    name: "Test",
    description: "테스트 API",
  }
];


const swaggerServers = [
  {
    url: "http://ec2-3-25-189-251.ap-southeast-2.compute.amazonaws.com",
    description: "ec2 서버",
  },
  {
    url: "http://localhost:3000",
    description: "로컬 서버",
  }
];

const swaggerSecurityScheme = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
    description: "JWT 토큰을 입력해주세요.",
  },
};

const swaggerComponents = {
  JWT_ERROR: {
    description: "jwt token Error",
    type: "object",
    properties: {
      401: {
        type: "Error token 변조 에러",
      },
    },
  },
  SERVER_ERROR: {
    description: "SERVER ERROR",
    type: "object",
    properties: {
      500: {
        type: "Internal Error",
        code: 800,
      },
    },
  },
  DB_ERROR: {
    description: "SERVER DB ERROR",
    type: "object",
    properties: {
      500: {
        type: "DB ERROR",
        code: 500,
      },
    },
  },
};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and Nestjs with Swagger"
    },
    servers: swaggerServers,
    components: {
      securitySchemes: swaggerSecurityScheme,
      schemas: swaggerComponents,
    },
    tags: swaggerTags,
  },
  apis: [path.join(__dirname, "./routes/*.js")],
};

module.exports = options;