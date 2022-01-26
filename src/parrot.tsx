import crypto from 'crypto'
import axios from "axios";
import {Component, Fragment, useEffect, useState} from 'react'
import {ActionPanel, Icon, List, ListItem, ListSection} from '@raycast/api'
import querystring from 'querystring'

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

let delayFetchTranslateAPITimer:NodeJS.Timeout

class TranslateResultView extends Component<ITranslateResult> {
    render() {
        return (
            <List.Item title='red' />
        )
    }
}

class Red<ITranslateResult> {

}

export default function () {
    const [inputState, updateInputState] = useState<string>()
    const [isLoadingState, updateLoadingState] = useState<boolean>(false)
    const [translateResultState, updateTranslateResultState] = useState<ITranslateResult>()

    useEffect(() => {
        // Prevent when mounted run
        if (!inputState) {
            return
        }

        const APP_ID = '0d68776be7e9be0b'
        const APP_KEY = 'MIbu7DGsOPdbatL9KmgycGx0qDOzQWCM'

        const inputQueryText = inputState
        const salt = 1039057373 // change to UUID
        const timestamp = Math.round(new Date().getTime() / 1000)
        const sha256 = crypto.createHash('sha256')
        const sha256Content = APP_ID + inputQueryText + salt + timestamp + APP_KEY
        const sign = sha256.update(sha256Content).digest('hex')

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
            .then( res => {
                updateLoadingState(false)
                updateTranslateResultState(res.data)
            })
        }, 1000)
    }, [inputState])

    function onInputChangeEvt(inputText:string) {
        clearTimeout(delayFetchTranslateAPITimer)

        if (inputText.trim().length > 0) {
            updateLoadingState(true)
            updateInputState(inputText)
        }
        else {
            updateTranslateResultState(undefined)
            updateLoadingState(false)
        }
    }

    function ListDetail() {
        // success
        if (translateResultState) {
            if (translateResultState.errorCode === '0') {
                return (
                    <Fragment>
                        <ListSection title={translateResultState?.basic?.phonetic }>
                            <ListItem
                                title={ translateResultState.translation.join(' ') }
                                subtitle={ translateResultState?.basic?.explains.join(' ') } accessoryIcon={ Icon.Clipboard }/>
                        </ListSection>
                        <ListSection title="Other results">
                            {
                                translateResultState?.web?.map( (webResultItem, idx) => {
                                    return (
                                        <ListItem title={ webResultItem.key } subtitle={ webResultItem.value.join(' ') } key={idx}/>
                                    )
                                })
                            }
                        </ListSection>
                    </Fragment>
                )
            }

            return  <ListItem title={'Transition Error'} subtitle={translateResultState.errorCode} />
        }

        // fail
        return null
    }

    return (
        <List searchBarPlaceholder={'translate to..'}
              onSearchTextChange={ inputText => onInputChangeEvt(inputText) } isLoading={ isLoadingState }>
            <ListDetail/>
        </List>
    )
}
// import { Color, Icon, List } from "@raycast/api";
//
// export default function Command() {
//     return (
//         <List navigationTitle="Parrot translate from En to chinease">
//             <List.Item title="Built-in color" icon={{ source: Icon.ArrowClockwise, tintColor: Color.Red }} />
//             <List.Item title="HEX" icon={{ source: Icon.Bubble, tintColor: "#FF0000" }} />
//             <List.Item title="Short HEX" icon={{ source: Icon.Clipboard, tintColor: "#F00" }} />
//             <List.Item title="RGBA" icon={{ source: Icon.EyeSlash, tintColor: "rgb(255, 0, 0)" }} />
//             <List.Item title="RGBA Percentage" icon={{ source: Icon.Text, tintColor: "rgb(255, 0, 0, 1.0)" }} />
//             <List.Item title="HSL" icon={{ source: Icon.SpeakerSlash, tintColor: "hsla(200, 20%, 33%, 0.2)" }} />
//             <List.Item title="Keywords" icon={{ source: Icon.MemoryChip, tintColor: "red" }} />
//         </List>
//     );
// };