import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./ListSongs.scss";

export default function ListSongs(props) {
  const { songs, albumImg, playerSong } = props;

  return (
    <Table inverted className="list-songs">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Titulo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(songs, song => (
          <Song
            key={song.id}
            song={song}
            albumImg={albumImg}
            playerSong={playerSong}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

function Song(props) {
  const { song, albumImg, playerSong } = props;

  const onPlay = () => {
    playerSong(albumImg, song.name, song.fileName);
  };

  return (
    <Table.Row onClick={onPlay}>
      <Table.Cell collapsing>
        <Icon name="play circle outline" />
      </Table.Cell>
      <Table.Cell>{song.name}</Table.Cell>
    </Table.Row>
  );
}
