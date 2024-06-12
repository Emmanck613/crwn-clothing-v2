import { useState } from "react";

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth } 
from "../../utils/firebase/firebase.util";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component.jsx";

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    passsword: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Password do not match!");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
            //when a user signups for the first time they are set in our user context
            //setCurrentUser(user);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            
        } catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            } else{
                console.log('User creation error', error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up With your email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput
                    label="Display Name"
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />

                <FormInput
                    label="Email"
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label="Password"
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type='password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
};

export default SignUpForm;