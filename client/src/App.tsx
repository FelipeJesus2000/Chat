import { FormEvent, useEffect, useRef, useState } from 'react'
import './App.css'
import Button from './components/Button'
import Input from './components/Input'
import Output from './components/Output'
import { socket } from './socket'
import { Link } from 'react-router-dom'



function App() {
  const [iSocket] = useState(socket());
  const [messages, setMessages] = useState(new Array())
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {

      const handleMessage = (message: any) => {
          console.log("message received", message);
          try {
              const newMessage: { text: string, who: 'sender' | 'receiver', datetime: Date } = {
                  text: message.text,
                  datetime: new Date(message.datetime),
                  who: 'receiver',
              };
              setMessages([...messages, newMessage]);
          } catch (error) {
              console.error('Error handling message:', error);
          }
      }

      iSocket.on('message', handleMessage);

      return () => {
          iSocket.off('message', handleMessage);
      }
  }, [messages])


  const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement);
      console.log(formData.get('input'));


      if (formData.get('input') !== null && formData.get('input') !== "") {
          iSocket.emit('message', formData.get('input'))
          setMessages([...messages, {
              text: formData.get('input'),
              datetime: new Date(),
              who: 'sender'
          }])
          form.current?.reset()
          console.log(messages);
      }
  }

  return (

      <div className='container' >
          <Output id={'output'} >
              {messages}
          </Output>
          <form onSubmit={handleSubmit} ref={form} >
              <Input />
              <Button text="Send" />
          </form>
      </div>

  )


}


export default App

