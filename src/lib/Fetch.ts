
export async function fetchBlogData() {
    const res=await fetch('http://localhost:3000/api/blog',{
        next:{
            revalidate:10
        }
    })
    const data =await res.json();
    return data.post
}