import AbstractSource from './abstract.js'

export default new class ExampleSource extends AbstractSource {

  url = 'https://anilibria.top/api/v1'

  async validate() {
    return true
  }

  async #search(query) {

    const title = query.titles?.[0]
    if (!title) return []

    try {

      // 1. ищем релиз
      const search = await fetch(
        `${this.url}/app/search/releases?q=${encodeURIComponent(title)}`
      )

      const searchData = await search.json()

      const results = []

      for (const release of searchData.data || []) {

        const releaseId = release.id

        // 2. получаем торренты релиза
        const torrentsReq = await fetch(
          `${this.url}/anime/torrents/release/${releaseId}`
        )

        const torrentsData = await torrentsReq.json()

        for (const torrent of torrentsData.data || []) {

          results.push({
            title: release.name?.main || title,
            link: torrent.magnet,
            seeders: torrent.seeders || 0,
            leechers: torrent.leechers || 0,
            downloads: torrent.downloads || 0,
            hash: torrent.hash || Math.random().toString(36).slice(2),
            size: torrent.size || 0,
            date: new Date(torrent.created_at || Date.now()),
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