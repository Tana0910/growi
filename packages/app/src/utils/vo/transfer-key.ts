/**
 * VO for TransferKey which has appSiteUrlOrigin and key as its public member
 */
export class TransferKey {

  private static _internalSeperator = '__grw_internal_tranferkey__';

  public appSiteUrlOrigin: string;

  public key: string;

  constructor(appSiteUrlOrigin: string, key: string) {
    this.appSiteUrlOrigin = appSiteUrlOrigin;
    this.key = key;
  }

  get getKeyString(): string {
    return TransferKey.generateKeyString(this.key, this.appSiteUrlOrigin);
  }

  /**
   * Parse a transfer key string generated by the generateKeyString static method
   * @param {string} keyString Transfer key string
   * @returns {TransferKey}
   */
  static parse(keyString: string): TransferKey {
    const generalErrorPhrase = 'Failed to parse TransferKey from string';

    const splitted = keyString.split(TransferKey._internalSeperator);

    if (splitted.length !== 2) {
      throw Error(generalErrorPhrase);
    }
    const key = splitted[0];
    const appSiteUrl = splitted[1];

    let appSiteUrlOrigin: string;
    try {
      appSiteUrlOrigin = new URL(appSiteUrl).origin;
    }
    catch (e) {
      throw Error(generalErrorPhrase + (e as Error));
    }

    return new TransferKey(appSiteUrlOrigin, key);
  }

  /**
   * Generates transfer key string (e.g. https://example.com:8080__grw_internal_tranferkey__key)
   * @param {string} key Key generated by GROWI
   * @param {string} appSiteUrlOrigin GROWI app site URL origin
   * @returns {string} Transfer key string
   */
  static generateKeyString(key: string, appSiteUrlOrigin: string): string {
    return `${key}${TransferKey._internalSeperator}${appSiteUrlOrigin}`;
  }

}
