import crypto from 'crypto'
import axios from "axios";
import {exec} from 'child_process'
import {Component, Fragment, useEffect, useState} from 'react'
import {
    Icon,
    List,
    randomId,
    ListItem,
    ListSection,
    ActionPanel,
    ActionPanelItem,
    ActionPanelSection,
    CopyToClipboardAction,
} from '@raycast/api'
import querystring from 'querystring'

import per from './options'

// per()

let delayFetchTranslateAPITimer:NodeJS.Timeout


class ListActionPanelItem extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <ActionPanel>
            <ActionPanelItem title="en2zh" icon={ Icon.Globe }/>
        </ActionPanel>
    }
}

class ListItemActionPanelItem extends Component<any, any> {
    public copyContent: string
    public showPlaySoundItem: boolean
    constructor(props: any) {
        super(props)
        this.copyContent = ''
        this.showPlaySoundItem = false
    }
    Foo() {
        return <ActionPanelItem title="en2zh" icon={ Icon.Globe }/>
    }
    render() {
        return <ActionPanel>
            <ActionPanelSection>
                <CopyToClipboardAction title="Copy" content={ this.copyContent }/>
            </ActionPanelSection>
            <ActionPanelSection title="Language">
                <ActionPanelItem title="en2zh" icon={ Icon.Globe }/>
            </ActionPanelSection>
        </ActionPanel>
    }
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

        function truncate(q: string){
            const len = q.length
            return len<=20 ? q : q.substring(0, 10) + len + q.substring(len-10, len)
        }

        const salt = randomId()
        const inputQueryText = inputState
        const sha256 = crypto.createHash('sha256')
        const timestamp = Math.round(new Date().getTime() / 1000)
        const sha256Content = APP_ID + truncate(inputQueryText) + salt + timestamp + APP_KEY
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

    function playTextSound(text: string) {
        exec(`say ${text}`)
    }

    function ListDetail() {
        // success
        if (translateResultState) {
            if (translateResultState.errorCode === '0') {
                return (
                    <Fragment>
                        <ListSection>
                            <ListItem
                                actions={ <ListItemActionPanelItem/> }
                                icon={ Icon.Text }
                                title={ translateResultState.translation.join('') }
                                accessoryTitle={ translateResultState?.basic?.phonetic }
                            />
                            {
                                translateResultState?.basic?.explains?.map( (item, idx) => {
                                    return (
                                        <ListItem
                                            key={ idx }
                                            title={item}
                                            icon={ Icon.Text }
                                            actions={<ListItemActionPanelItem/>}
                                        />
                                    )
                                })
                            }
                        </ListSection>
                        <ListSection title="Other from Web Results">
                            {
                                translateResultState?.web?.map( (webResultItem, idx) => {
                                    return (
                                        <ListItem
                                            key={idx}
                                            icon={ Icon.Text }
                                            title={ webResultItem.key }
                                            actions={<ListItemActionPanelItem/>}
                                            subtitle={ webResultItem.value.join('; ') }
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
                  <ListActionPanelItem/>
              }
              onSearchTextChange={ inputText => onInputChangeEvt(inputText) } isLoading={ isLoadingState }>
            <ListDetail/>
        </List>
    )
}