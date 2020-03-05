import React from "react";

export default function Blob() {
  return (
    <div className="svg-blob">
      <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
        <linearGradient id="orangeToindianred">
          <stop stopColor="#a321c4" offset="0%" />
          <stop stopColor="#6c63ff" offset="100%" />
        </linearGradient>
        <path
          fill="url(#orangeToindianred)"
          d="M418.8 127.8c30.3 30.6 46.6 71.9 59.9 113.9 13.4 42 23.9 84.8 14.4 123.2-9.5 38.4-39 72.5-74.5 106-35.5 33.4-77.1 66.3-120.9 69.4-43.7 3.1-89.8-23.6-113.6-60.8-23.7-37.3-25.2-85.2-44.1-130.5-18.8-45.3-54.9-87.9-59.5-134.6-4.5-46.7 22.6-97.5 64.4-124.4 41.9-26.9 98.5-29.9 148.9-21.4 50.5 8.5 94.8 28.5 125 59.2z"
        />
      </svg>
    </div>
  );
}
