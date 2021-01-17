import editBtn from '../images/edit-btn.svg';
import addPicBtn from '../images/add-btn.svg';
import api from '../utils/Api.js';
import React, { useState, useEffect } from 'react';
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription , setUserDescription ] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards(),
      ])
      .then(([userData, initialCardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
    
        setCards(initialCardsData);
      })
      .catch((err) => console.log(err))
    }
  )

  return (
    <main>
      <section className="profile section-width">
        <div className="profile__image-div">
          <img className="profile__image" alt="аватар владельца аккаунта" src={userAvatar} />
          <div className="profile__image-edit-btn-div">
            <button className="profile__image-edit-btn" type="submit" onClick={props.onEditAvatar}>
              <img src={editBtn} alt="иконка редактирования фотографии профиля" className="profile__image-edit-btn-icon" />
            </button>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__title-edit">
            <h1 className="profile__info-title">{userName}</h1>
            <button className="profile__popup-button-open opacity" type="button" onClick={props.onEditProfile}>
              <img src={editBtn} alt="иконка редактирования профиля" className="profile__popup-button-open-icon" />
            </button>
          </div>
          <p className="profile__info-subtitle">{userDescription}</p>
        </div>
        <button className="addpic-popup-button-open opacity" type="button" onClick={props.onAddPlace}>
          <img src={addPicBtn} alt="кнопка добавить" />
        </button>
      </section>
      <section className="places section-width">
        <ul className="cards">
        {
          cards.map(card => 
            <Card card={card} key={card._id} onImageClick={props.onImageClick} />
          )
        }
        </ul>
      </section>
    </main>
  );
}

export default Main;