class AbstractSource {

  constructor() {
    this.name = "Abstract"
  }

  async validate() {
    return true
  }

  async searchAnime() {
    return []
  }

}

module.exports = AbstractSource