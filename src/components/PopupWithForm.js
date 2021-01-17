import closeBtn from '../images/Close-Icon.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_action_${props.name}` + (props.isOpen ? ' popup_opened' : '')}>
      <div className="popup__container">
        <form className={`popup__form popup__form_action_${props.name}`} name={`name`}>
          <fieldset className="popup__input-text-form">
            <legend className="popup__title">{props.title}</legend>
            {props.children}
          </fieldset>
          <button type="submit" className="popup__button-submit">{props.btnTitle}</button>
        </form>
        <button className="popup__close opacity" type="reset" onClick={props.onClose}>
          <img src={closeBtn} alt="крестик чтобы закрыть окно редактирования" />
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;