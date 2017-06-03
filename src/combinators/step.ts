import { Behavior, BehaviorStep } from '../types'

export const next = <A>(behavior: Behavior<A>): BehaviorStep<A> => behavior.step()
