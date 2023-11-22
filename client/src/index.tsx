import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './index.css'
import App from './App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container!)

root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Provider store={store}>
      <App />
    </Provider>
  </LocalizationProvider>
)
