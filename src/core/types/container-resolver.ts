import { container } from 'tsyringe'

export function containerResolver() {
  return (target: any) => {
    const connectedCallback = target.prototype.connectedCallback

    target.prototype.connectedCallback = function () {
      this.addEventListener('request', (event: CustomEvent) => {
        try {
          event.detail.instance = container.resolve(event.detail.type)
          event.stopPropagation()
        } catch {}
      })

      if (connectedCallback) {
        connectedCallback()
      }
    }

    return target
  }
}
