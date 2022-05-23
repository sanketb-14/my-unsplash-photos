import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaMale } from "react-icons/fa";


function Photos({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) {
  return (
    <article className="content">
      <div className="main-pic">
        <img src={regular} alt={alt_description} />
      </div>
      <div className="photo-info">
        <div className="name">
          <h4>{name}</h4>
          <p>
            <FaHeart className="heart" />
            {likes} Like
          </p>
        </div>
        <div className="person-info">
          <img src={medium} alt={name} className="person-pic" />
          <a href={portfolio_url}>
            <FaMale className="heart" /> Profile
          </a>
        </div>
      </div>
    </article>
  );
}

export default Photos;
