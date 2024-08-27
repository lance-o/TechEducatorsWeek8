"use client";
import Link from "next/link";

export default function Sort(params) {
    
    function handleSort(link, desc){

        if(desc == "ASC"){
            return link + "DESC"
        }
        return link + "ASC";
    }

  return (
    <div>
        <Link href={handleSort(params.link, params.desc)}><p>Toggle sort by Ascending/Descending</p></Link>
    </div>
  );
}