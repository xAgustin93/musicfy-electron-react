import * as Yup from "yup";

export function initialValues() {
  return {
    file: null,
    name: "",
  };
}

export function validationSchema() {
  return Yup.object({
    file: Yup.string().required(true),
    name: Yup.string().required(true),
  });
}
