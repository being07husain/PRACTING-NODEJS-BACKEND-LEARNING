const productsData = require('../data/products.json');
const Product = require('../middleware/product');
const db = require('../utils/database');
exports.home = (req, res, next) => {
    res.render('home');
    console.log('HOME PAGE');
};
exports.login = (req, res, next) => {
    res.render('login');
    console.log('LOGIN PAGE');
};
exports.postlogin = (req, res, next) => {
    res.cookie('isLoggedin', true);
    res.redirect('/home');
    console.log('homepageafterlogin');
}
exports.logout = (req, res, next) => {
    res.cookie('isLoggedin', false);
    res.redirect('/');
    console.log('logout');

}
exports.product = (req, res, next) => {
    Product.fetchAll().then((products) => {
        res.render('product', { products });
        console.log('PRODUCT PAGE');
    }).catch((err) => {
        console.log(err);
        res.send("Error fetching products");
    });
};

exports.sellProductPage = (req, res) => {
    res.render('sell');
    console.log("SELL PAGE");
};

exports.addProduct = async (req, res) => {
    console.log("ADD PRODUCT ROUTE HIT");
    console.log(req.body)
    const { name, category, price, quantity, description } = req.body;

    const product = new Product(
        name,
        category,
        Number(price),
        Number(quantity),
        description
    );
    try {
        await product.save();
        console.log("Product saved successfully");
        res.redirect('/products');

    } catch (err) {
        console.log(err);
        res.send("Error saving product");
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log("DELETE PRODUCT ROUTE HIT");
    console.log("Product ID:", id);
    try {
        const result = await Product.deleteById(id);
        console.log("Delete result:", result)
        res.redirect('/manageproducts');
    } catch (err) {
        console.log("DELETE ERROR:", err);
        res.send("Error deleting product");

    }

};
exports.manageProducts = (req, res, next) => {

    Product.fetchAll()
        .then(products => {

            res.render('manageProducts', {
                products: products
            });

        })
        .catch(err => {
            console.log(err);
        });

};
// Display the edit product page
exports.getEditProduct = (req, res, next) => {
    const productId = req.params.id;

    Product.findById(productId)
        .then(product => {
            res.render('edit-product', {
                product: product
            });
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};


// Update the product
exports.postEditProduct = (req, res, next) => {
    const productId = req.params.id;

    Product.updateById(productId, {
        name: req.body.name,
        category: req.body.category,
        price: Number(req.body.price),
        quantity: Number(req.body.quantity),
        description: req.body.description
    })
        .then(() => {
            res.redirect('/edit-product/' + productId);
        })

        .catch(err => {
            console.log(err);
            next(err);
        });
};