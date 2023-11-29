import { fetchBlogData } from "@/lib/Fetch";
import Link from "next/link";


const Home = async () => {
  const blogPost = await fetchBlogData()
  // console.log(blogPost)
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <div className=" bg-slate-200  shadow-sm text-center
      text-3xl p-4 font-bold">
        Blog app using nextjs</div>
      <div className="flex mx-auto rounded-md  bg-slate-200">
        <Link href="/blog/add"
          className="md:w-[280px] md:px-4 text-center  p-2"
        >Add  new blog</Link>
      </div>
      <div className=" w-full flex flex-col justify-center items-center">
        {
          blogPost.map((item: any) => (
            <div className="w-3/4 p-4 rounded-sm mx-3 my-2 bg-slate-200 flex flex-col justify-center">
              <div className=" flex justify-between items-center">
                <h2 className=" text-xl font-semibold">{item.title}</h2>
                <Link href={`/blog/edit/${item.id}`} className=" bg-slate-800 text-center
                text-slate-200 px-4 py-1 rounded-md"> Edit</Link>
              </div>
              <div className="my-1">
                <blockquote className="font-bold text-slate-700">
                  {new Date(item.date).toISOString()}
                </blockquote>
                <div className=" mt-1">
                  <p>{item.details}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Home;