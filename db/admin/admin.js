import mongoose from 'mongoose'
import { MONGO } from '../../lib/env.js'
import { User } from '../../models/User.js'
import inquirer from 'inquirer'
import { msg } from '../../lib/util.js'

msg.big("dugAPI admin", {bg: "White", color: "red"})
msg.bg = 'Green', msg.color = 'white'
msg.draw(" Waiting for mongoose connection... ")
mongoose.connect(MONGO).then(()=>{mainMenu()})

const mainMenuCallbacks = {
    "Query database": () => {
        dbMenu()
    },
    "Quit": () => {
        msg.draw(" Goodbye :) ")
        process.exit()
    }
}

async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: [
                'Query database',
                'Quit'
            ],
            name: 'option'
        }
    ])
    mainMenuCallbacks[answers.option]()
}

const dbMap = {
    users: User
}

const dbMenuCallbacks = {
    "View all": async collection => {
        const Model = dbMap[collection]
        const results = await Model.find({})
        console.log(results)
    }
}

async function dbMenu() {
    let answers = await menuWithBack([
        {
            message: "Which operation?",
            type: "list",
            name: "operation",
            back: mainMenu,
            choices: [
                'View all'
            ]
        }
    ])
    if (!answers) return
    const {operation} = answers
    answers = await menuWithBack([
        {
            name: "collection",
            type: "list",
            message: "Which collection?",
            back: dbMenu,
            choices: [
                'users'
            ]
        }
    ])
    if (!answers) return
    const {collection} = answers
    await dbMenuCallbacks[operation](collection)
    mainMenu()
}

async function menuWithBack(prompt, backMsg = "⬅ Go back") {
    let name = prompt[0].name
    let back = prompt[0].back
    delete prompt[0].back
    prompt[0].choices.push(backMsg)
    let a = await inquirer.prompt(prompt)
    if (a[name] === backMsg) {
        back()
        return
    } else {
        return a
    }
}