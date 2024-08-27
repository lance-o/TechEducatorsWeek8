import Form from "@/components/form";
import Post from "@/components/post";
import Sort from "@/components/sort";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { redirect } from "next/navigation";

export default async function Home({searchParams }) {
  let ascType = "DESC";
  if(searchParams.sort)
    ascType = searchParams.sort;
  
  async function delPost(id) {
    "use server";

    console.log(id);
    await db.query(`DELETE FROM comments WHERE 
      post_id=${id};`);

    await db.query(`DELETE FROM posts WHERE 
      id=${id};`);
    // revalidate that page to ensure ALL the new candles are shown
    revalidatePath("/");
    // redirect tot he page that shows the list of candles
    redirect("/");
  }

  async function submitPost(formData){
    "use server";
    const content = formData.get("content");
    const username = formData.get("username");
    //const colour = formData.get("colour");
    //const price = formData.get("price");

    await db.query(
      `
      INSERT INTO posts (username, content, post_date)
      VALUES ($1, $2, $3);`,
      [username, content, Date.now()]
    );

    // revalidate that page to ensure ALL the new candles are shown
    revalidatePath("/");
    // redirect tot he page that shows the list of candles
    redirect("/");
  }

  const result = await db.query(`SELECT * FROM posts
                    ORDER BY posts.post_date ${ascType}`);
  const posts = result.rows;

  return (
    <div className="posts">
      <h2>Posts</h2>
      <Form submitPost={submitPost}></Form>
      <Sort link={"?sort="} desc={searchParams.sort}></Sort>
      {posts.map(function (post) {
        return (
          <Post key={post.id} id={post.id} username={post.username} content={post.content} date={post.post_date} isLink={true} deletePost={delPost}></Post>
        );
      })}
    </div>
  );
}