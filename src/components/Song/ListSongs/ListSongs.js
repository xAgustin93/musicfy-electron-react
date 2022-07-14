import React from "react";
import { Table, Icon } from "semantic-ui-react";
import { size, map } from "lodash";
import { usePlayer } from "../../../hooks";
import "./ListSongs.scss";

export function ListSongs(props) {
  const { songs, miniature } = props;
  const { playSong } = usePlayer();

  const onPlay = (item) => {
    playSong(item, miniature);
  };

  if (size(songs) === 0) {
    return <p className="no-songs">Este album aun no tiene canciónes</p>;
  }

  return (
    <Table inverted className="list-songs">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Titulo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(songs, (song) => (
          <Table.Row key={song.id} onClick={() => onPlay(song)}>
            <Table.Cell collapsing>
              <Icon name="play circle outline" />
            </Table.Cell>
            <Table.Cell>{song.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
