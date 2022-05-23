import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "./logo.jpg";
import Photos from "./Photos";
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
const clientId = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  const [newImages, setNewImages] = useState(false);
  const urlQuery = `&query=${query}`;

  const fetchPhoto = async () => {
    setLoading(true);
    let url;
    const pageUrl = `&page=${page}`;
    url = `${mainUrl}${clientId}${pageUrl}`;
    if (query) {
      url = `${searchUrl}${clientId}${pageUrl}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientId}${pageUrl}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhoto((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPhoto();
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchPhoto();
    }
    setPage(1);
  };

  return (
    <main>
      <section className="container">
        <div className="title">
          <img src={logo} alt="logo" />
          <div className="heading">
            <h1>My-Unsplash-Photos</h1>
            <div className="underline"></div>
          </div>
        </div>
        <form className="form-content">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
        <div className="photos">
          <div className="onepic">
            {photo.map((item, index) => {
              return <Photos key={index} {...item} />;
            })}
          </div>
        </div>
        {loading && <h2>Loading...</h2>}
      </section>
    </main>
  );
};
export default App;
