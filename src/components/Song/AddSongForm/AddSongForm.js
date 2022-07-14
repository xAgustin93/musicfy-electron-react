import React, { useState, useEffect, useCallback } from "react";
import { Form, Icon } from "semantic-ui-react";
import classNames from "classnames";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Album, Storage, Song } from "../../../api";
import { initialValues, validationSchema } from "./AddSongForm.data";
import "./AddSongForm.scss";

const albumController = new Album();
const storageController = new Storage();
const songController = new Song();

export function AddSongForm(props) {
  const { onClose } = props;
  const [songName, setSongName] = useState("");
  const [albumsOptions, setAlbumsOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await albumController.obtainAll();
        const result = map(response, (item) => ({
          key: item.id,
          value: item.id,
          text: item.name,
        }));
        setAlbumsOptions(result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { file, name, album } = formValue;
        const response = await storageController.uploadFile(
          file,
          "song",
          uuidv4()
        );
        const url = await storageController.getUrlFile(
          response.metadata.fullPath
        );
        await songController.create(name, album, url);
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setSongName(file.name);
    formik.setFieldValue("file", file);
    formik.setFieldValue("name", file.name);
  });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Form className="add-song-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        placeholder="Nombre de la cación"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Dropdown
        placeholder="Asigna la canción a un álbum"
        fluid
        search
        selection
        options={albumsOptions}
        value={formik.values.album}
        onChange={(_, data) => formik.setFieldValue("album", data.value)}
        error={formik.errors.album}
      />

      <div
        {...getRootProps()}
        className={classNames("add-song-form__file", {
          error: formik.errors.file,
        })}
      >
        <input {...getInputProps()} />
        <Icon name="cloud upload" />
        <div>
          <p>
            Arrastra tu cacnción o haz click <span>aquí</span>
          </p>
          {songName && <p className="song-name">{songName}</p>}
        </div>
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Subir canción
      </Form.Button>
    </Form>
  );
}
