import ReactDOM from 'react-dom/client';

//
import {GoogleOAuthProvider} from "@react-oauth/google";
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<GoogleOAuthProvider clientId="749106203888-hc6vo2b5gbiate7gnb0i8hc8u9v2clmg.apps.googleusercontent.com">
                <App />
            </GoogleOAuthProvider>
    );

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
