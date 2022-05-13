import { exec } from "child_process"
import { Component, Fragment } from "react"
import ActionFeedback from "./ActionFeedBack"
import { COPY_TYPE, LANGUAGE_LIST } from "./consts"
import { Action, ActionPanel, Clipboard, getPreferenceValues, Icon, Keyboard, List } from "@raycast/api"

interface ITranslateResult {
    inputState?: string
    copyModeState: COPY_TYPE
    currentTargetLanguage?: ILanguageListItem
    currentFromLanguageState?: ILanguageListItem
    doTranslate: (from: string, to: string) => void
    translateResultState?: ITranslateReformatResult[]
    setCurrentTargetLanguage: (lang: ILanguageListItem) => void
    updateTranslateTargetLanguage: (lang: ILanguageListItem) => void
}

function truncate(string: string, length = 16, separator = "..") {
    if (string.length <= length) return string

    return string.substring(0, length) + separator
}

function reformatCopyTextArray(data: string[], limitResultAmount = 10): IReformatTranslateResult[] {
    const dataLength = data?.length - 1
    let finalData: string[] = data
    if (limitResultAmount > 0 && dataLength >= limitResultAmount) {
        finalData = data.slice(0, limitResultAmount - 1)
        finalData.push(data[dataLength])
    }

    const finalDataLength = finalData.length - 1
    return finalData.map((text, idx) => {
        return {
            title: finalDataLength === idx && idx > 0 ? "All" : truncate(text),
            value: text,
        }
    })
}

const preferences: IPreferences = getPreferenceValues()

function ActionCopyListSection(props: IActionCopyListSection) {
    if (!props.copyText) {
        return null
    }

    const SEPARATOR = "；"
    const copyTextArray = props.copyText.split(SEPARATOR)
    copyTextArray.length > 1 && copyTextArray.push(props.copyText)
    const finalTextArray = reformatCopyTextArray(copyTextArray, 4)

    const shortcutKeyEquivalent: Keyboard.KeyEquivalent[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

    function changeTextCopyStyle(text: string): string {
        const textArray: string[] = text.split(" ")
        if (props.copyMode === COPY_TYPE.Uppercase) {
            const SEPARATOR = "_"
            return textArray
                .map((text) => {
                    return text.toUpperCase()
                })
                .join(SEPARATOR)
        } else if (props.copyMode === COPY_TYPE.LowercaseCamelCase && textArray.length > 1) {
            return textArray
                .map((text, idx) => {
                    if (idx === 0) return text.toLowerCase()

                    const firstLetter = text.slice(0, 1).toUpperCase()
                    return firstLetter + text.slice(1, text.length)
                })
                .join("")
        }

        return text
    }

    return (
        <ActionPanel.Section>
            {finalTextArray.map((textItem, key) => {
                const title = changeTextCopyStyle(textItem.title)
                const value = changeTextCopyStyle(textItem.value)
                return (
                    <Action.CopyToClipboard
                        onCopy={() => preferences.isAutomaticPaste && Clipboard.paste(textItem.value)}
                        shortcut={{ modifiers: ["cmd"], key: shortcutKeyEquivalent[key] }}
                        title={`Copy ${title}`}
                        content={value}
                        key={key}
                    />
                )
            })}
        </ActionPanel.Section>
    )
}

class ListActionPanel extends Component<IListItemActionPanelItem> {
    onPlaySound(text?: string, language?: string) {
        if (language && text) {
            const voiceIndex = 0

            for (const LANG of LANGUAGE_LIST) {
                if (language === LANG.languageId) {
                    const sayCommand = `say -v ${LANG.languageVoice[voiceIndex]} ${truncate(text)}`
                    LANG.languageVoice.length > 0 && exec(sayCommand)
                }
            }
        }
    }

    getGoogleTranslateURL(): string {
        const from = this.props.currentFromLanguage?.googleLanguageId || this.props.currentFromLanguage?.languageId
        const to = this.props.currentTargetLanguage?.googleLanguageId || this.props.currentTargetLanguage?.languageId
        const text = encodeURI(this.props.queryText!)
        return `https://translate.google.com/?sl=${from}&tl=${to}&text=${text}&op=translate`
    }

    render() {
        return (
            <ActionPanel>
                <ActionCopyListSection copyText={this.props.copyText} copyMode={this.props.copyMode} />
                <ActionPanel.Section title="Play Sound">
                    <Action
                        title="Play Query Text Sound"
                        icon={Icon.Message}
                        onAction={() =>
                            this.onPlaySound(this.props?.queryText, this.props.currentFromLanguage?.languageId)
                        }
                    />
                    <Action
                        title="Play Result Text Sound"
                        icon={Icon.Message}
                        onAction={() =>
                            this.onPlaySound(this.props.copyText, this.props.currentTargetLanguage?.languageId)
                        }
                    />
                </ActionPanel.Section>
                <ActionPanel.Section title="Target Language">
                    {LANGUAGE_LIST.map((region) => {
                        if (this.props.currentFromLanguage?.languageId === region.languageId) return null

                        return (
                            <Action
                                key={region.languageId}
                                title={region.languageTitle}
                                onAction={() => this.props.onLanguageUpdate(region)}
                                icon={
                                    this.props.currentTargetLanguage?.languageId === region.languageId
                                        ? Icon.ArrowRight
                                        : Icon.Globe
                                }
                            />
                        )
                    })}
                </ActionPanel.Section>
                <ActionPanel.Section title="Others">
                    <ActionFeedback />
                    <Action.OpenInBrowser
                        icon={Icon.Link}
                        title="See Google Translate Results"
                        url={this.getGoogleTranslateURL()}
                    />
                </ActionPanel.Section>
            </ActionPanel>
        )
    }
}

export default function TranslateResult(props: ITranslateResult) {
    return (
        <Fragment>
            {props.translateResultState?.map((result, idx) => {
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
                                            queryText={props.inputState}
                                            copyMode={props.copyModeState}
                                            copyText={item?.subtitle || item.title}
                                            currentFromLanguage={props.currentFromLanguageState}
                                            currentTargetLanguage={props.currentTargetLanguage}
                                            onLanguageUpdate={(value) => {
                                                props.setCurrentTargetLanguage(value)
                                                props.updateTranslateTargetLanguage(value)
                                                props.doTranslate("auto", value.languageId)
                                            }}
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
