import 'reflect-metadata'
import { configure, addParameters } from '@storybook/web-components'
import '../src/core/styles/base.css'
import '../src/core/styles/theme.css'

addParameters({
  docs: {
    iframeHeight: '200px'
  },
  options: {
    storySort: (a, b) => a[1].id.localeCompare(b[1].id)
  }
})

const req = require.context('../src', true, /\.stories\.(ts|mdx)$/)
configure(req, module)
if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href
    window.history.pushState(null, null, currentLocationHref)
    window.location.reload()
  })
}
