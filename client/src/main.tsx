import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from "./store"
import './index.scss'
import UserModalProvider from './components/Modal/UserModal/UserModalProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Provider store={store}>
        <UserModalProvider>
            <App />
        </UserModalProvider>
      </Provider>
    </BrowserRouter>,
)
