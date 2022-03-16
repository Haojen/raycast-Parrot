import { COPY_TYPE } from "./consts";
import { ListActionPanel } from "./components";
import { Fragment, useEffect, useState } from "react";
import { Action, ActionPanel, Color, getPreferenceValues, Icon, List } from "@raycast/api";
import { ILanguageListItem, IPreferences, ITranslateReformatResult, ITranslateResult } from "./types";
import {
    requestYoudaoAPI,
    getItemFromLanguageList,
    reformatTranslateResult,
    removeDetectCopyModeSymbol,
    detectIsUppercaseCopyOrLowerCaseCopy
} from "./shared.func";

const DELAY_FETCH_DURATION = 900
const DELAY_FETCH_DURATION2 = 900

let fetchResultStateCode = "-1"
let delayFetchTranslateTime = DELAY_FETCH_DURATION // default is 200ms, when quick switch language is 800ms
let delayFetchTranslateAPITimer: NodeJS.Timeout

export default function () {
    const [inputState, updateInputState] = useState<string>()
    const [isLoadingState, updateLoadingState] = useState<boolean>(false)

    const preferences: IPreferences = getPreferenceValues()
    const defaultLanguage1 = getItemFromLanguageList(preferences.lang1)
    const defaultLanguage2 = getItemFromLanguageList(preferences.lang2)

    if (defaultLanguage1.languageId === defaultLanguage2.languageId) {
        return (
          <List>
              <List.Item
                title={"Language Conflict"}
                icon={{ source: Icon.XmarkCircle, tintColor: Color.Red }}
                subtitle={"Your first Language with second Language must be different."}/>
          </List>
        )
    }

    const isAutoDetect = defaultLanguage1.languageId === ""
    const defaultTargetLanguage = isAutoDetect ? defaultLanguage2 : defaultLanguage1

    const [translateTargetLanguage, updateTranslateTargetLanguage] = useState<ILanguageListItem>(defaultTargetLanguage)

    const [translateResultState, updateTranslateResultState] = useState<ITranslateReformatResult[]>()

    const [translateFromLanguageState, updateTranslateFromLanguageState] = useState<ILanguageListItem>()
    const [currentTargetLanguageState, updateCurrentTargetLanguageState] = useState<ILanguageListItem>()

    const [copyModeState, updateCopyModeState] = useState<COPY_TYPE>(COPY_TYPE.Normal)

    useEffect(() => {
        if (!inputState) return // Prevent when mounted run

        updateLoadingState(true)
        delayFetchTranslateTime = DELAY_FETCH_DURATION
        requestYoudaoAPI(inputState, translateTargetLanguage.languageId).then((res) => {
            const resData: ITranslateResult = res.data

            const [a, b] = resData.l.split("2") // en2zh

            if (a === b) {
                delayFetchTranslateTime = DELAY_FETCH_DURATION2
                updateTranslateTargetLanguage(a === preferences.lang1 ? defaultLanguage2 : defaultLanguage1)
                return
            }

            updateLoadingState(false)
            fetchResultStateCode = res.data.errorCode
            updateTranslateResultState(reformatTranslateResult(resData))

            updateTranslateFromLanguageState(getItemFromLanguageList(a))
            updateCurrentTargetLanguageState(getItemFromLanguageList(b))
        })
    }, [inputState, translateTargetLanguage])

    function ListDetail() {
        if (fetchResultStateCode === "-1") return null

        if (fetchResultStateCode === "0") {
            return (
                <Fragment>
                    {translateResultState?.map((result, idx) => {
                        return (
                            <List.Section key={idx} title={result.type}>
                                {result.children?.map((item) => {
                                    return (
                                        <List.Item
                                            key={item.key}
                                            icon={Icon.Text}
                                            title={item.title}
                                            subtitle={item?.subtitle}
                                            accessoryTitle={item.phonetic}
                                            actions={
                                                <ListActionPanel
                                                    queryText={inputState}
                                                    copyMode={copyModeState}
                                                    copyText={item?.subtitle || item.title}
                                                    currentFromLanguage={translateFromLanguageState}
                                                    onLanguageUpdate={updateTranslateTargetLanguage}
                                                    currentTargetLanguage={currentTargetLanguageState}
                                                />
                                            }
                                        />
                                    )
                                })}
                            </List.Section>
                        )
                    })}
                </Fragment>
            )
        }

        // TODO: Try use Detail
        return (
            <List.Item
                title={`Sorry! We have some problems..`}
                subtitle={`code: ${fetchResultStateCode}`}
                icon={{ source: Icon.XmarkCircle, tintColor: Color.Red }}
                actions={
                    <ActionPanel>
                        <Action.OpenInBrowser
                            title="Help"
                            icon={Icon.QuestionMark}
                            url="https://github.com/Haojen/raycast-Parrot#error-code-information"
                        />
                    </ActionPanel>
                }
            />
        )
    }
    function onInputChangeEvt(queryText: string) {
        updateLoadingState(false)
        clearTimeout(delayFetchTranslateAPITimer)

        const text = queryText.trim()
        if (text.length > 0) {
            delayFetchTranslateAPITimer = setTimeout(() => {
                updateCopyModeState(() => {
                    const freshCopyModeState = detectIsUppercaseCopyOrLowerCaseCopy(text)

                    const freshInputValue = removeDetectCopyModeSymbol(text, freshCopyModeState)
                    updateInputState(freshInputValue)

                    return freshCopyModeState
                })
            }, delayFetchTranslateTime)
            return
        }

        updateTranslateResultState([])
    }

    return (
        <List
            isLoading={isLoadingState}
            searchBarPlaceholder={"Translate to"}
            actions={
                <ListActionPanel
                  queryText={inputState}
                  copyMode={copyModeState}
                  currentFromLanguage={translateFromLanguageState}
                  onLanguageUpdate={updateTranslateTargetLanguage}
                  currentTargetLanguage={currentTargetLanguageState}
                />
            }
            onSearchTextChange={onInputChangeEvt}>
            <ListDetail />
        </List>
    )
}
