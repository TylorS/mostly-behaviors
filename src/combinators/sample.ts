import { Disposable, Stream, Sink, Scheduler } from '@most/types'
import { Arity2, curry3 } from '167'
import { Behavior } from '../types'

export const sample: SampleArity3 = curry3(
  <A, B, C>(f: Arity2<A, B, C>, sampler: Stream<A>, behavior: Behavior<B>): Stream<C> =>
    new Sample(f, sampler, behavior)
)

export interface SampleArity3 {
  <A, B, C>(f: Arity2<A, B, C>, sampler: Stream<A>, behavior: Behavior<B>): Stream<C>
  <A, B, C>(f: Arity2<A, B, C>, sampler: Stream<A>): SampleArity1<B, C>
  <A, B, C>(f: Arity2<A, B, C>, sampler: Stream<A>): SampleArity2<A, B, C>
}

export interface SampleArity2<A, B, C> {
  (sampler: Stream<A>, behavior: Behavior<B>): Stream<C>
  (sampler: Stream<A>): SampleArity1<B, C>
}

export type SampleArity1<B, C> = (behavior: Behavior<B>) => Stream<C>

class Sample<A, B, C> implements Stream<C> {
  protected f: Arity2<A, B, C>
  protected sampler: Stream<A>
  public behavior: Behavior<B>

  constructor(f: Arity2<A, B, C>, sampler: Stream<A>, behavior: Behavior<B>) {
    this.f = f
    this.sampler = sampler
    this.behavior = behavior
  }

  public run(sink: Sink<C>, scheduler: Scheduler): Disposable {
    const { f } = this
    return this.sampler.run(new SampleSink<A, B, C>(f, this, sink), scheduler)
  }
}

class SampleSink<A, B, C> implements Sink<A> {
  protected f: Arity2<A, B, C>
  protected sample: Sample<A, B, C>
  protected sink: Sink<C>

  constructor(f: Arity2<A, B, C>, sample: Sample<A, B, C>, sink: Sink<C>) {
    this.f = f
    this.sample = sample
    this.sink = sink
  }

  public event(t: number, x: A) {
    const { f, sample, sink } = this

    const { value, nextBehavior } = sample.behavior.step()

    sample.behavior = nextBehavior

    sink.event(t, f(x, value))
  }

  public error(t: number, e: Error) {
    this.sink.error(t, e)
  }

  public end(t: number) {
    this.sink.end(t)
  }
}
