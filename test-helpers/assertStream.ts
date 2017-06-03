import { map, take, runEffects } from '@most/core'
import { Stream } from '@most/types'
import { newDefaultScheduler } from '@most/scheduler'
import { eq } from '@briancavalier/assert'

export function assertStream<A>(expected: Array<A>, stream: Stream<A>): Promise<Array<A>> {
  const results: Array<A> = []

  return runEffects(map(x => { results.push(x) }, take(expected.length, stream)), newDefaultScheduler()).then(() => results).then(eq(expected))
}
