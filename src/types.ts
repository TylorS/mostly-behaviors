export type BehaviorStep<A> = { value: A; nextBehavior: Behavior<A> }

export interface Behavior<A> {
  step(): BehaviorStep<A>
}
