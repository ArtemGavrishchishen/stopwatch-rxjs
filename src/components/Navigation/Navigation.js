import React, { useState } from 'react'

import store$ from '../../store'
import styles from './Navigation.module.css'

const Navigation = () => {
  const [onStart, setOnStart] = useState(true)
  const [intervalId, setIntervalId] = useState(null)
  const [onWait, setOnWait] = useState(0)

  const handleStart = () => {
    const id = setInterval(() => {
      store$.dispatch({ type: 'START_TIMER' })
    }, 1000)

    setIntervalId(id)
    setOnStart(false)
  }

  const handleStop = () => {
    store$.dispatch({ type: 'STOP_TIMER' })

    clearInterval(intervalId)
    setOnStart(true)
  }

  const handleWait = () => {
    setOnWait(prev => prev + 1)
    if (onWait === 0) {
      setTimeout(() => {
        setOnWait(0)
      }, 300)
    }

    if (onWait >= 1) {
      setOnStart(true)
      clearInterval(intervalId)
    }
  }

  return (
    <div className={styles.nav}>
      {onStart ? (
        <button
          type="button"
          className={styles.nav__button}
          onClick={() => handleStart()}
        >
          Start
        </button>
      ) : (
        <button
          type="button"
          className={styles.nav__button}
          onClick={() => handleStop()}
        >
          Stop
        </button>
      )}
      <button
        type="button"
        className={styles.nav__button}
        onClick={() => handleWait()}
      >
        Wait
      </button>
      <button
        type="button"
        className={styles.nav__button}
        onClick={() => store$.dispatch({ type: 'STOP_TIMER' })}
      >
        Reset
      </button>
    </div>
  )
}

export default Navigation
