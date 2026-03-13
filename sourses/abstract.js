export default class AbstractSource {

  constructor() {
    this.name = "Abstract"
  }

  async search(options) {
    throw new Error("search() not implemented")
  }

}