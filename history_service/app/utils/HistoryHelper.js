import e from "express"
import prisma from "../database/prisma.js"

export default class HistoryHelper {
    static async create(data) {
        if (data) return await prisma.userHistoryEntry.create({
            data: {
                text: data.text,
                user_id: data.user.id,
                is_fake: Boolean(data.prediction),
            }
        })
        else return false
    }
}