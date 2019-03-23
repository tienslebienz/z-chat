import React, { useEffect, useState } from "react"
import { onNewMessage, onNewUser, addMessage } from "./firebase"
import InputAction from "./InputAction";

function Chat ({ user }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  window.messages = messages
  window.users = users

  useEffect(() => {
    const unsubscribeNewMessage = onNewMessage(newMessages => {
      setMessages([...window.messages, ...newMessages])
      const lastMessage = document.querySelector(".chat_messages").lastChild
      if (lastMessage) {
        lastMessage.scrollIntoView()
      }
    })
    return unsubscribeNewMessage
  }, [])


  useEffect(() => {
    const unsubscribeNewUser = onNewUser(newUsers => {
      setUsers([...window.users, ...newUsers])
    })
    return unsubscribeNewUser
  }, [])

  const getColor = () => {
    try {
      const color = users.find(({ name }) => user.name === name).color
      return { color }
    } catch (err) {
      return { color: "#000000" }
    }
  }

  const sendMessage = async () => {
    addMessage({ time: new Date().getTime(), user: user.name, message })
  }

  
  return (
    <div className="chat">
      <div className="chat_messages">
        { messages.map(({ time, user: userName, message }) => {
          return <div key={time}><strong style={getColor(userName)}>{userName}</strong> : {message}</div>
        }) }
      </div>
      <div className="chat_submit">
        <InputAction value={message} setValue={setMessage} action={sendMessage} label="Envoyer" />
      </div>
    </div>
  )
}

export default Chat