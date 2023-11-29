
'use client'


import { Fragment, useEffect, useState } from "react";
import { Toaster, toast, } from 'react-hot-toast'
import { useRouter } from "next/navigation";

const updateBlog = async ({ id, title, details }: { id: string, title: string, details: string }) => {

    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: "PUT", body: JSON.stringify({
            title, details
        }),
        //@ts-ignore
        "Content-Type": "application/json"
    })
    return await res.json()

}

const deleteBlog = async (id: string) => {

    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: "DELETE", body: JSON.stringify({
        }),
        //@ts-ignore
        "Content-Type": "application/json"
    })
    return await res.json()

}
const getBlogById = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`)
    const data = await res.json()
    return data.post
}

const EditBlogPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [title, settitle] = useState<string>("")
    const [details, setdetails] = useState<string>("")

    useEffect(() => {
        toast.loading("Fetching data", { id: "1" })
        getBlogById(params.id).then((data) => {
            settitle(data.title)
            setdetails(data.details)
            toast.success("complete", { id: "1" })
        }).catch((err) => {
            console.log(err)
            toast.error("Something went Wrong", { id: "1" })
        })
    }, [])


    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        if (
            title !== "" && details !== ""
        ) {
            toast.loading("uploading", { id: '1' })
            await updateBlog({ id: params.id, title, details })
            toast.success("Blog posted succesfully", { id: '1' })
            router.push("/");
        }
        else {
            alert('please enter title and description')
        }
        settitle("")
        setdetails("")

    }
    const handleDelete = async () => {
        toast.loading("Deleting Post", { id: "2" })
        await deleteBlog(params.id)
        toast.success("Post delete succesfuly", { id: "2" })
        router.push('/')
    }

    return (
        <Fragment>
            <Toaster />
            <div className=" w-full m-auto flex flex-col my-4">
                <div className="flex flex-col mx-auto gap-4">
                    <div className="flex flex-col justify-center items-center m-auto ">
                        <p className="text-2xl text-slate-200 font-bold p-3">Edit a blog</p>
                        <form onSubmit={handleFormSubmit}>
                            <input type="text" placeholder="Enter Title" name="name"
                                className="w-full rounded-md px-4 py-2 my-2"
                                onChange={(e) => settitle(e.target.value)}
                                value={title} />
                            <textarea value={details} name="text area" placeholder="description"
                                onChange={(e) => setdetails(e.target.value)} rows={8}
                                className="rounded-md px-4 py-2 w-full  my-2" />

                            <button
                                className="font-semibold bg-slate-200 px-4 py-1 
                        shadwo-xl rounded-sm m-auto hover:bg-slate-100 "> Update
                            </button>

                        </form>
                    </div>
                    <div className="">
                        <button className="font-semibold bg-blue-300 px-4 py-1 
                                    shadwo-xl rounded-sm m-auto hover:bg-slate-100 "
                            onClick={handleDelete}> Delete
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditBlogPage;

