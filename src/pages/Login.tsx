import React from 'react';

import { useAuth } from '../context/auth-context';
import { IonButton, IonContent, IonPage,  useIonRouter } from "@ionic/react";

function Login(): JSX.Element{
    
    //	Initializing our router
	const router = useIonRouter();

    const { setIsLoggedIn} = useAuth();

    function loginAndRedirectHome(){
        setIsLoggedIn(true)
        //	A simple navigation
		router.push("/home", "forward", "push");	
    }

    return(
        <IonPage>
            <IonContent>            
            <IonButton
            className="header__btn-primary"
            slot='fixed' 
            size='large' 
            onClick={loginAndRedirectHome}>
                Login and go to Home
            </IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Login