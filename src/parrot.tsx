import crypto from 'crypto'
import axios from "axios";
import {Component, Fragment, useEffect, useState} from 'react'
import {
    ActionPanel,
    ActionPanelItem,
    CopyToClipboardAction,
    Detail,
    Icon,
    List,
    ListItem,
    ListSection
} from '@raycast/api'
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
                from: 'auto',
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
                        <ListSection>
                            <ListItem
                                icon={ Icon.Star }
                                title={ translateResultState?.query }
                                actions={
                                    <ActionPanel>
                                        <ActionPanelItem title="🔊 Play sound" icon={ Icon.Message }/>
                                    </ActionPanel>
                                }
                                subtitle={ '( 🇺🇸 ' + translateResultState?.basic?.phonetic + ' |  🇬🇧 ' + translateResultState?.basic?.["uk-phonetic"] + ' )'   } />
                        </ListSection>
                        <ListSection title={ 'Abstract'}>
                            <ListItem
                                actions={
                                    <ActionPanel>
                                        <CopyToClipboardAction
                                            title="Copy"
                                            content={ translateResultState.translation.join(' ') }/>
                                    </ActionPanel>
                                }
                                icon={ Icon.Text }
                                title={ translateResultState.translation.join('') }/>
                            {
                                translateResultState?.basic?.explains?.map( (item, idx) => {
                                    return (
                                        <ListItem
                                            key={ idx }
                                            icon={ Icon.Text }
                                            title={item} actions={
                                                <ActionPanel>
                                                    <CopyToClipboardAction
                                                        title="Copy"
                                                        content={ item}/>
                                                </ActionPanel>
                                        }/>
                                    )
                                })
                            }
                        </ListSection>
                        {/* subtitle="You might see the same result" */}
                        <ListSection title="Other from Web Results">
                            {
                                translateResultState?.web?.map( (webResultItem, idx) => {
                                    return (
                                        <ListItem
                                            key={idx}
                                            icon={ Icon.Text }
                                            title={ webResultItem.key }
                                            subtitle={ webResultItem.value.join('; ') }
                                            actions={
                                                <ActionPanel>
                                                    <CopyToClipboardAction
                                                        title="CopyToClipboardAction"
                                                        content={ translateResultState.translation.join(' $ ') }/>
                                                </ActionPanel>
                                            }
                                        />
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
        <List searchBarPlaceholder={'Translate to..'}
              actions={
                  <ActionPanel>
                      <ActionPanelItem title="en2ch" icon={Icon.Globe}/>
                      <ActionPanelItem title="ch2en" icon={Icon.Globe}/>
                      <ActionPanelItem title="en2jp" icon={Icon.Globe}/>
                  </ActionPanel>
              }
              onSearchTextChange={ inputText => onInputChangeEvt(inputText) } isLoading={ isLoadingState }>
            <Detail markdown={ ` ###Blold`} />
            <ListDetail/>
        </List>
    )
}