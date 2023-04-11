import React from "react";
import { Form } from "react-bootstrap";

import { InputChangeFunction } from "../../types/index";

interface Props {
  formId: string,
  label: string,
  type: string,
  className: string,
  disabled?: boolean,
  onChange: InputChangeFunction,
  value: string,
  Component?: React.ReactNode,
}
const FormGroup: React.FC<Props> = ({
  formId,
  value,
  label,
  type,
  className,
  disabled,
  Component,
  onChange,
}) => {
  return (
    <Form.Group id={formId} className={className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        disabled={disabled}
        required
        value={value}
        onChange={onChange} />
      {Component}
    </Form.Group>
  );
};

export default FormGroup;
