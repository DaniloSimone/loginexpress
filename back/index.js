import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import usuarioModel from './schemas/usuarios.js'
dotenv.config()
let conex = process.env.MONGOURL
mongoose.connect(conex+"prueba").then(connect=>{
    console.log("Conectado a la bd")
}).catch(err=>{
    console.log(err)
});

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.post("/register", (req, res )=>{
    let body = req.body
    console.log(body)
    let usuario = new usuarioModel ({
        nombre:body.nombre,
        mail:body.mail,
        contrasena:body.contrasena,
    })
    usuario.save()
    res.send("hecho")
})


app.get("/login", async (req, res)=>{
    let busqueda = await usuarioModel.find({
        nombre: 'Danilo',
        contrasena: 'danilo'
    });
    console.log(busqueda)
    res.send(busqueda);
    
})
app.listen(3000,()=>{
    console.log("Servidor funcionando en puerto 3000");
})