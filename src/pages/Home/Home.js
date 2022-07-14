import React, { useState, useEffect } from "react";
import { Artist, Album, Song } from "../../api";
import { Slider } from "../../components/Shared";
import { bannerHome } from "../../assets";
import "./Home.scss";

const artistController = new Artist();
const albumController = new Album();
const songController = new Song();

export function Home() {
  const [artists, setArtists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await artistController.getLastArtists();
        setArtists(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.getLastAlbums();
        setAlbums(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await songController.getLastSongs();

        let data = [];
        for await (const item of response) {
          const song = item;
          const resultAlbum = await albumController.getAlbum(item.album);
          song.image = resultAlbum.image;
          data.push(song);
        }
        setSongs(data);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <div className="home-page">
      <div
        className="home-page__banner"
        style={{ backgroundImage: `url(${bannerHome})` }}
      />

      <div className="home-page__slider">
        <h2>Últimos artistas</h2>
        {artists && <Slider data={artists} basePath="artists" />}
      </div>

      <div className="home-page__slider">
        <h2>Últimos álbumes</h2>
        {albums && <Slider data={albums} basePath="albums" />}
      </div>

      <div className="home-page__slider">
        <h2>Ultimas canciones</h2>
        {songs && <Slider data={songs} song />}
      </div>
    </div>
  );
}
