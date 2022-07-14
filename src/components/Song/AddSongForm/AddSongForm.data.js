import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    album: "",
    file: null,
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required(true),
    album: Yup.string().required(true),
    file: Yup.string().required(true),
  });
}
