import React from "react";
import {IonCard, IonCardTitle, IonCardContent, IonButton} from "@ionic/react"

type Props = {
    setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginModal(props: Props): JSX.Element{

    const {setShowLoginModal} = props

    return(
        <div className="custom-modal-container">
      <div className='custom-modal' >
        <IonCard>
          <IonCardContent>
            <IonCardTitle>Please Login First</IonCardTitle>
            <IonButton onClick={() => setShowLoginModal(false)}>
              Yup, going!
            </IonButton>
          </IonCardContent>
        </IonCard>
      </div>

    </div>
    )
}