const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')


//instance of Express Server
const app = express();




//import my Models
const projectModel = require('./data/helpers/projectModel')
const actionModel = require("./data/helpers/actionModel")


//express Middleware anf third-party middleware
app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Welcome to MY Sprint Challenge for Node And Express');
});

//CRUD API for ProjectModel
app.get('/projects', (req, res) => {
    const projectsData = projectModel.get()
    projectsData
        .then(response =>{
            res.status(200).json(response);
        })
        .catch( err => {
            res.status(500).json({ error : 'there was error fetching projects'});
        })
});

app.get('/projects/:id', (req, res) => {
    const { id } = req.params
    projectModel.getProjectActions(id)
        .then(response =>{
            res.status(200).json(response);
        })
        .catch( err => {
            res.status(500).json({ error : 'there was error fetching projects Actions '});
        })
});

app.post('/projects', (req, res) => {
    const { name , description } = req.body
    const project = { name , description }

    if(!name || !project){
        res.status(400).json({error : 'Please Provide Project name and Description'})
    }
    else{
        projectModel.insert(project)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(500).json({ error : 'Sorry Something went Wrong and Project not Created'});
            })
    }

});

app.put('/projects/:id', (req, res) => {
 const { id } = req.params
 const {name, description} = req.body
 const project = {name, description}

 if(!name || !project){
    res.status(400).json({error : 'Please Provide Project name and Description'})
    }
    else {
        projectModel.update(id,project)
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json({error :"Sorry Error while updating project"})
            })
    }
});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params
    projectModel.remove(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch( err =>{
            res.status(500).json({error : "Sorry Project could not be deleted"})
        })

});


app.listen(6000, () => {
    console.log('Example app listening on port 6000!');
});

//Run app, then load http://localhost:port in a browser to see the output.


