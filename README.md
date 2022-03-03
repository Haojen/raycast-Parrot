<p align="center">
  <img src="./assets/parrot-icon.png" width="256"/>
</p>
<p align="center">
  <strong>raycast-Parrot</strong>
</p>
<p align="center">A Raycast translation Extension, Powerful and Easy to use. </p>
<p align="center">🇺🇸 🇬🇧 🇩🇪 🇫🇷 🇨🇳 🇯🇵 🇷🇺 🇪🇸 🇵🇹 🇬🇷 🇫🇮 🇦🇷 🇮🇩 🇨🇦 🇰🇷 🇮🇹 🇦🇪 🇳🇴 🇲🇽 🇮🇱 🇸🇰 🇹🇷 🇵🇱 🇨🇿 🇭🇺 🇭🇹 🇹🇭 🇳🇱 🇸🇪 🇦🇺</p>

## Features
1. Supports 26+ for languages.
2. Support Play TTS (Text to Speech)
3. Support Copy Auto Paste, also support **lowerCamelCase** and **ALL_UPPERCASE** copy mode.
4. Quick translation to another language 

## Documents
### Copy Text

All copy item in Action Panel, you can click it or use `cmd` + `k` expand it.

#### lowerCamelCase Copy
use ```>``` before query text to copy translate results, example `> Hola`

#### ALL_UPPERCASE Copy
use ```>>``` before query text to copy translate result, example `>> Hola` 

> lowerCamelCase and UPPERCASE only for Alphabet

### TTS List (Text to Speech Language)

or use this command show you macOS support languages
> say -v /\?

Use `say` command test chosen vioce
> say -v Alex hello

|Language| Voice | Default |
| -----------| ----------- | ----------- |
| English | 🇺🇸 Alex 🇺🇸 Fred 🇺🇸 Samantha 🇺🇸 Victoria 🇬🇧 Daniel 🇦🇺 Karen 🇮🇪 Moira 🇮🇳 Rishi 🇮🇳 Veena 🏴󠁧󠁢󠁳󠁣󠁴󠁿 Fiona 🌍 Tessa| Alex |
| Spanish | 🇪🇸 Jorge 🇪🇸 Monica 🇦🇷 Diego 🇲🇽 Paulina | Jorge |
| 🇮🇹 Italiana | Alice, Luca | Alice |
| 🇸🇪 Swedish | Alva| - | 
| 🇫🇷 French | Amelie, Thomas|Amelie|
| 🇩🇪 German |Anna| -|  
| 🇮🇱 Hebrew |Carmit|-|  
| 🇮🇩 Indonesia |Damayanti|-|
| 🇳🇱 Dutch |Ellen, Xander | Ellen|
| 🇷🇴 Romanian |Ioana|-| 
| 🇵🇹 Portuguese |Joana, Luciana|  Joana|
| 🇹🇭 Thai |Kanya| -|  
| 🇯🇵 Japan |Kyoko| -|
| 🇸🇰 Slovak |Laura|- |
| 🇭🇹 Hindi |Lekha| - |
| 🇦🇪 Arabic |Maged|-| 
| 🇭🇺 Hungarian |Mariska|-|  
| 🇬🇷 Greek |Melina|-|  
| 🇷🇺 Russian |Milena, Yuri |Milena|   
| 🇩🇰 Danish |Sara|-|
| 🇫🇮 Finnish |Satu|-| 
| 🇨🇳 Chinese-Simplified | Ting-Ting |-| 
| 🇹🇷 Turkish |Yelda|-| 
| 🇰🇷 Korea |Yuna|-|
| 🇵🇱 Polish |Zosia|-|
| 🇨🇿 Czech |Zuzana|-| 

## Error Code Information
More error code information please visit [Youdao API Document (中文)](https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html),
or you can submit an issue. 

|Code |	Description|
| ----------- | ----------- |
|101 | Mandatory parameters are missing. Ensure that the required parameters are complete and that the parameters are written correctly|
|103|	Translated text is too long|
|108|	If the application ID is invalid, you can register an account, log in to the background, create an application and instance, and bind the application to obtain the application ID and application key|
|112|	Invalid request service|
|207|	Replay request|
|302|	Translation query failed|
|303|	Other exceptions on the server|
|411|	Access frequency limited, please visit later|
|412|	Long requests are too frequent. Please visit later|

## Provide Default APP ID and Key

App ID: *0d68776be7e9be0b*

App Key: *MIbu7DGsOPdbatL9KmgycGx0qDOzQWCM*
