import { NextResponse } from "next/server"
import { prisma } from './../../../../lib/prisma';


export async function GET(req: Request, res: Response) {
    const id = req.url.split("/blog/")[1]
    const post = await prisma.post.findFirst({
        where: {
            id
        }
    })
    if (!post) {
        return NextResponse.json({ message: "Not found" })
    }
    return NextResponse.json({ post, message: "url id get successfully" })
}


export async function PUT(req: Request) {
    const id = req.url.split("/blog/")[1]
    const { title, details } = await req.json()
    const post = await prisma.post.update({
        where: {
            id
        },
        data: {
            title,
            details
        }

    })
    return NextResponse.json({ post, message: "url id get successfully" })
}

export async function DELETE(req: Request) {
    const id = req.url.split("/blog/")[1]
    const post = await prisma.post.delete({
        where: { id }
    })
    return NextResponse.json({ post, message: "url id delete successfully" })
}