interface ITranslateResult {
    translation: []
    webdict?: string
    errorCode: string
    web?: ITranslateResultWebItem[]
    basic?: ITranslateResultBasicItem,

    // unused
    l: string
    query: string
    returnPhrase: []
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
    copyText: string
    showPlaySoundButton?: boolean
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
