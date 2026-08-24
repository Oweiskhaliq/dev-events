"use client"
import Image from "next/image";
import posthog from "posthog-js";

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" 
     onClick={() => {
       posthog.capture("events_explore_clicked");
       console.log("clicked");
     }}
      className="mt-7 mx-auto">
        <a href="#events">
          Explore Events
          <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24}  />
        </a>
        </button>
  )
}

export default ExploreBtn