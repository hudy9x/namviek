// import { ProjectView } from "@prisma/client"
// import { pmClient, projectViewModel } from "./_prisma";
import mongoose, { ClientSession } from "mongoose";
import { projectViewModel, IProjectViewField, castToObjectId } from "../schema";

export default class ProjectViewRepository {
  async create(data: Omit<IProjectViewField, 'id' | 'projectId'> & { projectId: string }) {

    const session = await mongoose.startSession();
    const res = await session.withTransaction(async (session: ClientSession) => {
      // Find the latest order
      const latestOrder = await projectViewModel
        .findOne({
          projectId: castToObjectId(data.projectId)
        })
        .sort({ order: -1 })
        .session(session);

      // Calculate next order
      const nextOrder = latestOrder ? latestOrder.order : 0;
      data.order = nextOrder ? nextOrder + 1 : 1;
      console.log('data.order', data.order);

      // Create new record within transaction
      const result = await projectViewModel.create([data], { session });

      return result[0];
    });

    await session.endSession();
    return res;











    // const res = await pmClient.$transaction(async tx => {
    //
    //   const latestOrder = await tx.projectView.findFirst({
    //     where: {
    //       projectId: data.projectId,
    //     },
    //     orderBy: {
    //       order: 'desc'
    //     }
    //   })
    //
    //   const nextOrder = latestOrder ? latestOrder.order : 0
    //   data.order = nextOrder ? nextOrder + 1 : 1
    //   console.log('data.order', data.order)
    //   const result = await tx.projectView.create({
    //     data
    //   })
    //
    //   return result
    // })
    //
    // return res
  }

  async getOne(id: string) {
    return projectViewModel.findById(id)
  }
}
