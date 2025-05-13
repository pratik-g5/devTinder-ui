import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/body.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import appStore from './redux/appStore.jsx';
import { Provider } from 'react-redux';
import Feed from './components/Feed.jsx';

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
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
