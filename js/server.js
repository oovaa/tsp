const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
require("dotenv").config()
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }

})

const Products = mongoose.model("Product", productSchema)

app.get("/api/products", async (req, res) => {
    const response = await Products.find()
    res.send(response)
})

app.get("/api/products/:id", async (req, res) => {
    const { id } = req.params
    const target = await Products.findById(id)
    res.send(target)
})

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params
    await Products.findByIdAndDelete(id)
    res.send("item deleted")
})

app.post("/api/products", async (req, res) => {
    const newProd = new Products({...req.body})
    await newProd.save()
    res.status(201).send("item created")
})

app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params
    const { title, price, image } = req.body
    await Products.findByIdAndUpdate(id, { ...req.body })
    res.send("item updated")
})

mongoose.connect(process.env.CONNECTION_STRING).then(res => {
    console.log("db connected")
})

app.listen(process.env.PORT, (req, res) => {
    console.log("api running on 8080")
})