const Product = require('../models/product.models');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Console } = require('console');

//multer upload storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './productImages/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }

});

const uploadStorage = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: function (req, file, callback) { //file filter
        if (['png', 'jpg', 'gif', 'jpeg'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('photo');


module.exports.registerProduct = (req, res, next) => {
    uploadStorage(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send("Too many image to upload.");
            } else {
                res.send(err)
            }
        } else {
            if (req.file == undefined) {

                res.status(404).json({ success: false, msg: 'File is undefined!', file: `productImages/${req.file}` })

            } else {

                var filepath = path.resolve('./productImages/' + req.file.filename);

                var product = new Product();
                product.name = req.body.name;
                product.price = req.body.price;
                product.category = req.body.category;
                product.description = req.body.description;
                product.size = req.body.size;
                product.color = req.body.color;
                product.photo = req.file.path;

                product.save((err, doc) => {
                    if (!err)
                        res.status(201).send({
                            message: "Product create successfully!!"
                        });
                    else {
                        fs.unlink(filepath)
                        if (err)
                            res.status(422).send(err);
                        else
                            return next(err);
                    }

                });

            }
        }
    });
}

module.exports.fetchProductByCategory = async (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);

        const offset = page ? page * limit : 0;

        console.log("offset = " + offset);

        let result = {};
        let category = req.query.category;
        
        if(category){
            result = await Product.find({ category: category}, { __v: 0 })
            .skip(offset)
            .limit(limit || -20)
            .sort({ $natural: -1 });
            const response = {
                "totalItems": result.length,
                "totalPages": Math.ceil(result.length / limit),
                "pageNumber": page,
                "pageSize": result.length,
                "Products": result
            };
            res.status(200).json(response);
        }else{
            result = await Product.find()
            .skip(offset)
            .limit(limit || -20)
            .sort({ $natural: -1 });
            const response = {
                "totalItems": result.length,
                "totalPages": Math.ceil(result.length / limit),
                "pageNumber": page,
                "pageSize": result.length,
                "Products": result
            };
            res.status(200).json(response);
        }
        
        

       
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }


}



module.exports.productDetail = async (req, res) => {
  Product.findById(req.params.id)
  .then(doc => {
    if (!doc) {
        return res.status(404).send({
            message: "Product not found with id " + req.params.id
        });
    }
    res.status(200).send(doc);
  })
  .catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "Product found with id " + req.params.id
        });
    }
    return res.status(500).send({
        message: "Could not delete Product with id " + req.params.id
    });
  }); 
}



