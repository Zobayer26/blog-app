
'use client'


import { Fragment, useState } from "react";
import { Toaster, toast, } from 'react-hot-toast'
const addBlog = async ({ title, details }: { title: string, details: string }) => {

    const res = await fetch("http://localhost:3000/api/blog", {
        method: "POST", body: JSON.stringify({
            title, details
        }),
        //@ts-ignore
        "Content-Type": "application/json"
    })
    return await res.json()

}

const AddBlogPage = () => {

    const [title, settitle] = useState<string>("")
    const [details, setdetails] = useState<string>("")
    const handleFormSubmit = async (e: any) => {

        e.preventDefault();
        if (
            title !== "" && details !== ""
        ) {
            toast.loading("uploading", { id: '1' })
            await addBlog({ title, details })
            toast.success("Blog posted succesfully", { id: '1' })
        }
        else {
            alert('please enter title and description')
        }
        settitle("")
        setdetails("")

    }

    return (
        <Fragment>
            <Toaster />
            <div className=" w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto ">
                    <p className="text-2xl text-slate-200 font-bold p-3">Add a blog</p>
                    <form onSubmit={handleFormSubmit}>
                        <input type="text" placeholder="Enter Title" name="name"
                            className="w-full rounded-md px-4 py-2 my-2"
                            onChange={(e) => settitle(e.target.value)}
                            value={title} />
                        <textarea value={details} name="text area" placeholder="description"
                            onChange={(e) => setdetails(e.target.value)}
                            className="rounded-md px-4 py-2 w-full  my-2" />
                        <button className="font-semibold bg-slate-200 px-4 py-1 
                        shadwo-xl rounded-sm m-auto hover:bg-slate-100 ">
                            submit</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AddBlogPage;