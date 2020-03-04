import React, { useState, useCallback } from "react";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import NoAvatar from "../../assets/png/user.png";
import firebase from "../../utils/Firebase";
import "firebase/storage";
import "firebase/auth";

export default function UploadAvatar(props) {
  const { user, setReloadApp } = props;
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file).then(() => {
      updateUserAvatar();
    });
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop
  });

  const uploadImage = file => {
    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${user.uid}`);
    return ref.put(file);
  };

  const updateUserAvatar = () => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then(async response => {
        await firebase.auth().currentUser.updateProfile({ photoURL: response });
        setReloadApp(prevState => !prevState);
      })
      .catch(() => {
        toast.error("Error al actualizar el avatar.");
      });
  };

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}
