import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
    const [isOnline, setIsOnline] = useState(null); 
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state.isConnected ? 'Online' :'Offline');  
        });
        return () => unsubscribe();
    }, []);
    if(isOnline===null){
        console.log("Checking Network status...") 
    } 
    return (
        <NetworkContext.Provider value={{ isOnline }}>
            {children}
        </NetworkContext.Provider>
    );
};
