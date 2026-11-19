import { getInterpretationContext } from '../interpretationContext'
import { logger } from '../logger'

const audioInputKey = 'infinity-connect:audioInput'

const storedConstraints = localStorage.getItem(audioInputKey)
let mediaConstraints: MediaTrackConstraints | undefined =
  storedConstraints === null
    ? undefined
    : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- no-unsafe-argument
      (JSON.parse(storedConstraints) as MediaTrackConstraints)

const getConstraints = (): MediaTrackConstraints | undefined => mediaConstraints

window.addEventListener('storage', (event: StorageEvent) => {
  if (event.key === audioInputKey) {
    if (event.newValue !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- no-unsafe-argument
      const constraints: MediaTrackConstraints = JSON.parse(
        event.newValue
      ) as MediaTrackConstraints
      mediaConstraints = constraints
      getInterpretationContext()
        .changeMediaDevice(constraints)
        .catch(logger.error)
    }
  }
})

export const MainRoomMediaConstraints = {
  get: getConstraints
}
