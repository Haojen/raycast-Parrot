import { COPY_TYPE } from "./consts";

export interface ITranslateResult {
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

export interface ITranslateReformatResult {
    type?: string,
    children?: ITranslateReformatResultItem[]
}

export interface ITranslateReformatResultItem {
    key: string
    phonetic?: string
    title: string
    subtitle?: string
}

export interface ITranslateResultWebItem {
    key: string
    value: string[]
}

export interface ITranslateResultBasicItem {
    explains: string[]
    phonetic?: string
    'us-phonetic': string
    'uk-phonetic': string
}

export interface IPreferences {
    lang1: string
    lang2: string
    appId: string
    appKey: string
    isAutomaticPaste: boolean
}

export interface IListItemActionPanelItem {
    copyText?: string
    queryText?: string
    copyMode: COPY_TYPE
    currentFromLanguage?: ILanguageListItem
    currentTargetLanguage?: ILanguageListItem
    onLanguageUpdate: (language: ILanguageListItem) => void
}

export interface ISayLanguageList {
    [key: string]: {
        voice: string[]
        language: string[]
    }
}

export interface IReformatTranslateResult {
    title: string
    value: string
}

export interface ILanguageListItem {
    title: string
    flag: string
    value: string
}

export interface IActionCopyListSection {
    copyText?: string
    copyMode: COPY_TYPE
    autoPasteText?: string
}
