
import likeBtn from '../images/like.svg';
import deleteCardBtn from '../images/delete-btn.svg';

function Card({card, onImageClick}) {

  const handleCardClick = () => {
    onImageClick({...card});
  } 

  return (
    <li className="card">
      <img src={card.link} alt="фотография" className="card__img opacity" onClick={() => {handleCardClick({...card})}}/>
      <div className="card__caption">
        <h2 className="card__caption-text">{card.name}</h2>
        <div className="card__likes">
          <button type="button" className="card__like">
            <img src={likeBtn} alt="иконка сердечка" className="card__like-icon opacity" />
          </button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
        <button type="button" className="card__delete opacity">
          <img src={deleteCardBtn} alt="иконка мусорной корзины" />
        </button>
      </div>
    </li>
  )
}

export default Card;