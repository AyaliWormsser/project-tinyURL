import express from "express"
import LinkController from "./linkController.js"
const LinkRouter=express.Router()
LinkRouter.get('/',LinkController.getList)
LinkRouter.get('/:id',LinkController.getById)
LinkRouter.post('/',LinkController.add)
LinkRouter.put('/:id',LinkController.update)
LinkRouter.delete('/:id', LinkController.delete)
LinkRouter.get('/redirect/:id',LinkController.redirect)
LinkRouter.get('/:id/clicks', LinkController.getClick);
export default LinkRouter