import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { reauthenticate } from "../../utils/Api";
import alertErrors from "../../utils/AlertErrors";
import firebase from "../../utils/Firebase";
import "firebase/auth";

export default function UserPassword(props) {
  const { setShowModal, setTitleModal, setContentModal } = props;

  const onEdit = () => {
    setTitleModal("Actualizar contraseña");
    setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
    setShowModal(true);
  };

  return (
    <div className="user-password">
      <h3>Contraseña: *** *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
}

function ChangePasswordForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      toast.warning("Las contraseñas no puedes estar vacias.");
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning("La nueva contraseña no puede ser igual a la actual.");
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      toast.warning("Las nuevas contraseñas no son iguales.");
    } else if (formData.newPassword.length < 6) {
      toast.warning("La contraseña tiene que tener minimo 6 caracteres.");
    } else {
      setIsLoading(true);
      reauthenticate(formData.currentPassword)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.newPassword)
            .then(() => {
              toast.success("Contraseña actualizada.");
              setIsLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch(err => {
              alertErrors(err?.code);
              setIsLoading(false);
            });
        })
        .catch(err => {
          alertErrors(err?.code);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Contraseña actual"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Nueva contraseña"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Repetir nueva contraseña"
          type={showPassword ? "text" : "password"}
          onChange={e =>
            setFormData({ ...formData, repeatNewPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar contraseña
      </Button>
    </Form>
  );
}
