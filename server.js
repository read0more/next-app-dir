const { Sequelize } = require('sequelize');
const express = require('express');
const swagger = require('./swagger')

const sequelize = new Sequelize('mysql://root@localhost:3306/ecommerce') // Example for postgres

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

async function init() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      const app = express();
      app.use(express.json());

      /**
 * @openapi
 * /:
 *   get:
 *     description: 테스트용
 *     responses:
 *       200:
 *         description: 그냥 hello world response
 */
      app.get('/', (req, res) => {
        res.send('Hello World!');
      });
      
      /**
 * @openapi
 * /user/{id}:
 *   get:
 *     description: 테스트용
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: user response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int64
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                   format: int32
 */

app.get('/user/:id', (req, res) => {
  res.send({
    id: parseInt(req.params.id), // Ensure id is converted to an integer
    name: '홍길동',
    age: 30,
  });
});

/**
 * @openapi
 * /test:
 *   post:
 *     description: 테스트용
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               yktest:
 *                 type: string
 *     responses:
 *       200:
 *         description: test response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 yktest:
 *                   type: string
 */

app.post('/test', (req, res) => {
  res.send({ yktest: req.body.yktest });
});
  

      swagger(app);

      app.listen(8080, () => {
        console.log('Example app listening on port 8080!');
      });
}

init();