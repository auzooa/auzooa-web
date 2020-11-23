export class Datetime {
  private constructor(private readonly date: Date) {}

  static fromIso(string: string) {
    return new Datetime(new Date(string))
  }

  toIso() {
    return this.date.toISOString()
  }
}
