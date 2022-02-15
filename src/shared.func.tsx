import {exec} from "child_process";
import axios from "axios";
import querystring from "querystring";
import crypto from "crypto";
import {getPreferenceValues} from "@raycast/api";

export function truncate(q: string): string{
    const len = q.length
    return len<=20 ? q : q.substring(0, 10) + len + q.substring(len-10, len)
}

export function playTextSound(text: string): void {
    exec(`say ${text}`)
}

export function reformatTranslateResult(data: string[], limitResultAmount: number = 10): IReformatTranslateResult[] {
    const dataLength = data?.length - 1
    let finalData:string[] = data
    if (limitResultAmount > 0 && dataLength >= limitResultAmount) {
        finalData = data.slice(0, limitResultAmount - 1)
        finalData.push(data[dataLength])
    }

    function truncate(string: string, length: number = 16, separator: string = '..') {
        if (string.length <= length) return string

        return string.substring(0, length) + separator
    }

    const finalDataLength = finalData.length - 1
    return finalData.map((text, idx) => {
        return {
            title: finalDataLength === idx && idx > 0 ? 'All' : truncate(text),
            value: text
        }
    })
}

export function reformatTranslateResult2(data: ITranslateResult): ITranslateReformatResult[] {
    const reformatData:ITranslateReformatResult[] = []

    reformatData.push({
        children: data.translation.map((text, idx) => {
            return {
                phonetic: data.basic?.phonetic,
                title: text,
                content: text,
                key: text + idx
            }
        })
    })

    reformatData.push({
        children: data.basic?.explains?.map((text, idx) => {
            return {
                title: text,
                content: text,
                key: text + idx
            }
        })
    })

    reformatData.push({
        type: 'Other from Web Results',
        children: data.web?.map((webResultItem, idx) => {
            return {
                key: webResultItem.key + idx,
                title: webResultItem.key,
                content: useSymbolSegmentationArrayText(webResultItem.value)
            }
        })
    })

    return reformatData
}

// API Document https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html
export function requestYoudaoAPI(queryText: string, translateTargetLanguage: string): Promise<any> {
    const preferences: IPreferences = getPreferenceValues();
    const APP_ID = preferences.appId
    const APP_KEY = preferences.appKey

    const sha256 = crypto.createHash('sha256')
    const timestamp = Math.round(new Date().getTime() / 1000)
    const salt = timestamp
    const sha256Content = APP_ID + truncate(queryText) + salt + timestamp + APP_KEY
    const sign = sha256.update(sha256Content).digest('hex')

    return axios.post('https://openapi.youdao.com/api', querystring.stringify({
        sign,
        salt,
        from: 'auto',
        signType: 'v3',
        q: queryText,
        appKey: APP_ID,
        curtime: timestamp,
        to: translateTargetLanguage
    }))
}

// TODO： 设置默认拷贝驼峰方式
// TODO: 设置默认是否自动粘贴到 focus input text
export function useSymbolSegmentationArrayText(textArray: string[]): string {
    return textArray.join('；')
}