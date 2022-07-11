import { useContext } from 'react'

import { AppContext } from '../context/context'

const useApp = () => {
  return useContext(AppContext)
}
export default useApp
