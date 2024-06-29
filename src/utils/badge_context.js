import React, { useState, useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { getReadDeliveredNotification } from './notificationService';

// apn badge context to access badge number
export const APNBadgeContext = React.createContext({
  setShowBadge: () => { },
  showBadge: false
});
export const useApnBadge = () => React.useContext(APNBadgeContext);

export const APNBadgeProvider = (props) => {

  console.log('badge screen', showBadge)
  const [showBadge, _setShowBadge] = useState(false);
  const showBadgeRef = useRef(showBadge)

  const setShowBadge = val => {
    console.log('set badge', val);
    showBadgeRef.current = val.badgeValue;
    _setShowBadge(result.badgeValue)
  }
  const handleBadge = (state) => {
    console.log('chnage state', state)
    if (state === 'active') {
      getReadDeliveredNotification(result => {
        console.log('result badge context', result.badgeValue)
          setShowBadge(result)         
      })
    }
  }

  useEffect(() => {
    console.log('called')
    AppState.addEventListener('change', handleBadge);
    return () => {
      AppState.removeEventListener('change', handleBadge);
    }
  }, []);

  return (
    <APNBadgeContext.Provider value={{
      showBadge: showBadgeRef.current,
      setShowBadge: setShowBadge,
    }}>
      <APNBadgeProvider/>
      {props.children}
    </APNBadgeContext.Provider>
  )
}