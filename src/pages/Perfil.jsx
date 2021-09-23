import React from 'react';
import Footer from '../components/Footer';
import HeaderExplore from '../components/HeaderExplore';
import ButtonCard from '../components/ButtonCard';

export default function Profile() {
  const getUser = localStorage.getItem('user');
  const user = JSON.parse(getUser);

  if (getUser === null) {
    return (
      <>
        <HeaderExplore titlePage="Perfil" />
        Perfil
        <h3
          data-testid="profile-email"
        >
          email@email.com
        </h3>
        <ButtonCard
          page="/receitas-feitas"
          testId="profile-done-btn"
          buttonText="Receitas Feitas"
        />
        <ButtonCard
          page="/receitas-favoritas"
          testId="profile-favorite-btn"
          buttonText="Receitas Favoritas"
        />
        <ButtonCard
          page="/"
          testId="profile-logout-btn"
          onClick={ () => {
            localStorage.removeItem('cocktailsToken', 'mealsToken');
            localStorage.clear();
          } }
          buttonText="Sair"
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderExplore titlePage="Perfil" />
      Perfil
      <h3
        data-testid="profile-email"
      >
        { user.email }
      </h3>
      <ButtonCard
        page="/receitas-feitas"
        testId="profile-done-btn"
        buttonText="Receitas Feitas"
      />
      <ButtonCard
        page="/receitas-favoritas"
        testId="profile-favorite-btn"
        buttonText="Receitas Favoritas"
      />
      <ButtonCard
        page="/"
        testId="profile-logout-btn"
        onClick={ () => {
          localStorage.removeItem('cocktailsToken', 'mealsToken');
          localStorage.clear();
        } }
        buttonText="Sair"
      />
      <Footer />
    </>
  );
}
