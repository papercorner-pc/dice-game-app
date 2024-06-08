import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from 'react'
import { ErrorComponent } from './error-component'
import { addEventListener, fetch, useNetInfo } from "@react-native-community/netinfo";

/**
 * This component handles whenever the user encounters a JS error in the
 * app. It follows the "error boundary" pattern in React. We're using a
 * class component because according to the documentation, only class
 * components can be error boundaries.
 *
 * Read more here:
 *
 * @link: https://reactjs.org/docs/error-boundaries.html
 */
export const ErrorBoundary = (props) => {

  const [error, setError] = useState(null)
  const [errorInfo, setErrorInfo] = useState(null)
  const [isConnectedNet, setIsConnected] = useState(true)
  const { type, isConnected } = useNetInfo();

  useEffect(() => {
    const unsubscribe = addEventListener(networkState => {
      setIsConnected(networkState.isConnected)
    })
    return unsubscribe
  }, [])

  // If an error in a child is encountered, this will run
  // componentDidCatch(error, errorInfo) {
  //   // Catch errors in any components below and re-render with error message
  //   this.setState({
  //     error,
  //     errorInfo,
  //   })

  //   // You can also log error messages to an error reporting service here
  //   // This is a great place to put BugSnag, Sentry, Honeybadger, etc:
  //   // reportErrorToCrashReportingService(error)
  // }

  // Reset the error back to null
  const resetError = () => {
    fetch().then(state => {
      console.log('---network', state)
      setError(null)
      setErrorInfo(null)
      setIsConnected(state.isConnected);
    });
  }

 
  // Render an error UI if there's an error; otherwise, render children
    return error || isConnected === false ? (
      <ErrorComponent
        onReset={resetError}
        error={error}
        errorInfo={errorInfo}
        isConnected={isConnected}
      />
    ) : (
      props.children
    )
}
