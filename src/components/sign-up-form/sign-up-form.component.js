import {useState, useContext} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from './sign-up-form.styles';
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => setFormFields(defaultFormFields)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword){
            alert("Please check that your password and confirm password match")
            return
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            )
            // setCurrentUser(user)
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields()
        } catch (e) {
            if (e.code === "auth/email-already-in-use") {
                alert("Cannot create user email already in use")
            }else{
                console.log("user signed up has an error ",e)
            }
        }

    }
    const handleChange = (event) => {
        // event.preventDefault()
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }
    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up With Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    inputOptions = {
                        {
                            type: "text",
                            required: true,
                            onChange: handleChange,
                            name: 'displayName',
                            value: displayName,
                        }
                    }

                />
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                    inputOptions = {
                        {
                            type: "email",
                            required: true,
                            onChange: handleChange,
                            name: 'email',
                            value: email,
                        }
                    }
                />
                <FormInput
                    label="Password"
                    inputOptions = {
                        {
                            type: "password",
                            required: true,
                            onChange: handleChange,
                            name: 'password',
                            value: password,
                        }
                    }
                />
                <FormInput
                    label="Confirm Password"
                    inputOptions = {
                        {
                            type: "password",
                            required: true,
                            onChange: handleChange,
                            name: 'confirmPassword',
                            value: confirmPassword,
                        }
                    }
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm