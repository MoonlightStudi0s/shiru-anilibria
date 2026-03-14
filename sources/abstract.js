export default class AbstractSource {

  async single(options) {
    return []
  }

  async batch(options) {
    return []
  }

  async movie(options) {
    return []
  }

  async validate() {
    return true
  }

}