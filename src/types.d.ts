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
    children?: {
        key: string
        phonetic?: string
        title: string
        content: string
    }[]
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
}

interface IListItemActionPanelItem {
    copyText?: string
    showPlaySoundButton?: boolean
    onLanguageUpdate: (language: string) => void
}

interface IReformatTranslateResult {
    title: string
    value: string
}

interface ILanguageListItem {
    // id?: string
    title: string
    flag: string
    value: string
}

interface IActionCopyListSection {
    copyText?: string
    autoPasteText?: string
}
