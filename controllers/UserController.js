const { Router } = require("express")
const { missingFields, serverError } = require("../lib/util.js")
const { User } = require("../models/User.js")

const UserController = Router()

UserController.get('/', async (req, res) => {
    try {
        const match = await User.findOne({u: req.body.u, p: req.body.p})
        if (match) {
            res.json(match)
        } else {
            res.status(404).send("User not found.")
        }
    } catch (error) {
        serverError(req, res, error, "Mongoose error when attempting User.findOne().")
    }
})

UserController.post('/', async (req, res) => {
    // validate body
    if (missingFields(req.body, ['u', 'p', 'p2'])) {
        res.status(400).send("Missing fields.")
    }
    if (req.body.p !== req.body.p2) {
        res.status(400).send("Passwords do not match.")
    }

    // try to find a match
    try {
        const match = await User.findOne({u: req.body.u})
        if (match) {
            res.status(400).send("User already exists.")
        } else {
            const user = new User({u: req.body.u, p: req.body.p})

            // try to save new user
            try {
                await user.save()
                res.status(200).send("Saved new user.")
            
            // failed to save user
            } catch (error) {
                serverError(req, res, error, "Mongoose error when attempting user.save().")
            }
        }

    // failed to query db
    } catch (error) {
        serverError(req, res, error, "Mongoose error when attempting User.findOne().")
    }
})

export default UserController