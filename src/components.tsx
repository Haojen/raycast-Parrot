import {reformatTranslateResult} from "./shared.func";
import {Action, ActionPanel, Clipboard, Keyboard} from "@raycast/api";

export function ActionCopyListSection(props: IActionCopyListSection) {
    if (!props.copyText) {
        return null
    }

    let autoPasteText = false

    const SEPARATOR = '；'
    const copyTextArray = props.copyText.split(SEPARATOR)
    copyTextArray.length > 1 && copyTextArray.push(props.copyText)
    const finalTextArray = reformatTranslateResult(copyTextArray, 6)

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