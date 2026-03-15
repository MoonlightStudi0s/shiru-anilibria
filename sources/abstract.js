/** @typedef {import('../').TorrentSource} TorrentSource */

/** @implements {TorrentSource} */
export default class AbstractSource {

  /**
   * @type {import('../').SearchFunction}
   */
  async single () {
    throw new Error('Source does not implement method #single()')
  }

  /**
   * @type {import('../').SearchFunction}
   */
  async batch () {
    throw new Error('Source does not implement method #batch()')
  }

  /**
   * @type {import('../').SearchFunction}
   */
  async movie () {
    throw new Error('Source does not implement method #movie()')
  }

  /**
   * @type {() => Promise<boolean>}
   */
  async validate () {
    throw new Error('Source does not implement method #validate()')
  }

}