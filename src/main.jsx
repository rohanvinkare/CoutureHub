import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import ErrorState from "./components/common/ErrorState";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorState>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorState>
)
