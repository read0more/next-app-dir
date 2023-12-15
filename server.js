const { Sequelize } = require('sequelize');
const express = require('express');
const cors = require('cors');

const sequelize = new Sequelize('mysql://root@localhost:3306/ecommerce'); // Example for postgres

async function init() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  function delayed(fn, ms) {
    new Promise((resolve) => {
      setTimeout(() => {
        fn();
        resolve();
      }, ms);
    });
  }

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.post('/product', (req, res) => {
    delayed(() => {
      const { name, price, imageUrl, description } = req.body;

      sequelize
        .query(
          `INSERT INTO product (name, price, image_url, description) VALUES ('${name}', ${price}, '${imageUrl}', '${description}')`,
          { type: sequelize.QueryTypes.INSERT },
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });

      res.status(201).send('Product created');
    }, 1000);
  });

  app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
  });
}

init();
