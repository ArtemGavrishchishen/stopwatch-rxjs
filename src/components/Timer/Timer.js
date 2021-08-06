import React, { useState, useEffect } from 'react'
import moment from 'moment'

import store$ from '../../store'
import styles from './Timer.module.css'

const Timer = () => {
  const [time, setTime] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    store$.subscribe(state => setTime(state.count))
  }, [])

  useEffect(() => {
    setHour(moment.unix(time).utc().format('HH'))
    setMinute(moment.unix(time).utc().format('mm'))
    setSecond(moment.unix(time).utc().format('ss'))
  }, [time])

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.item}>{hour} :</div>
        <div className={styles.item}>{minute} :</div>
        <div className={styles.item}>{second}</div>
      </div>
    </div>
  )
}

export default Timer
