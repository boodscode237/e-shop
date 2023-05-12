import {useState} from "react";
import {
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup
} from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password} = formFields
    const resetFormFields = () => setFormFields(defaultFormFields)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(response)
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
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }
    return (
        <div className='sign-up-container'>
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
                <div className='buttons-container'>
                    <Button  type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Sign In With Google</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm