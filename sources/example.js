import AbstractSource from './abstract.js'

export default new class ExampleSource extends AbstractSource {

  url = 'https://api.anilibria.tv/v3'

  async validate() {
    return true
  }

  async #search(query) {

    const title = query.titles?.[0]
    if (!title) return []

    try {

      const r = await fetch(`${this.url}/title/search?search=${encodeURIComponent(title)}`)
      const data = await r.json()

      const results = []

      for (const anime of data.list || []) {

        if (!anime.torrents) continue

        for (const t of anime.torrents.list || []) {

          results.push({
            title: anime.names?.ru || anime.names?.en || title,
            link: t.magnet,
            seeders: t.seeders || 0,
            leechers: t.leechers || 0,
            downloads: t.downloads || 0,
            hash: t.hash || Math.random().toString(36).slice(2),
            size: t.size || 0,
            date: new Date(),
            accuracy: 'high',
            type: 'best'
          })

        }

      }

      return results

    } catch {
      return []
    }

  }

  async single(query) {
    return this.#search(query)
  }

  async batch(query) {
    return this.#search(query)
  }

  async movie(query) {
    return this.#search(query)
  }

}()