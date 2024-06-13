import authScreenAtom from "../Atom/AuthAtom";
import LoginCard from "../Components/Login"
import SignupCard from "../Components/SignUp"
import { useRecoilValue, useSetRecoilState } from "recoil"
function AuthPage() {
  const authScreenState = useRecoilValue( authScreenAtom );
  console.log( authScreenState );
  useSetRecoilState( authScreenAtom, "login" );
  return (
    <div>
      { authScreenState === "login" ? <LoginCard/> : <SignupCard/> }
    </div>
  )
}

export default AuthPage