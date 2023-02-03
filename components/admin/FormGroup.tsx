import React, { ReactComponentElement } from "react";
import { Form } from "react-bootstrap";

interface Props {
  formId: string,
  label: string,
  type: string,
  className: string,
  disabled?: boolean,
  onChange: (e: InputEvent) => void,
  value: string,
  Component?: React.ReactNode,
}
const FormGroup: React.FC<Props> = ({ formId, label, type, className, disabled, onChange, value, Component }) => {
  return ( 
    <>
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
    </>
   );
}
 
export default FormGroup;