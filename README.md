<p align="center">
  <img src="./assets/parrot-icon.png" width="256"/>
</p>
<p align="center">
  <strong>raycast-Parrot</strong>
</p>
<p align="center">A Raycast translation Extension, Powerful and Easy to use. </p>
<p align="center">🇺🇸 🇬🇧 🇩🇪 🇫🇷 🇨🇳 🇯🇵 🇷🇺 🇪🇸 🇵🇹 🇬🇷 🇫🇮 🇮🇩 🇨🇦 🇰🇷 🇮🇹 🇦🇪 🇳🇴 🇮🇱 🇸🇰 🇹🇷 🇵🇱 🇹🇩 🇭🇺 🇭🇹 🇹🇭 🇳🇱 🇷🇴 🇸🇪 🇦🇺 </p>

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

|Language| Voice | Description | Des |
| -----------| ----------- | ----------- | ----------- |
| EN | Alex(Default), Fred, Samantha, Victoria, Daniel, Karen, Moira, Rishi, Tessa, Veena, Fiona|                en_US|  # Most people recognize me by my voice.
| Italiana | Alice |               it_IT|    # Salve, mi chiamo Alice e sono una voce italiana.
| !Svensk | Alva|                sv_SE|    # Hej, jag heter Alva. Jag är en svensk röst.
| French |Amelie|              fr_CA|    # Bonjour, je m’appelle Amelie. Je suis une voix canadienne.
| German |Anna|                de_DE|    # Hallo, ich heiße Anna und ich bin eine deutsche Stimme.
| Hebrew |Carmit|              he_IL|    # שלום. קוראים לי כרמית, ואני קול בשפה העברית.
| Indonesia |Damayanti|           id_ID|    # Halo, nama saya Damayanti. Saya berbahasa Indonesia.
| Spanish |Diego|               es_AR|    # Hola, me llamo Diego y soy una voz española.
| Dutch |Ellen|               nl_BE|    # Hallo, mijn naam is Ellen. Ik ben een Belgische stem.
| Romanian |Ioana|               ro_RO|    # Bună, mă cheamă Ioana . Sunt o voce românească.
| Portuguese |Joana|               pt_PT|    # Olá, chamo-me Joana e dou voz ao português falado em Portugal.
| Thai |Kanya|               th_TH|    # สวัสดีค่ะ ดิฉันชื่อKanya
| Japan |Kyoko|               ja_JP|    # こんにちは、私の名前はKyokoです。日本語の音声をお届けします。
| Slovak |Laura|               sk_SK |   # Ahoj. Volám sa Laura . Som hlas v slovenskom jazyku.
| Hindi |Lekha|              hi_IN |   # नमस्कार, मेरा नाम लेखा है. मैं हिन्दी में बोलने वाली आवाज़ हूँ.
|Portuguese |Luciana             |pt_BR|    # Olá, o meu nome é Luciana e a minha voz corresponde ao português que é falado no Brasil
| Arabic |Maged               |ar_SA|    # مرحبًا اسمي Maged. أنا عربي من السعودية.
| Hungarian |Mariska             |hu_HU|    # Üdvözlöm! Mariska vagyok. Én vagyok a magyar hang.
| Greek |Melina              |el_GR|    # Γεια σας, ονομάζομαι Melina. Είμαι μια ελληνική φωνή.
| Russian |Milena              |ru_RU|    # Здравствуйте, меня зовут Milena. Я – русский голос системы.
| Danish |Sara                |da_DK|    # Hej, jeg hedder Sara. Jeg er en dansk stemme.
| Finnish |Satu                |fi_FI|    # Hei, minun nimeni on Satu. Olen suomalainen ääni.
| Chinese-Simplified |Ting-Ting           |zh_CN   | # 您好，我叫Ting-Ting。我讲中文普通话。
| Turkish |Yelda|               tr_TR|    # Merhaba, benim adım Yelda. Ben Türkçe bir sesim.
| Korea |Yuna|                ko_KR|    # 안녕하세요. 제 이름은 Yuna입니다. 저는 한국어 음성입니다.
| Polish |Zosia|               pl_PL|    # Witaj. Mam na imię Zosia, jestem głosem kobiecym dla języka polskiego.
| Czech |Zuzana|              cs_CZ|    # Dobrý den, jmenuji se Zuzana. Jsem český hlas.

## Error Code Information
More error code information please visit [Youdao API Document (中文)](https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html),
or you can submit an issue. 

|Code |	Description|
| ----------- | ----------- |
|101 |	缺少必填的参数,首先确保必填参数齐全，然后确认参数书写是否正确。|
|103|	翻译文本过长|
|106|	不支持的响应类型|
|108|	应用ID无效，注册账号，登录后台创建应用和实例并完成绑定，可获得应用ID和应用密钥等信息|
|112|	请求服务无效|
|113|	q不能为空|
|116|	strict字段取值无效，请参考文档填写正确参数值|
|201|	解密失败，可能为DES,BASE64,URLDecode的错误|
|202|	签名检验失败,如果确认应用ID和应用密钥的正确性，仍返回202，一般是编码问题。请确保翻译文本 q 为UTF-8编码.|
|206|	因为时间戳无效导致签名校验失败|
|207|	重放请求|
|302|	翻译查询失败|
|303|	服务端的其它异常|
|304|	会话闲置太久超时|
|411|	访问频率受限,请稍后访问|
|412|	长请求过于频繁，请稍后访问|

## Provider Default API ID and Key

App id: 0d68776be7e9be0b
App key: MIbu7DGsOPdbatL9KmgycGx0qDOzQWCM
