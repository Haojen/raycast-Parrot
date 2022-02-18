import {useEffect, useState, Fragment} from 'react'
import {ListItemActionPanelItem} from "./components"
import {getPreferenceValues, Icon, List,} from '@raycast/api'
import {getItemFromLanguageList, reformatTranslateResult, requestYoudaoAPI} from './shared.func'

let fetchResultStateCode: string = '-1'
let delayFetchTranslateAPITimer:NodeJS.Timeout

export default function () {
    const [inputState, updateInputState] = useState<string>()
    const [isLoadingState, updateLoadingState] = useState<boolean>(false)

    const preferences: IPreferences = getPreferenceValues();
    const defaultLanguage1 = getItemFromLanguageList(preferences.lang1)
    const defaultLanguage2 = getItemFromLanguageList(preferences.lang2)

    const [translateTargetLanguage, updateTranslateTargetLanguage] = useState<ILanguageListItem>(defaultLanguage1)
    const [translateResultState, updateTranslateResultState] = useState<ITranslateReformatResult[]>()

    const [translateFromLanguageState, updateTranslateFromLanguageState] = useState<ILanguageListItem>()
    const [currentTargetLanguageState, updateCurrentTargetLanguageState] = useState<ILanguageListItem>()

    useEffect(() => {
        if (!inputState) return // Prevent when mounted run

        clearTimeout(delayFetchTranslateAPITimer)
        delayFetchTranslateAPITimer = setTimeout(() => {
            requestYoudaoAPI(inputState, translateTargetLanguage.value).then(res => {
                const resData:ITranslateResult = res.data

                const [a, b] = resData.l.split('2') // en2zh

                if (a === b) {
                    updateTranslateTargetLanguage(a === preferences.lang1 ? defaultLanguage2 : defaultLanguage1)
                    return
                }

                updateLoadingState(false)
                fetchResultStateCode = res.data.errorCode
                updateTranslateResultState(reformatTranslateResult(resData))

                updateTranslateFromLanguageState(getItemFromLanguageList(a))
                updateCurrentTargetLanguageState(getItemFromLanguageList(b))
            })
        }, 800)
    }, [inputState, translateTargetLanguage])


    function ListDetail()  {
        if (fetchResultStateCode === '-1') return null

        if (fetchResultStateCode === '0') {
            return <Fragment>
                {
                    translateResultState?.map( (result, idx) => {
                        return <List.Section key={ idx } title={result.type}>
                            {
                                result.children?.map( item => {
                                    return (
                                        <List.Item
                                            key={ item.key }
                                            icon={ Icon.Text }
                                            title={ item.title}
                                            subtitle={ item?.subtitle }
                                            accessoryTitle={ item.phonetic }
                                            actions={
                                                <ListItemActionPanelItem
                                                    copyText={ item?.subtitle || item.title }
                                                    showPlaySoundButton={ !!item.phonetic }
                                                    onLanguageUpdate={ updateTranslateTargetLanguage}
                                                    currentTargetLanguage={ currentTargetLanguageState }
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

        // TODO: Try use Detail
        return  <List.Item title={'Transition Error'} subtitle={ fetchResultStateCode } />
    }
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

    return (
        <List
            isLoading={ isLoadingState }
            searchBarPlaceholder={'Translate to..'}
            onSearchTextChange={ inputText => onInputChangeEvt(inputText) }
            navigationTitle={ translateFromLanguageState?.title && currentTargetLanguageState?.title ?
                `Parrot: ${translateFromLanguageState.title} → ${currentTargetLanguageState.title}` : 'Parrot' }
            actions={ <ListItemActionPanelItem currentTargetLanguage={ currentTargetLanguageState }  onLanguageUpdate={ updateTranslateTargetLanguage }/> }>

            <ListDetail/>
        </List>
    )
}
