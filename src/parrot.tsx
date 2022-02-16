import {getPreferenceValues, Icon, List,} from '@raycast/api'
import {useEffect, useState, Fragment} from 'react'
import {ListItemActionPanelItem} from "./components"
import {reformatTranslateResult2, requestYoudaoAPI} from './shared.func'

let fetchResultStateCode: string = '-1'
let delayFetchTranslateAPITimer:NodeJS.Timeout

export default function () {
    const [inputState, updateInputState] = useState<string>()
    const [isLoadingState, updateLoadingState] = useState<boolean>(false)

    const preferences: IPreferences = getPreferenceValues();

    // TODO: get from config
    const [translateTargetLanguage, updateTranslateTargetLanguage] = useState<ILanguageListItem>({
        flag: '',
        title: preferences.lang1,
        value: preferences.lang1,
    })
    const [translateResultState, updateTranslateResultState] = useState<ITranslateReformatResult[]>()


    useEffect(() => {
        if (!inputState) return // Prevent when mounted run

        delayFetchTranslateAPITimer = setTimeout(() => {
            requestYoudaoAPI(inputState, translateTargetLanguage.value).then(res => {
                const resData:ITranslateResult = res.data

                const [a, b] = resData.l.split('2') // en2zh 2 is split symbol

                if (a === b) {
                    if (a === preferences.lang1) {
                        updateTranslateTargetLanguage({
                            title: preferences.lang2,
                            value: preferences.lang2,
                            flag: ''
                        })
                        return
                    }

                    if (a === preferences.lang2) {
                        updateTranslateTargetLanguage({
                            title: preferences.lang1,
                            value: preferences.lang1,
                            flag: ''
                        })
                        return
                    }
                }

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

        // TODO: Try use Detail
        return  <List.Item title={'Transition Error'} subtitle={ fetchResultStateCode } />
    }

    return (
        <List
            isLoading={ isLoadingState }
            searchBarPlaceholder={'Translate to..'}
            onSearchTextChange={ inputText => onInputChangeEvt(inputText) }
            navigationTitle={ `Parrot ${ preferences.lang1  } to ${ translateTargetLanguage.flag } ${ translateTargetLanguage.title }`}
            actions={ <ListItemActionPanelItem onLanguageUpdate={ updateTranslateTargetLanguage }/> }
        >
            <ListDetail/>
        </List>
    )
}
