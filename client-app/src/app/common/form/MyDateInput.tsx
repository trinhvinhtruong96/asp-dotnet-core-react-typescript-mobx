import { useField } from 'formik';
import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

const MyDateInput: React.FC<ReactDatePickerProps> = (props) => {
    const [field, meta, helper] = useField(props.name!);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={field.value && }
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}

export default MyDateInput;