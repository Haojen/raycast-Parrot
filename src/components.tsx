import {Component} from "react";
import {exec} from "child_process";
import {COPY_TYPE, LANGUAGE_LIST} from "./consts";
import {reformatCopyTextArray, truncate} from "./shared.func";
import {IActionCopyListSection, IListItemActionPanelItem, IPreferences } from "./types";
import {Action, ActionPanel, Clipboard, getPreferenceValues, Icon, Keyboard} from "@raycast/api";

const preferences: IPreferences = getPreferenceValues();

export function ActionCopyListSection(props: IActionCopyListSection) {
    if (!props.copyText) {
        return null
    }

    const SEPARATOR = '；'
    const copyTextArray = props.copyText.split(SEPARATOR)
    copyTextArray.length > 1 && copyTextArray.push(props.copyText)
    const finalTextArray = reformatCopyTextArray(copyTextArray, 4)

    const shortcutKeyEquivalent: Keyboard.KeyEquivalent[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

    function changeTextCopyStyle(text: string): string {
        let result = text
        const textArray:string[] = text.split(' ')
        if (props.copyMode === COPY_TYPE.Uppercase) {
            const SEPARATOR = '_'
            return textArray.map(text => {
                return text.toUpperCase()
            }).join(SEPARATOR)
        }
        else if (props.copyMode === COPY_TYPE.LowercaseCamelCase && textArray.length > 1) {
            return textArray.map((text, idx) => {
                if (idx === 0) return text.toLowerCase()

                const firstLetter = text.slice(0, 1).toUpperCase()
                return firstLetter + text.slice(1, text.length)
            }).join('')
        }

        return  result
    }

    return <ActionPanel.Section>
        {
            finalTextArray.map( (textItem, key) => {
                const title = changeTextCopyStyle(textItem.title)
                const value = changeTextCopyStyle(textItem.value)
                return (
                    <Action.CopyToClipboard
                        onCopy={ () => preferences.isAutomaticPaste && Clipboard.paste(textItem.value) }
                        shortcut={ {modifiers: ['cmd'], key: shortcutKeyEquivalent[key]} }
                        title={ `Copy ${ title }`} content={ value } key={key}
                    />
                )
            })
        }
    </ActionPanel.Section>
}

export class ListActionPanel extends Component<IListItemActionPanelItem> {
    onPlaySound(text?:string, language?: string) {
        if (language && text) {
            const voiceIndex = 0

            for (let LANG of LANGUAGE_LIST) {
                if (language === LANG.languageId) {
                    const sayCommand = `say -v ${LANG.languageVoice[voiceIndex]} ${truncate(text)}`
                    LANG.languageVoice.length > 0 && exec(sayCommand)
                }
            }
        }
    }

    render() {
        const playSoundIcon = Icon.Message
        return <ActionPanel>
            <ActionCopyListSection copyText={ this.props.copyText } copyMode={ this.props.copyMode }/>
            {
                (this.props.currentFromLanguage ||
                    this.props.currentTargetLanguage ) &&
                <ActionPanel.Section title="Play Sound">
                    <ActionPanel.Item
                        title="Play Input Text Sound"
                        icon={ playSoundIcon }
                        onAction={ () => this.onPlaySound(this.props?.queryText, this.props.currentFromLanguage?.languageId) } />
                    <ActionPanel.Item
                        title="Play Result Sound"
                        icon={ playSoundIcon }
                        onAction={ () => this.onPlaySound(this.props.copyText, this.props.currentTargetLanguage?.languageId) }/>
                </ActionPanel.Section>
            }
            <ActionPanel.Section title="Language">
                {
                    LANGUAGE_LIST.map( region => {
                        return <ActionPanel.Item
                            key={ region.languageId }
                            title={ region.languageTitle }
                            onAction={ () => this.props.onLanguageUpdate(region) }
                            icon={ this.props.currentTargetLanguage?.languageId === region.languageId ? Icon.ArrowRight : Icon.Globe}
                        />
                    })
                }
            </ActionPanel.Section>
            <ActionPanel.Section title="Others">
                <Action.OpenInBrowser icon={ Icon.QuestionMark } title="Feedback" url="https://github.com/Haojen/raycast-Parrot" />
                {/* Read about current word more explanation */}
                {/*<Action.OpenInBrowser icon={ Icon.Document } title="More explanation" url="https://github.com/Haojen/raycast-Parrot" />*/}
            </ActionPanel.Section>
        </ActionPanel>
    }
}