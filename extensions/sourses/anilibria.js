import AbstractSource from "./abstract.js"

export default class AniLibria extends AbstractSource {

  constructor() {
    super()

    this.name = "AniLibria"
    this.base = "https://api.anilibria.tv/v3"
  }

  async search(options) {

    const title =
      options?.titles?.romaji ||
      options?.titles?.english ||
      options?.titles?.native

    if (!title) return []

    const res = await fetch(
      `${this.base}/title/search?search=${encodeURIComponent(title)}`
    )

    const data = await res.json()

    if (!data?.list?.length) return []

    const anime = data.list[0]

    const torrents = anime?.torrents?.list || []

    const results = []

    for (const t of torrents) {

      results.push({
        title: `${anime.names.ru} ${t.quality}`,
        magnet: t.magnet,
        seeders: t.seeders ?? 0,
        size: t.size ?? 0,
        resolution: t.quality,
        source: this.name
      })

    }

    return results
  }
}