"use client";
import Link from "next/link";

export default function Post(params) {

    function returnReadableDate(rawTime){
        let date = new Date(rawTime-(new Date()).getTimezoneOffset() * 60000);
        let formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        return formattedDate;
    }

  return (
    <div className="postBody">
        {params.isLink == true
        ? <Link style={{ textDecoration: 'none' }} href={`/posts/${params.id}`}>
        <div className="nameDate">
            <p>
                {params.username}
            </p>
            <p>
                {returnReadableDate(params.date)}
            </p>
        </div>
        <p>
            {params.content}
        </p>
        </Link>
        : <div>
            <div className="nameDate">
                <p>
                    {params.username}
                </p>
                <p>
                    {returnReadableDate(params.date)}
                </p>
            </div>
            <p>
                {params.content}
            </p>
            </div>}
        <button onClick={()=>{
            params.deletePost(params.id);
        }}>Delete Post</button>
        <Link key={params.id} href={`/posts/${params.id}`}>
            
        </Link>
    </div>
  );
}