import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Form from "@/components/form";
import Post from "@/components/post";
import Sort from "@/components/sort";

export default async function PostPage({params ,searchParams}) {
  let ascType = "DESC";
  if(searchParams.sort)
    ascType = searchParams.sort;

  async function delComment(id) {
    "use server";
    db.query(`DELETE FROM comments WHERE 
      id=${id};`);

    // revalidate that page to ensure ALL the new candles are shown
    revalidatePath(`/posts/${params.id}`);
    // redirect tot he page that shows the list of candles
    redirect(`/posts/${params.id}`);
  }

  async function submitPost(formData) {
    "use server";

    const content = formData.get("content");
    const username = formData.get("username");

    await db.query(
      `
      INSERT INTO comments (post_id, content, comment_date, username)
      VALUES ($1, $2, $3, $4);`,
      [params.id, content, Date.now(), username]
    );
    // revalidate that page to ensure ALL the new candles are shown
    revalidatePath(`/posts/${params.id}`);
    // redirect tot he page that shows the list of candles
    redirect(`/posts/${params.id}`);
  }
  const resultPosts = await db.query(`SELECT * FROM posts`);
  const posts = resultPosts.rows;

  const resultComments = await db.query(`SELECT
  posts.id,
  posts.content,
  posts.username,
  posts.post_date,
  json_agg(comments ORDER BY comments.comment_date ${ascType}) AS comments
FROM posts
LEFT JOIN comments ON comments.post_id = posts.id
where
  posts.id = ${params.id}
GROUP BY posts.id, posts.username`);
const comments = resultComments.rows;
console.log(comments[0]);
  return (
    <div className="posts">
      <h2>{`Post by ${comments[0].username}`}</h2>
      <Post id={comments[0].id} username={comments[0].username} content={comments[0].content} date={comments[0].post_date} isLink={false} deletePost={delComment}></Post>
      <Form submitPost={submitPost}/>
      <h2>Comments</h2>
      <Sort link={"?sort="} desc={searchParams.sort}></Sort>
      {comments[0].comments[0] != null 
      ? <div>
        {comments[0].comments.map(function (comment) {
        return (
          <p key={comment.id}>
            <Post key={comment.id} id={comment.id} username={comment.username} content={comment.content} date={comment.comment_date} isLink={false} deletePost={delComment}></Post>
      
          </p>
        );
      })}
      </div> 
      : null}
      

      
    </div>
  );
}