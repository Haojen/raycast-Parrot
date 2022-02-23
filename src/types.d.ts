interface ITranslateResult {
    webdict?: string
    errorCode: string
    translation: string[]
    web?: ITranslateResultWebItem[]
    basic?: ITranslateResultBasicItem,

    // unused
    l: string
    query: string
    returnPhrase: []
}

interface ITranslateReformatResult {
    type?: string,
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
    'us-phonetic': string
    'uk-phonetic': string
}

interface IPreferences {
    lang1: string
    lang2: string
    appId: string
    appKey: string
    isAutomaticPaste: boolean
}

interface IListItemActionPanelItem {
    copyText?: string
    queryText?: string
    currentFromLanguage?: ILanguageListItem
    currentTargetLanguage?: ILanguageListItem
    onLanguageUpdate: (language: ILanguageListItem) => void
}

interface ISayLanguageList {
    [key: string]: {
        voice: string[]
        language: string[]
    }
}

interface IReformatTranslateResult {
    title: string
    value: string
}

interface ILanguageListItem {
    title: string
    flag: string
    value: string
}

interface IActionCopyListSection {
    copyText?: string
    autoPasteText?: string
}
