import React from 'react'
import { CSSTransition } from 'react-transition-group'

interface TransitionProps { 
  show: boolean;
  enter: string;
  enterFrom: string;
  enterTo: string;
  leave: string;
  leaveFrom: string;
  leaveTo: string; 
}

const Transition: React.FC<TransitionProps> = (props) => {
  const { show, enter, enterFrom, enterTo, leave, leaveFrom, leaveTo, children } = props;
  const enterClasses = enter.split(' ')
  const enterFromClasses = enterFrom.split(' ')
  const enterToClasses = enterTo.split(' ')
  const leaveClasses = leave.split(' ')
  const leaveFromClasses = leaveFrom.split(' ')
  const leaveToClasses = leaveTo.split(' ')

  return (
    <CSSTransition
      unmountOnExit
      in={show}
      addEndListener={(node, done) => {
        node.addEventListener('transitionend', done, false)
      }}
      onEnter={(node: any) => {
        node.classList.add(...enterClasses, ...enterFromClasses)
      }}
      onEntering={(node: any) => {
        node.classList.remove(...enterFromClasses)
        node.classList.add(...enterToClasses)
      }}
      onEntered={(node: any) => {
        node.classList.remove(...enterToClasses, ...enterClasses)
      }}
      onExit={(node) => {
        node.classList.add(...leaveClasses, ...leaveFromClasses)
      }}
      onExiting={(node) => {
        node.classList.remove(...leaveFromClasses)
        node.classList.add(...leaveToClasses)
      }}
      onExited={(node) => {
        node.classList.remove(...leaveToClasses, ...leaveClasses)
      }}
    >
      {children}
    </CSSTransition>
  )
}

export default Transition