export class AppEvent<T = void> extends CustomEvent<T> {
  constructor(name: string, data?: T) {
    super(name, {
      bubbles: true,
      composed: true,
      detail: data
    })
  }
}
