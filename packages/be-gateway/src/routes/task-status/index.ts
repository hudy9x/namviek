import { Response, Router } from "express";
import { TaskStatus } from "@prisma/client"
import { authMiddleware } from '../../middlewares';
import { mdStatusAdd, mdStatusGetAll, mdStatusDel } from "@shared/models";
import { AuthRequest } from '../../types';

const router = Router();

router.use([authMiddleware]);

router.post('/task-status/:projectId' , async (req: AuthRequest, res) => {

 try {
  const body = req.body as TaskStatus;
  const data = {
    projectId: req.params.projectId,
    name: body.name,
    color: body.color,
    order: body.order
  }
  const result = await mdStatusAdd(data)

  res.json({
   status: 200,
   data: result
  })
 } catch (error) {
  const errorResponse = {
   status: 500,
   error: "Internal Server Error",
  }
  console.log(error)
  res.status(errorResponse.status).json(errorResponse)
 }
})

router.get('/task-status/:projectId' , async (req, res) => {
 try {
  const projectId = req.params.projectId
  const result = await mdStatusGetAll(projectId)

  res.json({
   status: 200,
   data: result
  })
 } catch (error) {
  const errorResponse = {
   status: 500,
   error: "Internal Server Error",
  }
  console.log(error)
  res.status(errorResponse.status).json(errorResponse)
 }
})

router.delete('/task-status/:id' , async (req, res: Response) => {
 try {
   const id = req.params.id
   const result = await mdStatusDel(id);

   res.json({
     status: 200,
     data: result
   });
 } catch (error) {
   const errorResponse = {
     status: 500,
     error: "Internal Server Error",
   };
   console.log(error);
   res.status(errorResponse.status).json(errorResponse);
 }
});

export default router;