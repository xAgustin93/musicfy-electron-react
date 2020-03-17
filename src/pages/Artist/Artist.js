import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { map } from "lodash";
import BannerArtist from "../../components/Artists/BannerArtist";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems";
import SongsSlider from "../../components/Sliders/SongsSlider";
import firebase from "../../utils/Firebase";
import "firebase/firestore";

import "./Artist.scss";

const db = firebase.firestore(firebase);

function Artist(props) {
  const { match, playerSong } = props;
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .doc(match?.params?.id)
      .get()
      .then(response => {
        const data = response.data();
        data.id = response.id;
        setArtist(data);
      });
  }, [match]);

  useEffect(() => {
    if (artist) {
      db.collection("albums")
        .where("artist", "==", artist.id)
        .get()
        .then(response => {
          const arrayAlbums = [];
          map(response?.docs, album => {
            const data = album.data();
            data.id = album.id;
            arrayAlbums.push(data);
          });
          setAlbums(arrayAlbums);
        });
    }
  }, [artist]);

  useEffect(() => {
    const arraySongs = [];
    (async () => {
      await Promise.all(
        map(albums, async album => {
          await db
            .collection("songs")
            .where("album", "==", album.id)
            .get()
            .then(response => {
              map(response?.docs, song => {
                const data = song.data();
                data.id = song.id;
                arraySongs.push(data);
              });
            });
        })
      );
      setSongs(arraySongs);
    })();
  }, [albums]);

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <div className="artist__content">
        <BasicSliderItems
          title="Álbumes"
          data={albums}
          folderImage="album"
          urlName="album"
        />
        <SongsSlider title="Canciónes" data={songs} playerSong={playerSong} />
      </div>
    </div>
  );
}
export default withRouter(Artist);
