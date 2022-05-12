type COPY_TYPE = "Normal" | "Uppercase" | "LowercaseCamelCase"

interface ITranslateResult {
    l: string
    query: string
    returnPhrase: []
    errorCode: string
    translation: string[]
    web?: ITranslateResultWebItem[]
    basic?: ITranslateResultBasicItem
}

interface ITranslateReformatResult {
    type?: string
    children?: ITranslateReformatResultItem[]
}

interface ITranslateReformatResultItem {
    key: string
    phonetic?: string
    title: string
    subtitle?: string
}

interface ITranslateResultWebItem {
    key: string
    value: string[]
}

interface ITranslateResultBasicItem {
    explains: string[]
    phonetic?: string
    "us-phonetic": string
    "uk-phonetic": string
}

interface IPreferences {
    lang1: string
    lang2: string
    appId: string
    appKey: string
    isAutomaticPaste: boolean
    delayFetchTranslateAPITime: string
}

interface IListItemActionPanelItem {
    copyText?: string
    queryText?: string
    copyMode: COPY_TYPE
    currentFromLanguage?: ILanguageListItem
    currentTargetLanguage?: ILanguageListItem
    onLanguageUpdate: (language: ILanguageListItem) => void
}

interface IReformatTranslateResult {
    title: string
    value: string
}

interface IActionCopyListSection {
    copyText?: string
    copyMode: COPY_TYPE
    autoPasteText?: string
}

interface ILanguageListItem {
    languageId: string
    languageTitle: string
    languageVoice: string[]
    googleLanguageId?: string
}
