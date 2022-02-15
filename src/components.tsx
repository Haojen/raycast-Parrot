import {Component} from "react";
import {languageList} from "./i18n";
import {reformatTranslateResult} from "./shared.func";
import {Action, ActionPanel, Clipboard, Icon, Keyboard} from "@raycast/api";

export function ActionCopyListSection(props: IActionCopyListSection) {
    if (!props.copyText) {
        return null
    }

    let autoPasteText = false

    const SEPARATOR = '；'
    const copyTextArray = props.copyText.split(SEPARATOR)
    copyTextArray.length > 1 && copyTextArray.push(props.copyText)
    const finalTextArray = reformatTranslateResult(copyTextArray, 4)

    const shortcutKeyEquivalent: Keyboard.KeyEquivalent[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

    return <ActionPanel.Section>
        {
            finalTextArray.map( (textItem, key) => {
                return (
                    <Action.CopyToClipboard
                        onCopy={ () => autoPasteText && Clipboard.paste(textItem.value) }
                        shortcut={ {modifiers: ['cmd'], key: shortcutKeyEquivalent[key]} }
                        title={ `Copy ${ textItem.title }`} content={ textItem.value } key={key}
                    />
                )
            })
        }
    </ActionPanel.Section>
}

export class ListItemActionPanelItem extends Component<IListItemActionPanelItem> {
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