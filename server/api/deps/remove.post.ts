import { z } from "zod"
import { useDB } from "~/server/db/db"

const bodySchema = z.object({
  boardId: z.string(),
  source: z.string(),
  dest: z.string()
})

export default defineEventHandler(async (e) => {
  checkAPIEnabled()
  
  const userId = await getUserId(e)
  const bodyParse = await readValidatedBody(e, (b) => bodySchema.safeParse(b))
  const bodyData = checkParseResult(bodyParse)

  const db = useDB(e)
  const boardInfo = await getBoardInfo(db, bodyData.boardId, userId)
  if (!canEdit(boardInfo.isOwner, boardInfo.publicPerms)) {
    throw createError({
      statusCode: 403,
      message: "You do not have permission to edit tasks on this board."
    })
  }

  const tasksInfo = await db.getTaskPair(bodyData.boardId, bodyData.source, bodyData.dest)
  if (tasksInfo.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: "One or more task IDs are invalid."
    })
  }

  let newNum: number
  if (tasksInfo[1].isComplete) {
    newNum = tasksInfo[0].numDeps
  } else if (tasksInfo[0].numDeps < 1) {
    newNum = 0
  } else {
    newNum = tasksInfo[0].numDeps - 1
  }

  await db.removeDeps(bodyData.source, bodyData.dest, newNum)
})
