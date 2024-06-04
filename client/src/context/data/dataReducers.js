import { GET_ALL, GET_BOUGHT, GET_CREATED } from '../../constants/dataConstants'

const dataReducers = (state, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        data: action.payload,

      }
    case GET_BOUGHT:
      return {
        data: action.payload,

      }
    case GET_CREATED:
      return {
        data: action.payload,
      }
    default:
      return state
  }
}

export default dataReducers