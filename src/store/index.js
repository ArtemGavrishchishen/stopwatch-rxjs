import { Subject } from 'rxjs'
import { scan, startWith } from 'rxjs/operators'

const initialState = {
  count: 0,
}

const handlers = {
  START_TIMER: (state, payload) => ({
    ...state,
    count: state.count + 1,
  }),

  STOP_TIMER: (state, payload) => ({
    ...state,
    count: 0,
  }),

  DEFAULT: state => state,
}

const reducer = (state = initialState, { type, payload }) => {
  const handler = handlers[type] || handlers.DEFAULT

  return handler(state, payload)
}

function createStore(rootReducer) {
  const subj$ = new Subject()

  const store$ = subj$.pipe(
    startWith({ type: '__INIT__' }),
    scan(rootReducer, undefined)
  )
  store$.dispatch = action => {
    subj$.next(action)
  }

  return store$
}

const store$ = createStore(reducer)

export default store$
