import React from "react";
import {IonCard, IonIcon, IonButtons, IonCardTitle, IonCardHeader, IonImg, IonButton, IonContent} from "@ionic/react";
import {closeCircleOutline} from 'ionicons/icons';

type Photo = {
  id: number;
  width: number;
  height: number;
  urls: {
    large: string;
    regular: string;
    raw: string;
    small: string;
  };
  color: string | null;
  user: {
    bio: string;
    name: string;
    instagram_username: string;
    first_name: string;
    last_name: string;
  };
};

type Props = {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    // activeImageObj : {
    //     urls?: {
    //         small?: string
    //     }
    // }
    activeImageObj : Photo
}

export default function LoginModal(props: Props): JSX.Element{

    const {  setShowModal, activeImageObj } = props
  
    return (
    <div className="custom-modal-container">
      <div className='custom-modal' >
        <IonCard>
          {/* <IonCardHeader>
            <button
              onClick={() => setShowModal(false)}
            >Close</button>
          </IonCardHeader> */}

          <IonButtons>
            <IonButton onClick={() => setShowModal(false)}>
              <IonIcon slot="start" icon={closeCircleOutline}></IonIcon>
              Close
            </IonButton>
          </IonButtons>
          <IonImg src={activeImageObj?.urls?.small}></IonImg>

          <IonContent className="ion-padding">
            <h3>{activeImageObj.user.name}</h3>
            <p>{activeImageObj.user.bio}</p>
          </IonContent>
          {/* <div>Text here</div>
          <h3>more text here</h3> */}
        </IonCard>
      </div>
    </div>
  )
}