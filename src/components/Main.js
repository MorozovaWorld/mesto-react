import editBtn from '../images/edit-btn.svg';
import addPicBtn from '../images/add-btn.svg';
import api from '../utils/Api.js';
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({onEditAvatar, onEditProfile, onAddPlace, onImageClick }) {
  const user = React.useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
      api.getInitialCards()
      .then((initialCardsData) => {
        setCards(initialCardsData);
      })
      .catch((err) => console.log(err))
    }, []
  );

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === user._id);

    !isLiked ? 
    api.likeCard(card).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }) : 
    api.dislikeCard(card).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(c => c._id !== card._id);
      setCards(newCards);
    });
  }

  return (
    <main>
      <section className="profile section-width">
        <div className="profile__image-div">
          <img className="profile__image" alt="аватар владельца аккаунта" src={user.avatar} />
          <div className="profile__image-edit-btn-div">
            <button className="profile__image-edit-btn" type="submit" onClick={onEditAvatar}>
              <img src={editBtn} alt="иконка редактирования фотографии профиля" className="profile__image-edit-btn-icon" />
            </button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__title-edit">
            <h1 className="profile__info-title">{user.name}</h1>
            <button className="profile__popup-button-open opacity" type="button" onClick={onEditProfile}>
              <img src={editBtn} alt="иконка редактирования профиля" className="profile__popup-button-open-icon" />
            </button>
          </div>
          <p className="profile__info-subtitle">{user.about}</p>
        </div>
        <button className="addpic-popup-button-open opacity" type="button" onClick={onAddPlace}>
          <img src={addPicBtn} alt="кнопка добавить" />
        </button>
      </section>
      <section className="places section-width">
        <ul className="cards">
        {
          cards.map(card => 
            <Card card={card} key={card._id} onImageClick={onImageClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          )
        }
        </ul>
      </section>
    </main>
  );
}

export default Main;