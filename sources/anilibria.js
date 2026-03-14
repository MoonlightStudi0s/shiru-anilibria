class AbstractSource {

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

export default new class AnilibriaSource extends AbstractSource {

  url = "https://api.anilibria.tv/v3"

  async validate() {
    try {
      const r = await fetch(this.url + "/title/search?search=test")
      return r.ok
    } catch {
      return false
    }
  }

  async single(options) {

    const title = options.titles?.[0]
    if (!title) return []

    const r = await fetch(`${this.url}/title/search?search=${encodeURIComponent(title)}`)
    const data = await r.json()

    const results = []

    for (const anime of data.list || []) {

      if (!anime.torrents) continue

      for (const t of anime.torrents.list || []) {

        results.push({
          title: anime.names?.ru || title,
          link: t.magnet,
          seeders: t.seeders || 0,
          leechers: t.leechers || 0,
          downloads: t.downloads || 0,
          hash: t.hash || crypto.randomUUID(),
          size: t.size || 0,
          date: new Date(),
          type: "best"
        })

      }

    }

    return results
  }

  async batch(options) {
    return this.single(options)
  }

  async movie() {
    return []
  }

}()