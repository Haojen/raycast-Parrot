import axios from "axios"
import crypto from 'crypto'
import querystring from 'querystring'
import {reformatTranslateResult, truncate, useSymbolSegmentationArrayText} from './shared.func'
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
    getPreferenceValues,
    CopyToClipboardAction,
} from '@raycast/api'


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

class ListItemActionPanelItem extends Component<IListItemActionPanelItem> {
    render() {
        const SEPARATOR = '；'
        const copyTextArray = this.props.copyText.split(SEPARATOR)
              copyTextArray.length > 1 && copyTextArray.push(this.props.copyText)
        const finalTextArray = reformatTranslateResult(copyTextArray)

        return <ActionPanel>
            <ActionPanelSection>
                {
                    finalTextArray.map( (textItem, key) => {
                        return <CopyToClipboardAction
                            title={ `Copy ${ textItem.title }`} content={ textItem.value } key={key}/>
                    })
                }
            </ActionPanelSection>
            {
                this.props.showPlaySoundButton &&
                <ActionPanelSection title="Language">
                    <ActionPanelItem title="en2zh" icon={ Icon.Globe }/>
                </ActionPanelSection>
            }
        </ActionPanel>
    }
}

export default function () {
    const [inputState, updateInputState] = useState<string>()
    const [isLoadingState, updateLoadingState] = useState<boolean>(false)
    const [translateResultState, updateTranslateResultState] = useState<ITranslateResult>()

    const preferences: IPreferences = getPreferenceValues();

    const salt = randomId()
    const APP_ID = preferences.appId
    const APP_KEY = preferences.appKey
    const sha256 = crypto.createHash('sha256')

    useEffect(() => {
        // Prevent when mounted run
        if (!inputState) return;

        const timestamp = Math.round(new Date().getTime() / 1000)
        const sha256Content = APP_ID + truncate(inputState) + salt + timestamp + APP_KEY
        const sign = sha256.update(sha256Content).digest('hex')

        delayFetchTranslateAPITimer = setTimeout(() => {
            axios.post('https://openapi.youdao.com/api', querystring.stringify({
                sign,
                salt,
                from: 'auto',
                to: 'zh-CHS',
                signType: 'v3',
                q: inputState,
                appKey: APP_ID,
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
                                actions={
                                    <ListItemActionPanelItem
                                        showPlaySoundButton={ !!translateResultState?.basic?.phonetic }
                                        copyText={ useSymbolSegmentationArrayText(translateResultState.translation) }/>
                                }
                                icon={ Icon.Text }
                                accessoryTitle={ translateResultState?.basic?.phonetic }
                                title={ useSymbolSegmentationArrayText(translateResultState.translation) }/>
                            {
                                translateResultState?.basic?.explains?.map( (item, idx) => {
                                    return (
                                        <ListItem
                                            key={ idx }
                                            title={item}
                                            icon={ Icon.Text }
                                            actions={<ListItemActionPanelItem copyText={ item}/>}
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
                                            subtitle={ useSymbolSegmentationArrayText(webResultItem.value)}
                                            actions={
                                                <ListItemActionPanelItem
                                                    copyText={ useSymbolSegmentationArrayText(webResultItem.value) }/>}
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
              isLoading={ isLoadingState }
              actions={ <ListActionPanelItem/> }
              onSearchTextChange={ inputText => onInputChangeEvt(inputText) }>
            <ListDetail/>
        </List>
    )
}