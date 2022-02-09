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