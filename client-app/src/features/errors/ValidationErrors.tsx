import React from 'react';
import { Message } from 'semantic-ui-react';

interface ValidationErrorsProps {
    errors: string[] | null;
}

const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
    return (
        <Message error>
            {errors && (
                errors.map((err: any, i) =>
                (
                    <Message.Item key={i}>
                        {err}
                    </Message.Item>
                ))
            )}
        </Message>
    );
}

export default ValidationErrors;