import { createContext } from 'react'
import { getDefaultConfig } from './defaultConfig.js'

export const AppConfigContext = createContext(getDefaultConfig())