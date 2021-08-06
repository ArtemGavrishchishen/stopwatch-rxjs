import { Subject } from 'rxjs'

const subject = new Subject()

const initialState = {
  count: 10,
}

let state = initialState

const timerStore = {
  subscribe: setState => subject.subscribe(setState),

  onStart: () => {
    state = {
      ...state,
      count: state.count + 1,
    }

    subject.next(state)
  },
  onStop: () => {
    state = initialState
    subject.next(state)
  },

  initialState,
}

export default timerStore
