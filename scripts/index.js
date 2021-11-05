// определяем popup_type_adit
const content = document.querySelector('.content');
const popupEditButtonElement = content.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__close-icon');

// определяем формы заполнения popup_type_edit
const formEditElement = popupEditElement.querySelector('.popup__form');
const inputNameElement = formEditElement.querySelector('.popup__input_el_name');
const inputJobElement = formEditElement.querySelector('.popup__input_el_job');
const profileNameElement = content.querySelector('.profile__title');
const profileJobElement = content.querySelector('.profile__subtitle');

// определяем popup_type_add
const popupAddButtonElement = content.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__close-icon');

// определяем формы заполнения popup_type_add
const formEddElement = popupAddElement.querySelector('.popup__form');
const title = formEddElement.querySelector('.popup__input_el_title');
const link = formEddElement.querySelector('.popup__input_el_link');



// создаем функцию по открытию/закрытию
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
}

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
}

// создаем функцию по заполнению форм popup_type_edit
const submitFormEditHandler = (evt) => {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = inputNameElement.value;
  profileJobElement.textContent = inputJobElement.value;
  closePopup(popupEditElement);
}

formEditElement.addEventListener('submit', submitFormEditHandler);



// вешаем слушатели на открытие/закрытие
popupEditButtonElement.addEventListener('click', (evt) => {
  openPopup(popupEditElement);
});

popupEditCloseButtonElement.addEventListener('click', (evt) => {
  closePopup(popupEditElement);
});

// вешаем слушатели на открытие/закрытие
popupAddButtonElement.addEventListener('click', (evt) => {
  openPopup(popupAddElement);
});

popupAddCloseButtonElement.addEventListener('click', (evt) => {
  closePopup(popupAddElement);
});



// инициализируем обёртку
const wrapElement = document.querySelector('.cards');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* создаем функцию, в которой находится обёртка, в которую
закидываем карточки, на вход принимает данные (могут быть какие угодно)
и обёртку (может быть какая угодно) */
const renderCardElement = (data, wrapElement) => {

  const card = getCardElement(data);

  wrapElement.prepend(card);

  return wrapElement;
}


// создаем функцию по созданию карточки
const getCardElement = ({ name, link }) => {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);
  const popupViewElement = document.querySelector('.popup_type_view');
  const popupViewCloseButtonElement = popupViewElement.querySelector('.popup__close-icon');

  cardElement.querySelector('.cards__image').src = link;
  cardElement.querySelector('.cards__image').alt = name;
  cardElement.querySelector('.cards__title').textContent = name;

  cardElement.querySelector('.cards__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__button-like_active');
  });

  cardElement.querySelector('.cards__button-delete').addEventListener('click', (evt) => {
    cardElement.remove();
  });

  cardElement.querySelector('.cards__image').addEventListener('click', (evt) => {
    popupViewElement.querySelector('.popup__view-image').src = link;
    popupViewElement.querySelector('.popup__view-image').alt = name;
    popupViewElement.querySelector('.popup__view-caption').textContent = name;
    openPopup(popupViewElement);
  });

  popupViewCloseButtonElement.addEventListener('click', (evt) => {
    closePopup(popupViewElement);
  });

  return cardElement;
};


const submitFormAddHandler = (evt) => {
  const data = { name: title.value, link: link.value };

  evt.preventDefault();

  renderCardElement(data, wrapElement);

  closePopup(popupAddElement);

  formEddElement.reset();
};


// создаем перебор по массиву, опускаем return и {}, т.к. return - единст.действие
initialCards.forEach((item) => renderCardElement(item, wrapElement));

formEddElement.addEventListener('submit', submitFormAddHandler);
