import React, { useState } from 'react';

const AuthContext = React.createContext({
    profile: {
        firstName: '',
        lastName: '',
        userName: ''
    },
    isLogedIn: false,
    login: (profile) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const initialProfile = JSON.parse(localStorage.getItem('profile'));
    const [profile, setProfile] = useState(initialProfile);
    const isLogedIn = !!profile;


    const handleLogin = (profile) => {
        setProfile(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    const handleLogout = () => {
        setProfile(null);
        localStorage.removeItem('profile');
    }

    const contextValue = {
        profile: profile,
        isLogedIn: isLogedIn,
        login: handleLogin,
        logout: handleLogout
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;