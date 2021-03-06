import { TYPE_UNHANDLED_ERROR, TYPE_UNHANDLED_REJECTION } from '../bus'
import { SupportedErrorEvent } from '../container/Errors'
import { isNodeError } from './nodeStackFrames'
import { getOriginalStackFrames, OriginalStackFrame } from './stack-frame'

export type ReadyRuntimeError = {
  id: number
  runtime: true
  error: Error
  frames: OriginalStackFrame[]
}

export async function getErrorByType(
  ev: SupportedErrorEvent
): Promise<ReadyRuntimeError> {
  const { id, event } = ev
  switch (event.type) {
    case TYPE_UNHANDLED_ERROR:
    case TYPE_UNHANDLED_REJECTION: {
      return {
        id,
        runtime: true,
        error: event.reason,
        frames: await getOriginalStackFrames(
          isNodeError(event.reason),
          event.frames
        ),
      }
    }
    default: {
      break
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _: never = event
  throw new Error('type system invariant violation')
}
