import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/48127848?s=460&u=53bd5f492653a46d2d6a26a15964c8bacc5a5d02&v=4"
          alt="Cristian Prochnow"
        />
        <div>
          <strong>Cristian Prochnow</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>
        Full Stack Developer and aspiring UI/UX Designer.
        <br /><br />
        Passionate about technology and the power it has to change people's lives.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 100,00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem
