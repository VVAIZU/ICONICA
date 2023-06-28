//DEPENDENCIES SECTION
const express = require('express');
const boddParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bycrypt = require('bcrypt');
const db = require("./db.js");

const app = express();
//END OF DEPENDENCIES SECTION

app.use(boddParser.json());
app.use(boddParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//REG AND LOGIN
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = "INSERT INTO login_register.account (`username`, `password`) VALUES (?, ?)";
    const query2 = "SELECT * FROM login_register.account WHERE username = ?";

    db.query(query2, [req.body.username], async (err, result) => {
        if (err) { throw err; }
        if (result.length > 0) {
            res.send({ message: "Username already exists" });
        }
        if (result.length === 0) {
            const hashedPassword = await bycrypt.hash(req.body.password, 10);
            db.query(query, [username, hashedPassword], (err, result) => {
                if (err) { throw err; }
                res.send({ message: "Account created" })
            });
        }
    });
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { throw err; }
        if (!user) { res.send('No user exists'); }
        if (user) {
            req.login(user, (err) => {
                if (err) { throw err; }
                res.send("User logged in");
            })
        }
    })(req, res, next);
});

app.get('/getUser', (req, res) => {
    const user = {
        username: req.user.username,
        role: req.user.role
    };
    res.json(user);
});

app.get('/getUserInfo', (req, res) => {
    const userId = req.body.userId;

    db.query('SELECT * FROM login_register.product WHERE id = ?', [userId], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});

app.post('/updateUserRole', (req, res) => {
    const { userId, newRole } = req.body;

    const query = 'UPDATE login_register.account SET role = ? WHERE id = ?';

    db.query(query, [newRole, userId], (err, result) => {
        console.log('started ' + userId);
        if (err) {
            console.log(err);
            res.status(500).send('Failed to update user role');
        } else {
            res.send('User role updated successfully');
            console.log('User with id ' + userId + ' role updated');
        }
    });
});

app.get('/getProducts', (req, res) => {
    // Execute the SELECT statement to retrieve all rows from the "products" table
    db.query('SELECT * FROM login_register.product', (error, results) => {
        if (error) {
            console.error('Error executing SELECT statement: ', error);
            res.sendStatus(500);
            return;
        }
        // Send the retrieved rows as the response
        res.send(results);
    });
});

app.get('/getUsers', (req, res) => {
    db.query('SELECT * FROM login_register.account', (error, results) => {
        if (error) {
            console.error('Error executing SELECT statement: ', error);
            res.sendStatus(500);
            return;
        }
        // Send the retrieved rows as the response
        res.send(results);
    });
});

app.get('/getProduct', (req, res) => {
    const productId = req.body.productId;

    db.query('SELECT * FROM login_register.product WHERE id = ?', [productId], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});



app.post('/products/deleteProduct', (req, res) => {
    const productId = req.body.productId;

    db.query('DELETE FROM login_register.product WHERE id = ?', [productId], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Product deleted successfully");
        }
    });
});


app.put('/editproduct', (req, res) => {
    const ptitle = req.body.ptitle;
    const pdesc = req.body.pdesc;
    const pprice = req.body.pprice;
    const productId = req.body.productId;

    const query = `UPDATE login_register.product SET ptitle = ?, pdesc = ?, pprice = ? WHERE id = ?`;

    const values = [ptitle, pdesc, pprice, productId];
    console.log("PR ID: " + productId);
    db.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error updating product');
        } else {
            console.log('Product updated successfully ' + productId);
            res.send('Product updated successfully');
        }
    });
});
//     const query = `UPDATE login_register.product SET ptitle = '${ptitle}', pdesc = '${pdesc}', pprice = '${pprice}' WHERE id = ${productId}`;

//     console.log("in index: " + productId)
//     // Здесь выполните вашу логику для выполнения запроса на обновление строчки в базе данных
//     const values = [ptitle, pdesc, pprice, productId];

//     // Выполнение запроса на обновление строчки в базе данных
//     db.query(query, values, (error, results) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send('Error updating product');
//       } else {
//         console.log('Product updated successfully');
//         res.send('Product updated successfully');
//       }
//     });
// });


//PRODUCTS 
app.post('/new', (req, res) => {
    const ptitle = req.body.ptitle;
    const pdesc = req.body.pdesc;
    const pprice = req.body.pprice;

    const query = "INSERT INTO login_register.product (`ptitle`, `pdesc`, `pprice`) VALUES (?,?,?)"

    db.query(query, [ptitle, pdesc, pprice], (err, result) => {
        if (err) { throw err; }
        res.send({ message: "Product added to db" })
    });
});

// app.get('/products/:productId', (req, res) => {
//     const productId = req.params.productId;
//     // Здесь можно выполнить дополнительные действия, связанные с получением данных продукта по productId

//     // Затем рендерим страницу редактирования продукта и передаем ей productId
//     res.render('EditProduct', { productId });
// });

//RESPONSE TO SERVER DIRECT
app.get('/', (req, res) => {
    res.send('ServerPage');
});

//RUN
app.listen(3001, () => {
    console.log('Server started on port 3001');
});