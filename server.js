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

  app.get('/product', (req, res) => {
    delayed(() => {
      sequelize
        .query('SELECT * FROM product ORDER BY id DESC', {
          type: sequelize.QueryTypes.SELECT,
        })
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  });

  app.get('/product/:id', (req, res) => {
    delayed(() => {
      sequelize
        .query(`SELECT * FROM product WHERE id = ${req.params.id}`, {
          type: sequelize.QueryTypes.SELECT,
        })
        .then((result) => {
          res.status(200).send(result[0]);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send('Product not found');
        });
    }, 1000);
  });

  // TODO: 💩 cart 관련 라우팅이 좀...
  app.get('/cart/:id', (req, res) => {
    delayed(() => {
      sequelize
        .query(
          `SELECT ci.*, p.price
           FROM cartItem ci JOIN product p ON ci.productId = p.id 
           WHERE ci.cartId = ${req.params.id}`,
          {
            type: sequelize.QueryTypes.SELECT,
          },
        )
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send('Cart not found');
        });
    }, 300);
  });

  app.post('/cart/:id', (req, res) => {
    delayed(async () => {
      try {
        const { quantity, productId } = req.body;
        const cartId = req.params?.id ?? 0;

        const cartResult = await sequelize.query(
          `SELECT * FROM cart WHERE id = ${cartId}`,
          {
            type: sequelize.QueryTypes.SELECT,
          },
        );

        if (!cartResult.length) {
          const insertCartResult = await sequelize.query(
            `INSERT INTO cart (id) VALUES (DEFAULT)`,
            {
              type: sequelize.QueryTypes.INSERT,
            },
          );
          cartId = `${insertCartResult[0]}`;
        }

        await sequelize.query(
          `INSERT INTO cartItem (cartId, quantity, productId) VALUES (${cartId}, ${quantity}, ${productId})`,
          { type: sequelize.QueryTypes.INSERT },
        );

        res.status(201).send({ cartId });
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    }, 300);
  });

  app.patch('/cart/:id', (req, res) => {
    delayed(async () => {
      try {
        const { quantity, productId } = req.body;
        const cartId = req.params?.id ?? 0;

        await sequelize.query(
          `UPDATE cartItem SET quantity = ${quantity} WHERE cartId = ${cartId} AND productId = ${productId}`,
          { type: sequelize.QueryTypes.UPDATE },
        );

        res.status(200).send('updated');
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    }, 300);
  });

  app.delete('/cart/:id', (req, res) => {
    delayed(async () => {
      try {
        const { id } = req.params;
        const { itemIds } = req.query;

        await sequelize.query(
          `DELETE FROM cartItem WHERE cartId = ${id} AND id IN (${itemIds})`,
          { type: sequelize.QueryTypes.DELETE },
        );

        res.status(200).send('deleted');
      } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    }, 300);
  });

  app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
  });
}

init();
