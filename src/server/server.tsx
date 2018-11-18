import * as express from 'express'
import * as React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../shared/App'
import Html from '../shared/components/Html'
import configureStore from '../shared/redux/configureStore'
import { constructPreloadedState } from '../shared/redux/modules'

// TODO: set process.env.PUBLIC_DIR using webpackDefinePlugin when build time
const PUBLIC_DIR = 'dist/public'

const server = express()
server.use(express.static(PUBLIC_DIR)).use(handleRender)

function handleRender(req: express.Request, res: express.Response) {
  const preloadedState = constructPreloadedState({})
  const store = configureStore(preloadedState)

  res.write('<!doctype html>')

  renderToNodeStream(
    <Html src="/static/js/client.js" preloadedState={preloadedState}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    </Html>
  ).pipe(res)
}

export default server
