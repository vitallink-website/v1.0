import React from "react";
import { RWebShare } from "react-web-share";
  
export default function SocialLinks(){
  return (
    <div>
      <RWebShare
        data={{
          text: "Web Share - GfG",
          url: "http://localhost:3000",
          title: "GfG",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        
      </RWebShare>
    </div>
  );
};