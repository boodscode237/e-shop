import {useState, useContext} from "react";
import {
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup
} from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password} = formFields
    const {setCurrentUser} = useContext(UserContext)
    const resetFormFields = () => setFormFields(defaultFormFields)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            // setCurrentUser(user)
            resetFormFields()
        } catch (e) {
            switch (e.code) {
                case 'auth/wrong-password':
                    alert("Incorrect password for email")
                    break
                case 'auth/user-not-found':
                    alert("User not found for this email")
                    break
                default:
                    console.log(e)
            }
        }

    }
    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }
    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
        // setCurrentUser(user)
        // await createUserDocumentFromAuth(user)
    }
    return (
        <SignInContainer>
            <h2>Do you have an account?</h2>
            <span>Sign in With Email and Password</span>
            <form onSubmit={handleSubmit}>
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
                <ButtonsContainer>
                    <Button  type='submit'>Sign In</Button>
                    <Button
                        type='button'
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Sign In With Google
                    </Button>
                </ButtonsContainer>

            </form>
        </SignInContainer>
    )
}

export default SignInForm