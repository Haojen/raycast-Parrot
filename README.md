# raycast-Parrot
A Raycast translation Extension, Powerful and Easy to use.

## Features
1. Supports 26+ for languages.
2. Support Play TTS (Text to Speech)
3. Support Copy and Auto Paste, also support lowerCamelCase and ALL_UPPERCASE copy mode.
4. Quick translation to another language mode
5. Also provide Google translate result

## Copy Text

All copy item in action list view, you can click it or use `cmd` + `k` show it.

*lowerCamelCase copy and UPPERCASE copy feature only for English*

### Lower Camel Case Copy (lowerCamelCase)
use ```>``` before query text to Copy Lower Camel Case translate results, like `> 你好`

### All Uppercase Copy (ALL_UPPERCASE)
use ```>>``` before query text to Copy Uppercase result, like `>> 你好` 


## Text to Speech Language

or use this command show you macOS support languages
> say -v \?

| Syntax      | Description | Des |
| ----------- | ----------- | ----------- |
|Alex |                en_US|  # Most people recognize me by my voice.
|Alice |               it_IT|    # Salve, mi chiamo Alice e sono una voce italiana.
|Alva|                sv_SE|    # Hej, jag heter Alva. Jag är en svensk röst.
|Amelie|              fr_CA|    # Bonjour, je m’appelle Amelie. Je suis une voix canadienne.
|Anna|                de_DE|    # Hallo, ich heiße Anna und ich bin eine deutsche Stimme.
|Carmit|              he_IL|    # שלום. קוראים לי כרמית, ואני קול בשפה העברית.
|Damayanti|           id_ID|    # Halo, nama saya Damayanti. Saya berbahasa Indonesia.
|Daniel|              en_GB|    # Hello, my name is Daniel. I am a British-English voice.
|Diego|               es_AR|    # Hola, me llamo Diego y soy una voz española.
|Ellen|               nl_BE|    # Hallo, mijn naam is Ellen. Ik ben een Belgische stem.
|Fiona|               en-scotland| # Hello, my name is Fiona. I am a Scottish-English voice.
|Fred|                en_US|    # I sure like being inside this fancy computer
|Ioana|               ro_RO|    # Bună, mă cheamă Ioana . Sunt o voce românească.
|Joana|               pt_PT|    # Olá, chamo-me Joana e dou voz ao português falado em Portugal.
|Jorge|               es_ES|    # Hola, me llamo Jorge y soy una voz española.
|Juan|                es_MX|    # Hola, me llamo Juan y soy una voz mexicana.
|Kanya|               th_TH|    # สวัสดีค่ะ ดิฉันชื่อKanya
|Karen|               en_AU|    # Hello, my name is Karen. I am an Australian-English voice.
|Kyoko|               ja_JP|    # こんにちは、私の名前はKyokoです。日本語の音声をお届けします。
|Laura|               sk_SK |   # Ahoj. Volám sa Laura . Som hlas v slovenskom jazyku.
|Lekha|              hi_IN |   # नमस्कार, मेरा नाम लेखा है. मैं हिन्दी में बोलने वाली आवाज़ हूँ.
|Luca|                it_IT |   # Salve, mi chiamo Luca e sono una voce italiana.
|Luciana             |pt_BR|    # Olá, o meu nome é Luciana e a minha voz corresponde ao português que é falado no Brasil
|Maged               |ar_SA|    # مرحبًا اسمي Maged. أنا عربي من السعودية.
|Mariska             |hu_HU|    # Üdvözlöm! Mariska vagyok. Én vagyok a magyar hang.
|Mei-Jia             |zh_TW|    # 您好，我叫美佳。我說國語。
|Melina              |el_GR|    # Γεια σας, ονομάζομαι Melina. Είμαι μια ελληνική φωνή.
|Milena              |ru_RU|    # Здравствуйте, меня зовут Milena. Я – русский голос системы.
|Moira               |en_IE|   # Hello, my name is Moira. I am an Irish-English voice.
|Monica              |es_ES|    # Hola, me llamo Monica y soy una voz española.
|Nora                |nb_NO|    # Hei, jeg heter Nora. Jeg er en norsk stemme.
|Paulina             |es_MX|    # Hola, me llamo Paulina y soy una voz mexicana.
|Rishi               |en_IN|    # Hello, my name is Rishi. I am an Indian-English voice.
|Samantha            |en_US|    # Hello, my name is Samantha. I am an American-English voice.
|Sara                |da_DK|    # Hej, jeg hedder Sara. Jeg er en dansk stemme.
|Satu                |fi_FI|    # Hei, minun nimeni on Satu. Olen suomalainen ääni.
|Sin-ji              |zh_HK|    # 您好，我叫 Sin-ji。我講廣東話。
|Tessa               |en_ZA|    # Hello, my name is Tessa. I am a South African-English voice.
|Thomas              |fr_FR   | # Bonjour, je m’appelle Thomas. Je suis une voix française.
|Ting-Ting           |zh_CN   | # 您好，我叫Ting-Ting。我讲中文普通话。
|Veena               |en_IN   | # Hello, my name is Veena. I am an Indian-English voice.
|Victoria            |en_US   | # Isn't it nice to have a computer that will talk to you?
|Xander              |nl_NL   | # Hallo, mijn naam is Xander. Ik ben een Nederlandse stem.
|Yelda|               tr_TR|    # Merhaba, benim adım Yelda. Ben Türkçe bir sesim.
|Yuna|                ko_KR|    # 안녕하세요. 제 이름은 Yuna입니다. 저는 한국어 음성입니다.
|Yuri|                ru_RU|    # Здравствуйте, меня зовут Yuri. Я – русский голос системы.
|Zosia|               pl_PL|    # Witaj. Mam na imię Zosia, jestem głosem kobiecym dla języka polskiego.
|Zuzana|              cs_CZ|    # Dobrý den, jmenuji se Zuzana. Jsem český hlas.

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
