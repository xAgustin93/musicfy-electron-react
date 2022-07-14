import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Artist } from "../../../api";
import "./AlbumInfo.scss";

const artistController = new Artist();

export function AlbumInfo(props) {
  const {
    album: { name, image, artist },
  } = props;
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await artistController.getArtist(artist);
        setArtistData(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [props.album]);

  return (
    <div className="album-info">
      <Image src={image} alt={name} />
      <div>
        <h1>{name}</h1>
        {artistData && (
          <p>
            De <Link to={`/artists/${artist}`}>{artistData.name}</Link>
          </p>
        )}
      </div>
    </div>
  );
}
