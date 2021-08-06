import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';

export interface props {
    placeholder: string;
    name: string;
    label?: string
}

const MyTextInput: React.FC<props> = (props) => {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}

export default MyTextInput;