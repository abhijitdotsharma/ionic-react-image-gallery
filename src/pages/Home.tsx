import {
  IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader,
  IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonSearchbar, IonIcon,
  IonButton, IonImg, IonButtons, IonFooter, IonAccordion, IonAccordionGroup,
} from '@ionic/react';

import { searchCircle, personOutline } from "ionicons/icons";

import './Home.css';
import { RouteComponentProps } from 'react-router';
import React, { useState } from 'react';


import { useAuth } from '../context/auth-context';
import ImageModal from "../components/ImageModal"
import LoginModal from '../components/LoginModal';
import UnsplashClient from '../api/unsplash-client';


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

// type ImageObjectType = {  
//     urls?: {
//         small?: string
//     }
// } this was used for activeImageObj



// Used JSX.Element for React Component Type
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/
// "Why is React.FC discouraged"
// First project with Ionic and that or something else(IonPage ommision) lead to unwanted bugs, 
// so for <App/> and <Home/> it's kept as recommended in Ionic, and for others "JSX.Element" used

const Home: React.FC<RouteComponentProps> = (props) => {

  const { isLoggedIn } = useAuth()

  // API Requests
  const [input, setInput] = useState('')
  const [images, setImages] = useState<Photo[]>([])

  // modals
  const [showModal, setShowModal] = useState(false)
  const [activeImageObj, setActiveImageObj] = useState<Photo>({} as Photo)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  //for pagination
  const [page, setPage] = useState(1)

  const handleInputChange = (event: CustomEvent) => {
    setInput(event.detail.value);
  }

  async function fetchImagesFromUnsplash(searchTerm: string, page: number = 1) {
    const response = await UnsplashClient.get(`/search/photos?page=${page}`, {
      params: { query: searchTerm }
    })
    setImages(response.data.results)
  }

  async function handleClick() {
    fetchImagesFromUnsplash(input)
  }


  function handleModalOpen(imageObj: Photo) {
    // show clicked image if user isLoggedIn,else alert user to login
    if (isLoggedIn) {
      setActiveImageObj(imageObj)
      setShowModal(true)
    } else {
      setShowLoginModal(true)
    }
  }

  function handleNextPage() {
    // fetch new images from unsplash, 
    // page + 1 since pagestate will be updated async
    fetchImagesFromUnsplash(input, page + 1)
    setPage(prev => prev + 1)
  }

  function handlePrevPage() {
    fetchImagesFromUnsplash(input, page - 1)
    setPage(prev => prev - 1)
  }

  console.log(images)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Not Unsplash</IonTitle>
          <IonButton 
          className='header__btn-primary'
          slot='end' 
          routerLink='/login'>
            Login
          </IonButton>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>
        <IonToolbar className='content__search-toolbar' >
          <IonSearchbar
            searchIcon={searchCircle}
            onIonChange={handleInputChange}
            value={input}
          >
          </IonSearchbar>
          <IonButton
            className="content__btn-outline"
            fill="outline"
            onClick={handleClick}
            
          >
            Click Me
          </IonButton>
        </IonToolbar>

        {images.length !== 0 ?
          <IonToolbar>
            <div className='content__hacky-container'>
              <div className='content__cards-container'>
                {images.map((imageObj: Photo, idx: number) => (
                  <IonCard
                    className='custom-card'
                    key={idx}
                  >
                    <IonImg
                      onClick={() => handleModalOpen(imageObj)}
                      src={imageObj.urls.small}
                      alt="night"
                    />

                    {/* <IonCardHeader> */}
                    <IonCardTitle className='ion-padding'>
                      {imageObj.user.name}
                    </IonCardTitle>
                    {/* </IonCardHeader> */}

                    <IonAccordionGroup expand='inset'>
                      <IonAccordion value='first' className='accordion'>
                        <IonItem slot='header' color='light'>
                          <IonIcon size='medium' icon={personOutline}></IonIcon>
                          <IonLabel>{imageObj.user.name}</IonLabel>
                        </IonItem>
                        
                        <div className='ion-padding' slot='content' >
                          <p>
                          {imageObj.user.instagram_username}
                          </p>
                        </div>


                      </IonAccordion>
                    </IonAccordionGroup>
                  </IonCard>
                ))}
              </div>
            </div>
          </IonToolbar> : null}



        {showModal ? <ImageModal showModal={showModal} setShowModal={setShowModal} activeImageObj={activeImageObj} /> : null}

        {showLoginModal ? <LoginModal setShowLoginModal={setShowLoginModal} /> : null}


      </IonContent>

      {/* Show Pagination only if images present */}
      {images.length !== 0 ?
        <IonFooter>
          <IonToolbar>
            <IonButtons>
              <IonButton
                disabled={page === 1}
                onClick={() => handlePrevPage()}
              >prev</IonButton>
              <p>{page}</p>
              <IonButton
                onClick={() => handleNextPage()}
              >next</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter> : null
      }

    </IonPage>
  );
};

export default Home;


