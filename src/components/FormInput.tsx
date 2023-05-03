import React from "react";
import { Form } from "react-bootstrap";

import { InputChangeFunction } from "../types/index";

interface Props {
  formId: string,
  label: string,
  type: string,
  formGroupClassname: string,
  inputContainerClassname?: string,
  inputClassname?: string,
  disabled?: boolean,
  onChange: InputChangeFunction,
  value: string,
  minLength?: number;
  Component?: React.ReactNode,
}
const FormInput: React.FC<Props> = ({
  formId,
  value,
  label,
  type,
  formGroupClassname,
  inputContainerClassname,
  inputClassname,
  disabled,
  minLength,
  Component,
  onChange,
}) => {
  return (
    <Form.Group
      id={formId}
      className={formGroupClassname}>
      <Form.Label>{label}</Form.Label>
      <div className={inputContainerClassname || ""}>
        <Form.Control
          type={type}
          disabled={disabled}
          minLength={minLength}
          required
          value={value}
          className={inputClassname}
          onChange={onChange} />
        {Component}
      </div>
    </Form.Group>
  );
};

export default FormInput;
