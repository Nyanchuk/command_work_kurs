import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './css/myprofile.module.css';
import logo from '../img/logo.svg';
import Yoga from '../img/img_profile/yoga_profile.png';
import Stretch from '../img/img_profile/stretch_profile.png';
import Bodyflex from '../img/img_profile/bodyflex_profile.png';
import BlackLogo from '../components/Logo/BlackLogo';

export default function MyProfilePage() {
  // Стейт для отображения модального окна №1
  const [showModal, setShowModal] = useState(false);
  // Стейт для отображения модального окна №2
  const [showModalTwo, setShowModalTwo] = useState(false);
  // Функция клика по кнопке "Смена логина"
  const handleEditLoginClick = () => {
    setShowModal(true);
  };
  // Функция клика по кнопке "Смена пароля"
  const handleEditLoginClickTwo = () => {
    setShowModalTwo(true);
  };
  // Функция для изоляции
  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  // Функция для закрытия модального окна
  const handleClickOutside = (event) => {
    if ((showModal || showModalTwo) && !event.target.closest(`.${styles.modal}`)) {
      setShowModal(false);
      setShowModalTwo(false);
    }
  };
  // Сохранение пароля
  const handleSavePasswordClick = () => {
    const newPassword = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    if (!newPassword.length || !repeatPassword.length) {
      console.log('Заполните поля ввода');
    } else if (newPassword.length < 6 && repeatPassword.length < 6) {
      console.log('Слишком короткий пароль');
    } else if (newPassword !== repeatPassword) {
      console.log('Ваши пароли не совпадают');
    } else {
      fetch('/your-api-endpoint', {
        method: 'PUTCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      }).then((response) => {
        // Обработка успешного ответа от сервера
        if (response.ok) {
          console.log('Пароль успешно обновлен');
          setShowModalTwo(false); // Закрыть модальное окно
        } else {
          console.error('Ошибка при обновлении пароля');
        }
      }).catch((error) => {
        console.error('Ошибка сети:', error);
      });
    }
  };
  // Сохранение логина
  const handleSaveLoginClick = () => {
    const newLogin = document.getElementById('username').value;
    const validUsername = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if (!newLogin) {
      console.log('Заполните поле ввода');
    } else if (!newLogin.match(validUsername)) {
      console.log('Логин должен содержать только латинские буквы, цифры и не начинаться с дефиса или подчеркивания');
    } else {
      // Отправка запроса на обновление пароля
      fetch('/your-api-endpoint', {
        method: 'PUTCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: newLogin }),
      }).then((response) => {
        // Обработка успешного ответа от сервера
        if (response.ok) {
          console.log('Пароль успешно обновлен');
          setShowModalTwo(false); // Закрыть модальное окно
        } else {
          console.error('Ошибка при обновлении пароля');
        }
      }).catch((error) => {
        console.error('Ошибка сети:', error);
      });
    }
  }
  return (
    <div className={styles.wrapper} onClick={handleClickOutside}>
      <div className={styles.header}>
        <BlackLogo route="/profile" />
        <div className={styles.header_profile}>
          <div className={styles.header_photo} />
          <div>Профиль</div>
        </div>
      </div>
      <div className={styles.header_bottom}>
        <span className={styles.header_title}>Мой профиль</span>
        <span className={styles.header_info}>Логин: LapaBelka</span>
        <span className={styles.header_info}>Пароль: 123456789</span>
        <button className={styles.header_button} onClick={handleEditLoginClick} type="submit">Редактировать логин</button>
        {showModal && (
        <form className={styles.modalOverlay}>
          <div className={styles.modal} onClick={handleModalClick}>
            {/* Содержимое модального окна */}
            <div className={styles.modalContent}>
              {/* ... (форма или другие элементы для редактирования логина) */}
              <img src={logo} alt="logo" />
              <div className={styles.main_info}>
                <span className={styles.main_text}>Новый логин:</span>
                <input className={styles.main_form} type="text" id="username" name="username" placeholder="Введите новый логин" />
                <div
                  className={styles.main_criterion}
                >
                  ❖ Логин не может начинаться с дефиса или подчеркивания
                </div>
                <div
                  className={styles.main_criterion}
                >
                  ❖ Логин должен содержать латинские буквы
                </div>
              </div>
              <button className={styles.main_button_one} onClick={handleSaveLoginClick} type="button">Сохранить</button>
            </div>
          </div>
        </form>
        )}
        <button className={styles.header_button} onClick={handleEditLoginClickTwo} type="button">Редактировать пароль</button>
        {showModalTwo && (
        <form className={styles.modalOverlay}>
          <div className={styles.modal} onClick={handleModalClick}>
            {/* Содержимое модального окна */}
            <div className={styles.modalContent}>
              {/* ... (форма или другие элементы для редактирования пароля) */}
              <img src={logo} alt="logo" />
              <div className={styles.main_info}>
                <span className={styles.main_text}>Новый пароль:</span>
                <input className={styles.main_form} type="text" id="password" name="username" placeholder="Введите новый пароль" />
                <input className={styles.main_form} type="text" id="repeatPassword" name="username" placeholder="Повторите пароль" />
                <div
                  className={styles.main_criterion}
                >
                  ❖ Пароль не должен быть короче 6 символов
                </div>
                <div
                  className={styles.main_criterion}
                >
                  ❖ Ваши пароли должны совпадать
                </div>
              </div>
              <button className={styles.main_button_one} onClick={handleSavePasswordClick} type="button">Сохранить</button>
            </div>
          </div>
        </form>
        )}
      </div>
      <div>
        <span className={styles.header_title}>Мои курсы</span>
        <div className={styles.main}>
          <div className={styles.main_nav}>
            <img className={styles.main_direct} src={Yoga} alt="logo" />
            <Link to="/description" className={styles.main_button}>Перейти →</Link>
          </div>
          <div className={styles.main_nav}>
            <img className={styles.main_direct} src={Stretch} alt="logo" />
            <Link to="/description" className={styles.main_button}>Перейти →</Link>
          </div>
          <div className={styles.main_nav}>
            <img className={styles.main_direct} src={Bodyflex} alt="logo" />
            <Link to="/description" className={styles.main_button}>Перейти →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
