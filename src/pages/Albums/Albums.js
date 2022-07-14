import React, { useState, useEffect } from "react";
import { Album } from "../../api";
import { ListAlbums } from "../../components/Album";
import "./Albums.scss";

const albumController = new Album();

export function Albums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.obtainAll();
        setAlbums(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="albums-page">
      <h1>Álbumes</h1>
      <ListAlbums albums={albums} />
    </div>
  );
}
