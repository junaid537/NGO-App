import React from "react";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRole } from "../apis/loginApi";

import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { roleState } from "../store/roleState";
import { isLoggedIn } from "../store/roleState";


export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useRecoilState(roleState);

  console.log('hello beta',role)
  //const [loginStatus, setLoginStatus] = useRecoilState(isLoggedIn);
  useEffect(() => {

    console.log("useEffect ka role",role);
    //if(localStorage.getItem('current')!==null)navigate(localStorage.getItem('current'))
    //setRole(role);
    //console.log("useEffect ka loginstatus",loginStatus);

  }, [role]);//4

  //const [role, setRole]=useRole();
  const {
    data: roleData,
    isLoading: isroleLoading,
    isError: isroleError,
    error: roleError,
    refetch,
  } = useQuery(["unique-key"], getRole, {
    enabled: false, // disable this query from automatically running
  });

  console.log("hello");
  //console.log("times",roleData);

  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new GoogleAuthProvider();
    //2 - create the popup signIn
    // signInWithRedirect(auth, provider);

    //ye auth ko token bhejna hai,isiliye wo 1st parameter hai signInWithPopup ka
    //signInWithPopup(auth, provider)
    /*.then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //line no. 18 and 19 used to extract token from result(which is promise returned by signInWithPopup)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        console.log(result);
        localStorage.setItem("google-oauth-token", token);//localStorage mei store isiliye karrey kyuki ,axios api mei header pass karna hai
        // The signed-in user info.
        const user = result.user;
        // ...
      })*/
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = await auth.currentUser?.getIdTokenResult();
        console.log("credentials", credential.token);
        const token = credential.token;
        localStorage.setItem("google-token-popup-feature", token);
        // The signed-in user info.
        const user = result.user;
        await alert("Authentication Sucessful", user.emailVerified);
        console.log("user", user);
        console.log("result by jun", result.user.email);
        var { data, isLoading, isFetched } = await refetch();
        if (isFetched) {
          //setLoginStatus(true);
          //console.log("loginStatus is..... ", loginStatus);
          if (data.isAdmin === true) {
            console.log("hello world",typeof data.nid)
            console.log(result.user.displayName);
            setRole({login:true,isAdmin:true,ngoid:data.ngoId,email:result.user.email,userName:result.user.displayName});
          } else {
            setRole({...role,isAdmin:false,login:true,email:result.user.email,userName:result.user.displayName});

            //setRole(false);     
          }
          //setRole(data);
          console.log("recoil role is", data.isAdmin); //
          //navigate("/home")
        }
        if (isLoading) {
          console.log("loading..");
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      //console.log('role',role);
  }
  return (
    <>
    <button
      onClick={() => {
        googleLogin();
      }}
    >
      Login
    </button>
    <div>{console.log("quiz",role)}</div>
    </>
  );
}
