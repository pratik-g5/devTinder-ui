import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import appStore from './redux/appStore';
import { Provider } from 'react-redux';
import Feed from './components/Feed.jsx';
import Connections from './components/Connections.jsx';
import Requests from './components/Requests.jsx';
import ChangePassword from './components/ChangePassword.jsx';

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={<Body />}
            >
              <Route
                path="/"
                element={<Feed />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/connections"
                element={<Connections />}
              />
              <Route
                path="/requests"
                element={<Requests />}
              />
              <Route
                path="/changePassword"
                element={<ChangePassword />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
