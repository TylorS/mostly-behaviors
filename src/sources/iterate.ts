import { Behavior, BehaviorStep } from '../types'
import { Arity1, curry2 } from '167'

export const iterate: IterateFn = curry2(
  <A>(f: Arity1<A, A>, seed: A): Behavior<A> => new Iterate(f, seed)
)

export interface IterateFn {
  <A>(f: Arity1<A, A>, seed: A): Behavior<A>
  <A>(f: Arity1<A, A>): (seed: A) => Behavior<A>
}

class Iterate<A> implements Behavior<A> {
  protected value: A
  protected f: Arity1<A, A>

  constructor(f: Arity1<A, A>, seed: A) {
    this.f = f
    this.value = seed
  }

  public step(): BehaviorStep<A> {
    const { f, value } = this

    return { value: this.value, nextBehavior: new Iterate<A>(f, f(value)) }
  }
}
