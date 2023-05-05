import { useEffect} from "react";
import {getRedirectResult} from "firebase/auth"
import {
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    // signInWithGoogleRedirect
} from "../../utils/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    const logWithRedirect = async () => {
        const response = await getRedirectResult(auth)
        console.log(response)
        if (response){
            const userDocRef = createUserDocumentFromAuth(response.user)
        }
    }
    useEffect(() => {
        logWithRedirect().then(r => console.log('logged in'))
    }, [])
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        console.log(user)
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign In Pages</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            {/*<button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button>*/}
            <SignUpForm/>
        </div>
    )
}

export default SignIn