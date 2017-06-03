import { Behavior, BehaviorStep } from '../types'

export const only = <A>(value: A): Behavior<A> => new Only<A>(value)

export class Only<A> implements Behavior<A> {
  protected value: A

  constructor(value: A) {
    this.value = value
  }

  public step(): BehaviorStep<A> {
    const { value } = this

    return { value, nextBehavior: this }
  }
}
