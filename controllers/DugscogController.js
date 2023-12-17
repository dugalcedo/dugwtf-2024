import { caseInsCompare, caseInsIncludes, serverError, toDugId } from "../lib/util.js"
import { Router } from "express"
const DugscogController = Router()

DugscogController.get('/', (req, res) => {
    res.json(dugs)
})

DugscogController.get('/find', (req, res) => {
    try {
        let result = dugFinder(req.query)
        res.json(result)
    } catch (error) {
        serverError(req, res, error, "")
    }
})

function dugFinder(query) {
    let result = dugs
    Object.entries(query).forEach(([k,v]) => {
        // a handler for values that can contain a comma or dash
        const handleDynamic = (char, initVal, cb) => {
            if (initVal.includes(char)) {
                initVal.split(char).forEach((v)=>{cb(v)})
            } else {
                cb(initVal)
            }
        }
        switch(k) {
            case 'title':
            case 'artist':
                result = result.filter(d => caseInsCompare(d[k], v))
                break
            case 'id':
                result = result.filter(d => d.id === toDugId(v))
                break
            case 'released':
            case 'recorded':
                let validRec0 = []
                handleDynamic(',', v, w =>{
                    let validRec1 = []
                    handleDynamic('-', w, x =>{
                        let validRec2 = result.filter(d => {
                            return d[`${k}Years`].includes(Number(x))
                        })
                        validRec1.push(...validRec2)
                    })
                    validRec0.push(...validRec1)
                })
                result = validRec0
                break
            case 'credits':
                let validCred0 = []
                handleDynamic(',', v, w => {
                    validCred0.push(...result.filter(d => {
                        let personell = d.credits.map(c => c[1])
                        return caseInsIncludes(personell, w)
                    }))
                })
                result = validCred0
                break
        }
    })
    result.sort((a, b) => b.id.localeCompare(a.id))
    return result
}

export default DugscogController