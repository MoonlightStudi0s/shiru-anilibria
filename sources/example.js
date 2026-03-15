import AbstractSource from './abstract.js'

export default new class AnilibriaSource extends AbstractSource {

  url = 'https://anilibria.top/api/v1'

  async validate() {
    try {
      const res = await fetch(`${this.url}/app/status`)
      return res.ok
    } catch {
      return false
    }
  }

  async search(query) {

    const title = query?.titles?.[0]
    if (!title) return []

    try {

      const searchReq = await fetch(
        `${this.url}/app/search/releases?query=${encodeURIComponent(title)}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0"
          }
        }
      )

      const releases = await searchReq.json()

      const results = []

      for (const release of releases) {

        const torrentsReq = await fetch(
          `${this.url}/anime/torrents/release/${release.id}`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0"
            }
          }
        )

        const torrents = await torrentsReq.json()

        for (const torrent of torrents) {

          results.push({
            title: torrent.label || release.name.main,
            link: torrent.magnet,
            seeders: torrent.seeders || 0,
            leechers: torrent.leechers || 0,
            downloads: torrent.completed_times || 0,
            hash: torrent.hash,
            size: torrent.size,
            date: new Date(torrent.created_at),
            accuracy: 'high',
            type: 'best'
          })

        }

      }

      return results

    } catch (err) {
      console.log(err)
      return []
    }

  }

  async single(query) {
    return this.search(query)
  }

  async batch(query) {
    return this.search(query)
  }

  async movie(query) {
    return this.search(query)
  }

}()