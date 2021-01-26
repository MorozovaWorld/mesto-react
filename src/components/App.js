import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import api from '../utils/Api.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImgPopupOpen, setImgPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    link: '',
    name: '',
  });
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
      api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err))
    }, []
  );

  const onEditProfile = () => {
    setEditProfilePopupOpen(true);
  }

  const onAddPlace = () => {
    setAddPlacePopupOpen(true);
  }

  const onEditAvatar = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleCardClick  = ({...card}) => {
    setSelectedCard({...selectedCard, name: card.name, link: card.link });
    setImgPopupOpen(true);
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImgPopupOpen(false);
    setTimeout(setSelectedCard, 1000, null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
        <Header />
        <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} onImageClick={handleCardClick} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        
        <PopupWithForm title='Новое место' name='add-picture' btnTitle='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <div className="popup__input-container">
            <input type="text" name='name' id="picName" placeholder="Название" className="popup__input-text popup__input-text_action_add-picture" required />
            <span id="picName-error" className="popup__input-error"></span>
          </div>
          <div className="popup__input-container">
            <input type="url" name='link' id="picLink" placeholder="Ссылка на картинку" className="popup__input-text popup__input-text_action_add-picture" required />
              <span id="picLink-error" className="popup__input-error"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm title='Обновить аватар' name='add-profile-picture' btnTitle='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <div className="popup__input-container">
            <input type="url" name='link' id="picLink" placeholder="Ссылка на картинку" className="popup__input-text popup__input-text_action_add-profile-picture" required />
            <span id="picLink-error" className="popup__input-error"></span>
          </div>
        </PopupWithForm>
        <PopupWithForm title='Вы уверены?' name='confirm-delete' btnTitle='Да' />
        <ImagePopup card={selectedCard} onImageClose={closeAllPopups} isOpen={isImgPopupOpen} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
