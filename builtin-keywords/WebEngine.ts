/**
 * @name web
 */
export interface WebEngine {
  /**
   * Open a new browser with a specific url
   * @param url The target url
   * @template default Open a new window with ${url}
   * @template _ Open ${url} in a new window
   */
  openBrowser(url: string): Promise<void>;

  click(selector: string): Promise<void>;

  doubleClick(selector: string): Promise<void>;

  rightClick(selector: string): Promise<void>;

  sendKeys(selector: string, value: string): Promise<void>;

  closeBrowser(): Promise<void>;
}
