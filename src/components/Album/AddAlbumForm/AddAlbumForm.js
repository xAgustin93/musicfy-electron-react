import React, { useState, useEffect, useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import classNames from "classnames";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { map } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Artist, Album, Storage } from "../../../api";
import { noImage } from "../../../assets";
import { initialValues, validationSchema } from "./AddAlbumForm.data";
import "./AddAlbumForm.scss";

const artistController = new Artist();
const albumController = new Album();
const storageController = new Storage();

export function AddAlbumForm(props) {
  const { onClose } = props;
  const [image, setImage] = useState(noImage);
  const [artistOptions, setArtistOptions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await artistController.obtainAll();
        const newData = map(response, (artist) => ({
          key: artist.id,
          value: artist.id,
          text: artist.name,
        }));
        setArtistOptions(newData);
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
        const { name, image, artist } = formValue;
        const response = await storageController.uploadFile(
          image,
          "album",
          uuidv4()
        );
        const url = await storageController.getUrlFile(
          response.metadata.fullPath
        );
        await albumController.create(name, url, artist);
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setImage(URL.createObjectURL(file));
    formik.setFieldValue("image", file);
  });

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Form className="add-album-form" onSubmit={formik.handleSubmit}>
      <div className="add-album-form__content">
        <div
          {...getRootProps()}
          className={classNames("add-album-form__content-image", {
            error: formik.errors.image,
          })}
        >
          <input {...getInputProps()} />
          <Image src={image} />
        </div>

        <div className="add-album-form__content-inputs">
          <Form.Input
            name="name"
            placeholder="Nombre del álbum"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <Form.Dropdown
            placeholder="El álbum pertence..."
            fluid
            search
            selection
            options={artistOptions}
            value={formik.values.artist}
            onChange={(_, data) => formik.setFieldValue("artist", data.value)}
            error={formik.errors.artist}
          />
        </div>
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear álbum
      </Form.Button>
    </Form>
  );
}
