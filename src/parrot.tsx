import crypto from 'crypto'
import axios from "axios";
import { useEffect, useState } from 'react'
import { List } from '@raycast/api'
import querystring from 'querystring'

interface ITranslateResult {
    translation: []
    webdict?: string
    errorCode: string
    web?: ITranslateResultWebItem[]
    basic: ITranslateResultBasicItem,

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

let delayFetchTranslateAPITimer:NodeJS.Timeout
export default function () {
    const [inputState, setInputState] = useState<string>()

    useEffect(() => {
        if (!inputState || inputState.trim().length === 0) return

        const APP_ID = '0d68776be7e9be0b'
        const APP_KEY = 'MIbu7DGsOPdbatL9KmgycGx0qDOzQWCM'

        const inputQueryText = inputState
        const salt = 1039057373 // change to UUID
        const timestamp = Math.round(new Date().getTime() / 1000)
        const sha256 = crypto.createHash('sha256')
        const sha256Content = APP_ID + inputQueryText + salt + timestamp + APP_KEY
        const sign = sha256.update(sha256Content).digest('hex')

        clearTimeout(delayFetchTranslateAPITimer)
        delayFetchTranslateAPITimer = setTimeout(() => {
            axios.post('https://openapi.youdao.com/api', querystring.stringify({
                sign,
                salt,
                from: 'en',
                to: 'zh-CHS',
                signType: 'v3',
                appKey: APP_ID,
                q: inputQueryText,
                curtime: timestamp
            }))
            .then( ({data}) => {
                const a: ITranslateResult = data
                console.log(a)
            })
        }, 1000)
    }, [inputState])

    function updateInputState(inputText:string) {
        inputText.trim().length > 0 && setInputState(inputText)
    }

    return (
        <List onSearchTextChange={ inputText => updateInputState(inputText) }>
            <List.Item title={'red'}/>
        </List>
    )
}