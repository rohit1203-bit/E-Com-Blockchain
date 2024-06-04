import './create.scss'
import { placeholder } from '../../assets/images'
import { useState, useRef, useContext } from "react";
import TransactionContext from '../../context/transaction/TransactionContext'
import { create } from '../../api';
import { AuthContext, ModalContext } from '../../context';

const Create = () => {
  let defaultData = { name: "", description: '', price: '' };
  const fileRef = useRef(null);

  const [image, setImage] = useState(placeholder);
  const [data, setData] = useState(defaultData)

  const { setMessage, open } = useContext(ModalContext)
  const { auth } = useContext(AuthContext)
  const { walletAddress } = useContext(TransactionContext)

  const handleImage = (e) => {
    e.preventDefault();
    const file = e.target?.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!auth.user) {
      setMessage('Please Log In First')
      open()
      return
    }
    if (!data.name || !data.description || !data.price || !fileRef?.current?.files[0]) {
      setMessage('All Fields Mandatory')
      open()
      return
    }
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description)
    formData.append('price', data.price);
    formData.append('walletAd', walletAddress);
    formData.append("image", fileRef?.current?.files[0]);

    try {
      const response = await create(formData);
      setData(defaultData)
      setImage(placeholder)
      setMessage(response.data.data.message);
      open()
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <main className='create'>
      <div className="create-container">
        <div className="create-image">
          <label htmlFor="image">
            <input
              type="file"
              style={{ display: "none" }}
              id="image"
              ref={fileRef}
              onChange={handleImage}
            />
            <img src={image} alt="" />
          </label>
        </div>
        <div className="create-info">
          <div className="detail">
            <span className="key">
              Product Name:
            </span>
            <span className="value">
              <input type="text" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
            </span>
          </div>
          <div className="detail">
            <span className="key">
              Description:
            </span>
            <span className="value description">
              <textarea name="desc" id="desc" rows="3" value={data.description} onChange={e => setData({ ...data, description: e.target.value })}></textarea>
            </span>
          </div>
          <div className="detail">
            <span className="key">
              Price:
            </span>
            <span className="value">
              <input type="text" value={data.price} onChange={e => setData({ ...data, price: e.target.value })} />
            </span>
          </div>
          <button className="buy" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </main>
  )
}

export default Create