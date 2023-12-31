import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.styles";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwrods do not match");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use");
            } else {
                console.log("user creation encountered an error ", error);
            }
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    inputOptions={{
                        type: "text",
                        name: "displayName",
                        required: true,
                        onChange: handleChange,
                        value: displayName,
                    }}
                />

                <FormInput
                    label="Email"
                    inputOptions={{
                        type: "email",
                        name: "email",
                        required: true,
                        onChange: handleChange,
                        value: email,
                    }}
                />

                <FormInput
                    label="Password"
                    inputOptions={{
                        type: "password",
                        name: "password",
                        required: true,
                        onChange: handleChange,
                        value: password,
                    }}
                />

                <FormInput
                    label="Confirm Password"
                    inputOptions={{
                        type: "password",
                        name: "confirmPassword",
                        required: true,
                        onChange: handleChange,
                        value: confirmPassword,
                    }}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};
export default SignUpForm;
