<p align="center">
  <img src="./assets/parrot-icon.png" width="256"/>
</p>
<p align="center">
  <strong>raycast-Parrot</strong>
</p>
<p align="center">A Raycast translation Extension, Powerful and Easy to use. </p>
<p align="center">🇺🇸 🇬🇧 🇩🇪 🇫🇷 🇨🇳 🇯🇵 🇷🇺 🇪🇸 🇵🇹 🇬🇷 🇫🇮 🇮🇩 🇨🇦 🇰🇷 🇮🇹 🇦🇪 🇳🇴 🇮🇱 🇸🇰 🇹🇷 🇵🇱 🇨🇿 🇭🇺 🇭🇹 🇹🇭 🇳🇱 🇸🇪 🇦🇺</p>

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
| English | Alex(Default), Fred, Samantha, Victoria, Daniel, Karen, Moira, Rishi, Tessa, Veena, Fiona|en_US|
| Spanish | Diego, Jorge, Monica, Paulina | es_AR|
| 🇮🇹 Italiana | Alice, Luca |               it_IT|
| 🇸🇪 Swedish | Alva|                sv_SE| 
| 🇫🇷 French | Amelie, Thomas|              fr_CA|
| 🇩🇪 German |Anna|                de_DE|  
| 🇮🇱 Hebrew |Carmit|              he_IL|  
| 🇮🇩 Indonesia |Damayanti|           id_ID|
| 🇳🇱 Dutch |Ellen, Xander | nl_BE|
| 🇷🇴 Romanian |Ioana|ro_RO| 
| 🇵🇹 Portuguese |Joana, Luciana|  pt_PT|
| 🇹🇭 Thai |Kanya| th_TH|  
| 🇯🇵 Japan |Kyoko| ja_JP|
| 🇸🇰 Slovak |Laura|sk_SK |
| 🇭🇹 Hindi |Lekha| hi_IN |
| 🇦🇪 Arabic |Maged               |ar_SA| 
| 🇭🇺 Hungarian |Mariska             |hu_HU|  
| 🇬🇷 Greek |Melina              |el_GR|  
| 🇷🇺 Russian |Milena, Yuri |ru_RU|   
| 🇩🇰 Danish |Sara                |da_DK|
| 🇫🇮 Finnish |Satu                |fi_FI| 
| 🇨🇳 Chinese-Simplified | Ting-Ting |zh_CN   | 
| 🇹🇷 Turkish |Yelda| tr_TR | 
| 🇰🇷 Korea |Yuna|                ko_KR|
| 🇵🇱 Polish |Zosia|               pl_PL|
| 🇨🇿 Czech |Zuzana|              cs_CZ| 

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
