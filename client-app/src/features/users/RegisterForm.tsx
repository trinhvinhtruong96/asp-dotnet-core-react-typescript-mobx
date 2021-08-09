import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export interface Props {}

const RegisterForm: React.FC<Props> = () => {
    const { userStore } = useStore();
    const { register } = userStore;

    return (
        <Formik
            initialValues={{
                displayName: "",
                username: "",
                email: "",
                password: "",
                error: null,
            }}
            onSubmit={(values, { setErrors }) =>
                register(values).catch((error) => setErrors({ error }))
            }
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form
                    className="ui form error"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <Header
                        as="h2"
                        content="Sign up to Reactivities"
                        color="teal"
                        textAlign="center"
                    />
                    <MyTextInput
                        placeholder="Display Name"
                        name="displayName"
                    />
                    <MyTextInput placeholder="Username" name="username" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    <ErrorMessage
                        name="error"
                        render={() => (
                            <ValidationErrors errors={errors.error} />
                        )}
                    />
                    <Button
                        disabled={!isValid || !dirty}
                        loading={isSubmitting}
                        positive
                        content="Register"
                        type="submit"
                        fluid
                    />
                </Form>
            )}
        </Formik>
    );
};

export default observer(RegisterForm);
