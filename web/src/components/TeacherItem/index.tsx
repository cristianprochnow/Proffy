import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import { api } from '../../services/api'

import './styles.css'

export interface ITeacher {
  id: number
  subject: string
  cost: number
  name: string
  avatar: string
  whatsapp: string
  bio: string
}
interface ITeachers {
  teacherInformation: ITeacher
}

const TeacherItem: React.FC<ITeachers> = ({ teacherInformation }) => {
  const {
    id,
    name,
    subject,
    bio,
    avatar,
    cost,
    whatsapp
  } = teacherInformation

  function createNewConnection() {
    api.post('/connections', {
      user_id: id
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={avatar}
          alt={name}
        />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {cost}</strong>
        </p>

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          onClick={createNewConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem
