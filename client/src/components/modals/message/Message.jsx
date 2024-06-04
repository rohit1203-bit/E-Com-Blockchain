import { useContext } from "react";
import ModalContext from "../../../context/modal/ModalContext";
import Backdrop from "../../backdrop/Backdrop";
import './message.scss'

const Message = () => {
  const { close, message } = useContext(ModalContext)

  return (
    <Backdrop onClick={close}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h1>
          {message}
        </h1>
        <button className="close" onClick={close}>Close</button>
      </div>
    </Backdrop>
  )
}

export default Message;