import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Album as AlbumController, Song } from "../../api";
import { AlbumInfo } from "../../components/Album";
import { ListSongs } from "../../components/Song";
import "./Album.scss";

const albumController = new AlbumController();
const songController = new Song();

export function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.getAlbum(id);
        setAlbum(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await songController.obtainAllByAlbum(id);
        setSongs(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  if (!album) {
    return (
      <Loader active inline="centered" size="large">
        Cargando
      </Loader>
    );
  }

  return (
    <div className="album-page">
      <AlbumInfo album={album} />
      <ListSongs songs={songs} miniature={album.image} />
    </div>
  );
}
