/**
 * 设置 HTML 页面的语言
 *
 * @param locale 语言类型
 */
export const setHtmlPageLang = (locale: LocaleType) => {
  document.querySelector('html')?.setAttribute('lang', locale)
}
