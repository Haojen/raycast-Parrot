import {languageList} from './i18n'
import {ActionCopyListSection} from "./components";
import {Component, useEffect, useState, Fragment} from 'react'
import {reformatTranslateResult2, requestYoudaoAPI} from './shared.func'

import {
    Icon,
    List,
    ActionPanel,
} from '@raycast/api'

let delayFetchTranslateAPITimer:NodeJS.Timeout

class ListItemActionPanelItem extends Component<IListItemActionPanelItem> {
    render() {
        return <ActionPanel>
            <ActionCopyListSection copyText={ this.props.copyText }/>
            {
                this.props.showPlaySoundButton &&
                <ActionPanel.Section title="Others">
                    <ActionPanel.Item title="Play Sound" icon={ Icon.Message }/>
                </ActionPanel.Section>
            }
            <ActionPanel.Section title="Language">
                {
                    languageList.map( region => {
                        return <ActionPanel.Item
                            key={ region.title }
                            title={ region.title }
                            icon={ Icon.Globe }
                            onAction={ () => this.props.onLanguageUpdate(region.value)  }
                        />
                    })
                }
            </ActionPanel.Section>
        </ActionPanel>
    }
}

let fetchResultStateCode: string = '-1'

export default function () {
    const [inputState, updateInputState] = useState<string>()
    const [isLoadingState, updateLoadingState] = useState<boolean>(false)
    // TODO: get from config
    const [translateTargetLanguage, updateTranslateTargetLanguage] = useState<string>('zh-CHS')
    const [translateResultState, updateTranslateResultState] = useState<ITranslateReformatResult[]>()


    useEffect(() => {
        // Prevent when mounted run
        if (!inputState) return;

        delayFetchTranslateAPITimer = setTimeout(() => {
            requestYoudaoAPI(inputState, translateTargetLanguage).then( res => {
                updateLoadingState(false)
                fetchResultStateCode = res.data.errorCode
                updateTranslateResultState(reformatTranslateResult2(res.data))
            })
        }, 800)
    }, [inputState, translateTargetLanguage])

    function onInputChangeEvt(inputText:string) {
        clearTimeout(delayFetchTranslateAPITimer)

        if (inputText.trim().length > 0) {
            updateInputState(inputText)
            updateLoadingState(true)
            return
        }

        updateLoadingState(false)
        updateTranslateResultState([])
    }

    function ListDetail()  {
        if (fetchResultStateCode === '-1') return null

        if (fetchResultStateCode === '0') {
            return <Fragment>
                {
                    translateResultState!.map( (result, idx) => {
                        return <List.Section key={ idx } title={result.type}>
                            {
                                result.children?.map( item => {
                                    return (
                                        <List.Item
                                            key={ item.key }
                                            icon={ Icon.Text }
                                            title={ item.title}
                                            subtitle={ item.content }
                                            accessoryTitle={ item.phonetic }
                                            actions={
                                                <ListItemActionPanelItem
                                                    copyText={ item.content }
                                                    showPlaySoundButton={ !!item.phonetic }
                                                    onLanguageUpdate={ updateTranslateTargetLanguage}
                                                />
                                            }/>
                                    )
                                })
                            }
                        </List.Section>
                    })
                }
            </Fragment>
        }

        return  <List.Item title={'Transition Error'} subtitle={ fetchResultStateCode } />
    }

    return (
        <List searchBarPlaceholder={'Translate to..'}
              isLoading={ isLoadingState }
              onSearchTextChange={ inputText => onInputChangeEvt(inputText) }
              actions={ <ListItemActionPanelItem onLanguageUpdate={ updateTranslateTargetLanguage }/> }>
            <ListDetail/>
        </List>
    )
}
