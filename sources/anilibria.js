const AbstractSource = require("./abstract")

class AniLibria extends AbstractSource {

  constructor() {
    super()
    this.name = "AniLibria"
    this.base = "https://api.anilibria.tv/v3"
  }

  async validate() {
    return true
  }

  async searchAnime(query) {

    const title =
      query?.titles?.romaji ||
      query?.titles?.english ||
      query?.titles?.native

    if (!title) return []

    try {

      const res = await fetch(
        `${this.base}/title/search?search=${encodeURIComponent(title)}`
      )

      const data = await res.json()

      if (!data?.list?.length) return []

      const anime = data.list[0]

      const torrents = anime?.torrents?.list || []

      return torrents.map(t => ({
        title: `${anime.names?.ru || title} ${t.quality}`,
        magnet: t.magnet,
        seeders: t.seeders ?? 0,
        size: t.size ?? 0,
        source: this.name
      }))

    } catch (err) {
      console.error("AniLibria API error:", err)
      return []
    }

  }

}

module.exports = new AniLibria()