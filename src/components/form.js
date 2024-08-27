"use client";
import { useState } from "react";

export default function Form(params) {
    const [formError, setFormError] = useState("");
    
      function addPost(formData) {
          let tempError = "";
          const username = formData.get("username");
          const content = formData.get("content");
          if(username == null || username == ""){
            tempError +=`You must enter a username to be able to post.\n`;
          }
          if(content == ""){
            tempError +=`Your post must have at least one character.\n`;
          }
          else if(content.length>300){
            tempError +=`You cannot have more than 300 characters in one post.\n`;
          }
          if (tempError !== "") {
            setFormError(tempError);
          } else {
            params.submitPost(formData);
            setFormError("");
            console.log("Form has been submitted");
          }
      }

  return (
    <div>
      <form action={addPost}>
        <input className="username" name="username" placeholder="Post as..." />
        <textarea className="contentBox" name="content" placeholder="A new message..." />
        <button>Submit</button>
      </form>
      {formError !== "" && <p className="error">{formError}</p>}
    </div>
  );
}