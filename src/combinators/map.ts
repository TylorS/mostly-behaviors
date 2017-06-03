import { Behavior, BehaviorStep } from '../types'
import { Arity1, curry2 } from '167'

export const map: MapFn = curry2(
  <A, B>(f: Arity1<A, B>, behavior: Behavior<A>): Behavior<B> => new Map(f, behavior)
)

export interface MapFn {
  <A, B>(f: Arity1<A, B>, behavior: Behavior<A>): Behavior<B>
  <A, B>(f: Arity1<A, B>): (behavior: Behavior<A>) => Behavior<B>
}

class Map<A, B> implements Behavior<B> {
  protected f: Arity1<A, B>
  protected behavior: Behavior<A>

  constructor(f: Arity1<A, B>, behavior: Behavior<A>) {
    this.f = f
    this.behavior = behavior
  }

  public step(): BehaviorStep<B> {
    const { f, behavior } = this

    const { value, nextBehavior } = behavior.step()

    return { value: f(value), nextBehavior: new Map(f, nextBehavior) }
  }
}
