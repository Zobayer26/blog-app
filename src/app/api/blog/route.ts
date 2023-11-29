import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req: Request, res: Response) {

   const post = await prisma.post.findMany()
   return NextResponse.json({ post, message: "succesfully get post" })
}


export async function POST(req: Request, res: Response) {
   const { title, details } = await req.json() //send data from body
   const post = await prisma.post.create({
      data: {
         title, details
         // title:"Zahid",
         // details:"new details"
      }
   })
   return NextResponse.json({ post, message: "succesfully get post" })
}