import {exec} from "child_process";

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

// TODO： 设置默认拷贝驼峰方式
// TODO: 设置默认是否自动粘贴到 focus input text
export function useSymbolSegmentationArrayText(textArray: string[]): string {
    return textArray.join('；')
}