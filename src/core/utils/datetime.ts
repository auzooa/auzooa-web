export class Datetime {
  private constructor(private readonly date: Date) {}

  static fromJsDate(date: Date) {
    return new Datetime(date)
  }

  getTimeAgo() {
    const relativeTimeFormat = new Intl.RelativeTimeFormat()
    const diff = (Date.now() - this.date.valueOf()) / 1000

    const isGreaterThanADay = diff > 86_400
    if (isGreaterThanADay) {
      return this.format()
    }

    const { value, unit } = this.getUnitAndValueDate(diff)
    return relativeTimeFormat.format(value, unit as any)
  }

  toIso() {
    return this.date.toISOString()
  }

  format() {
    return new Intl.DateTimeFormat(undefined).format(this.date)
  }

  private getUnitAndValueDate(
    secondsElapsed: number
  ): { unit: Intl.RelativeTimeFormatUnit; value: number } {
    const dateUnits = {
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    }
    for (const [unit, secondsInUnit] of Object.entries(dateUnits)) {
      if (secondsElapsed >= secondsInUnit || unit === 'second') {
        const value = Math.floor(secondsElapsed / secondsInUnit) * -1
        return { value, unit: unit as Intl.RelativeTimeFormatUnit }
      }
    }

    return { value: secondsElapsed, unit: 'second' }
  }
}
