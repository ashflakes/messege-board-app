import { useState } from 'react'
import './App.css';
import CommentBoard from './components/CommentBoard';

import { UsersContext } from './components/context/UsersContext'

import userOne from './avatars/Avengers-Black-Widow-icon.png'
import userTwo from './avatars/Avengers-Captain-America-icon.png'
import userThree from './avatars/Avengers-Loki-icon.png'
import userFour from './avatars/Avengers-Thor-icon.png'

const users = [
  { 
    id: 1,
    avatar: userOne,
    navColor: 'black',
    name: 'Black Widow'
  },
  {
    id: 2,
    avatar: userTwo,
    navColor: 'lightblue',
    name: 'Cap'
  }, 
  {
    id: 3,
    avatar: userThree,
    navColor: 'yellow',
    name: 'Loki'
  },
  {
    id: 4,
    avatar: userFour,
    navColor: 'gray',
    name: 'Thor'
  }  
]


const App = () => {  
  const [currentUser, setCurrentUser] = useState({})

  const createUserTemplate = (user) => {
    return (
      <img onClick={() => setCurrentUser(user)} className='avatar' src={user.avatar} key={user.id} /> 
    )
  }

  return (
    <>
      <UsersContext.Provider value={{ users, currentUser }}>
        <div style={{backgroundColor: currentUser.navColor}} className='navbar'>
          {users.map(user => createUserTemplate(user))}
        </div>
        <CommentBoard/>
      </UsersContext.Provider>
    </>
  )
}

export default App;
