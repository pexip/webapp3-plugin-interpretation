import React from 'react'

import { Role } from '../types/Role'
import { Volume } from './Volume/Volume'
import { AdvanceLanguageSelector } from './AdvanceLanguageSelector/AdvanceLanguageSelector'
import { BaseLanguageSelector } from './BaseLanguageSelector/BaseLanguageSelector'
import { DraggableDialog } from './DraggableDialog/DraggableDialog'
import { MuteButton } from './MuteButton/MuteButton'
import { useInterpretationContext } from '../InterpretationContext/InterpretationContext'
import { config } from '../config'
import { useTranslation } from 'react-i18next'

export const Widget = (): React.JSX.Element => {
  const { state } = useInterpretationContext()
  const { role } = state

  const { t } = useTranslation()

  const { interpreter, listener } = config

  const showAdvanceLanguageSelector = interpreter?.allowChangeDirection ?? false
  const showBaseLanguageSelector = !showAdvanceLanguageSelector
  const showListenerMuteButton = listener?.speakToInterpretationRoom ?? false

  return (
    <DraggableDialog title={t('interpretation', 'Interpretation')}>
      <div className="Container">
        {role === Role.Interpreter && (
          <>
            {showAdvanceLanguageSelector && <AdvanceLanguageSelector />}
            {showBaseLanguageSelector && <BaseLanguageSelector />}
            <MuteButton />
          </>
        )}
        {role === Role.Listener && (
          <>
            <BaseLanguageSelector />
            <Volume />
            {showListenerMuteButton && <MuteButton />}
          </>
        )}
      </div>
    </DraggableDialog>
  )
}
