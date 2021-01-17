class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
    this._cardsUrl = config.cardsUrl;
    this._likesUrl = config.likesUrl;
    this._usersUrl = config.usersUrl;
    this._userUrl = config.userUrl;
    this._avatarUrl = config.avatarUrl;
  }

  _resProcess(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}${this._usersUrl}${this._userUrl}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._resProcess);
  }

  editUserInfo(data) {
    return fetch(`${this._url}${this._usersUrl}${this._userUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    })
    .then(this._resProcess);
  }

  editUserPic(data) {
    return fetch(`${this._url}${this._usersUrl}${this._avatarUrl}`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      })
    })
    .then(this._resProcess);
  }

  getInitialCards() {
    return fetch(`${this._url}${this._cardsUrl}`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._resProcess);
  };

  addCard(data) {
    return fetch(`${this._url}${this._cardsUrl}`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._resProcess);
  };

  deleteCard(cardId) {
    return fetch(`${this._url}${this._cardsUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._resProcess);
  }

  likeCard(card) {
    return fetch(`${this._url}${this._cardsUrl}/likes/${card._id}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        likes: card.owner
      })
    })
    .then(this._resProcess);
  }

  unlikeCard(card) {
    return fetch(`${this._url}${this._cardsUrl}/likes/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._resProcess);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  cardsUrl: '/cards',
  usersUrl: '/users',
  userUrl: '/me',
  avatarUrl: '/me/avatar',
  headers: {
    authorization: 'd8cec698-f9c8-49c1-b35b-3f7a71d2233b',
    'Content-Type': 'application/json'
  }
});

export default api;