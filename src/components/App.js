import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import api from '../utils/Api.js';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import '../index.css';
import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmCardDeletePopupOpen, setConfirmCardDeletePopupOpen] = useState(false);
  const [isImgPopupOpen, setImgPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    link: '',
    name: '',
  });
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: ''});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  const onEditProfile = () => {
    setEditProfilePopupOpen(true);
  }

  const onAddPlace = () => {
    setAddPlacePopupOpen(true);
  }

  const onEditAvatar = () => {
    setEditAvatarPopupOpen(true);
  }

  const onCardDeleteSubmit = ({...card}) => {
    setConfirmCardDeletePopupOpen(true);
    setCardToDelete({...card})
  }

  useEffect(() => {
    Promise.all([
      api.getInitialCards(),
      api.getUserInfo()
    ])
    .then(([initialCardsData, userData]) => {
      setCards(initialCardsData);
      setCurrentUser(userData);
    })
    .catch((err) => console.log(err))
  }, []
);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    !isLiked ? 
    api.likeCard(card).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }).catch((err) => console.log(err)) : 
    api.dislikeCard(card).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(c => c._id !== card._id);
      setCards(newCards);
    })
    .then(() => setConfirmCardDeletePopupOpen(false))
    .catch((err) => console.log(err));
  }

  const handleCardClick  = ({...card}) => {
    setSelectedCard({...selectedCard, name: card.name, link: card.link });
    setImgPopupOpen(true);
  }

  const handleUpdateUser  = ({name, info}) => {
    api.setUserInfo({name, info})
    .then((userData) => {
      setCurrentUser({...currentUser, name: userData.name, about: userData.about });
    })
    .then(() => setEditProfilePopupOpen(false))
    .catch((err) => console.log(err));
  }

  const handleUpdateAvatar  = ({link}) => {
    api.setUserAvatar({link})
    .then((userData) => {
      setCurrentUser({...currentUser, avatar: userData.avatar });
    })
    .then(() => setEditAvatarPopupOpen(false))
    .catch((err) => console.log(err));
  }

  const handleAddPlaceSubmit  = ({name, link}) => {
    api.addCard({name, link})
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then(() => setAddPlacePopupOpen(false))
    .catch((err) => console.log(err));
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImgPopupOpen(false);
    setConfirmCardDeletePopupOpen(false);
    setTimeout(setSelectedCard, 1000, null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
        <Header />
        <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} 
        onImageClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={onCardDeleteSubmit} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <DeleteCardPopup isOpen={isConfirmCardDeletePopupOpen} onClose={closeAllPopups} onSubmitCardDelete={handleCardDelete} card={cardToDelete} />
        <ImagePopup card={selectedCard} onImageClose={closeAllPopups} isOpen={isImgPopupOpen} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
