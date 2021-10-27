const express = require('express');
const http = require('http');
const cors = require('cors');
const { Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('js-Todo', 'postgres', '1235', {
    host: 'localhost',
    dialect: 'postgres'
});

class ToDo extends Model {}
//class User extends Model {}
//define говно
ToDo.init({
    title: {
      type: DataTypes.STRING,
    },
    description : {
      type: DataTypes.STRING,
    }
 }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'ToDo' // We need to choose the model name
  });



sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original_URL = ', req.origialUrl);
    console.log('METHOD = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('InSecure = ', req.secure);
    console.log('BODY', req.body);
    console.log('QUERY', req.query);
    next();
});
//Create
app.put ( '/put-todos', (req, res) => {
    ToDo.create({
        title: req.body.title,
        description: req.body.description,
      })
        .then((ToDo) => {
          res.status(200).json(ToDo);
        })
        .catch(function (err) {
          res.status(200).json("О НЕТ");
          console.log("create failed with error: " + err);
          return 0;
        });
    });

//Read
app.get ('/get-todos', (req, res) => {
    ToDo.findAll().then(ToDo => {
        res.status(200).json({ToDo});
    }).catch(function (err) {
        console.log("findAll failed with error: " + err);
        return null;

    });
});
//Read:index
app.get ('/get-todos:index', (req, res) => {
    const id = req.params.index;
    ToDo.findByPk(id
    ).then(User => {
        res.status(200).json({ToDo});
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
});
// //Update
// app.post('/post-todos', (req, res) => {
//     let str = req.body.a;
//     array.push(str);
//     localStorage.setItem('array', array);
//     res.json({str});
// })




app.post('/patch-todos/:index', (req, res) => {
    const id = req.params.index;
    ToDo.update({title: req.body.title, description: req.body.description},
       { where: { id: id } }
   ).then(() => {
        res.status(200).json({message: "OK"});
   }).catch(function (err) {
    res.status(500).json({message: "Пипяо"});
       console.log("update failed with error: " + err);
       return 0;
 });

});



app.delete('/delete-todos', (req, res) => {

})




app.delete('/delete-todos:index', (req, res) => {
    const id = req.params.index;
    ToDo.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({
            message: `Объект ${id} удалён`
        });
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
});















http.createServer(app).listen(3000, () => {
    console.log('Server is working on port 3000');
});