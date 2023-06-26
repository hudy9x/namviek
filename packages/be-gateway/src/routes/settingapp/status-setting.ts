import { Response, Router } from "express";
import { StatusSetting } from "@prisma/client"
import { mdStatusSettingAdd, mdStatusSettingGetAll, mdStatusSettingDel } from "@shared/models";
import { AuthRequest } from '../../types';

const router = Router();

router.post('/api/status-setting' , async (req: AuthRequest, res) => {

 try {
  const body = req.body as StatusSetting;
  const { id } = req.authen;

  const result = await mdStatusSettingAdd({
   name: body.name,
   color: body.color,
   createdAt: new Date(),
   createdBy: id,
   updatedAt: null,
   updatedBy: null,
  })

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

router.get('/api/status-setting' , async (req, res) => {
 try {
  const result = await mdStatusSettingGetAll()

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

router.delete('/api/status-setting/:id' , async (req, res: Response) => {
 try {
   const id = req.params.id;
   const result = await mdStatusSettingDel(id);

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

