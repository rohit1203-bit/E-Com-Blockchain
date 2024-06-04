import { createContext, useState } from 'react'

const ModalContext = createContext({})

export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState('')
  const close = () => {
    setModalOpen(false)
    setMessage('')
  }
  const open = () => setModalOpen(true)

  return (
    <ModalContext.Provider value={{ message, setMessage, modalOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext;