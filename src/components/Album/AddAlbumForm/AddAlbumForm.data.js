import * as Yup from "yup";

export function initialValues() {
  return {
    image: null,
    name: "",
    artist: "",
  };
}

export function validationSchema() {
  return Yup.object({
    image: Yup.string().required(true),
    name: Yup.string().required(true),
    artist: Yup.string().required(true),
  });
}
