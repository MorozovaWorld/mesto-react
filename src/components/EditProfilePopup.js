import PopupWithForm from './PopupWithForm';
import React, { useState } from 'react';

function EditProfilePopup({isOpen, onClose}) {
  const [name, setName] = useState('');
  const [description , setDescription ] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  
  return (
    <PopupWithForm title='Редактировать профиль' name='edit-profile' btnTitle='Сохранить' isOpen={isOpen} onClose={onClose}>
      <div className="popup__input-container">
        <input type="text" value={name} onChange={handleNameChange} name='name' id="name" placeholder="Имя" className="popup__input-text" required />
        <span id="name-error" className="popup__input-error"></span>
      </div>
      <div className="popup__input-container">
        <input type="text" value={description} onChange={handleDescriptionChange} name='info' id="job" placeholder="Профессия" className="popup__input-text" required />
        <span id="job-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>);
}

export default EditProfilePopup;