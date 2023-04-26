import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  token: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const token = action.token;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        token
          ? ({
            isAuthenticated: true,
            isLoading: false,
            token
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const token = action.token;

    return {
      ...state,
      isAuthenticated: true,
      token
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      token: null
    };
  },
  [HANDLERS.SIGN_UP]: (state, action) => {
    const token = action.token;

    return {
      ...state,
      isAuthenticated: true,
      token
    };
  },
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const token = JSON.parse(localStorage.getItem('token'));

      dispatch({
        type: HANDLERS.INITIALIZE,
        token: token
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );


  const signIn = async (email, password) => {
    var loginDto = {
      email: email,
      password: password
    };

    let token="";
    try {
      const response = await axios.post('http://localhost:4000/auth/login', loginDto);
      token = response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }

    try {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('token', JSON.stringify(token));
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_IN,
      token: token
    });
  };

  const signUp = async (email, password, firstname, lastname, gender, birthday, phone, address) => {
    var registerDto = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      birthday: birthday,
      phone: phone,
      address: address,
      role: "customer",
    };

    let token="";
    try {
      const response = await axios.post('http://localhost:4000/auth/register', registerDto);
      token = response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }

    try {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('token', JSON.stringify(token));
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_UP,
      token: token
    });
  };

  const signOut = () => {
    try {
      localStorage.removeItem("authenticated");
      localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
    }

    
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
