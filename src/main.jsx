import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

import { AppConfigProvider, RouterProvider } from './provider/Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppConfigProvider
      // Podés dejarlo vacío y usa defaults; o pasar overrides acá:
      // config={{ basePath: '/', linkStrategy: 'internal', contact: { mode: 'route', url: '' } }}
    >
      <RouterProvider>
        <App />
      </RouterProvider>
    </AppConfigProvider>
  </React.StrictMode>,
)
