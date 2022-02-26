import {ISayLanguageList, ILanguageListItem2} from "./types";

export const languageList: ILanguageListItem[] = [
    {
        title: 'Chinese-Simple',
        flag: '🇨🇳',
        value: 'zh-CHS',
    },
    {
        title: 'English',
        flag: '🇺🇸',
        value: 'en'
    },
    {
        title: 'Japanese',
        flag: '🇯🇵',
        value: 'ja'
    },
    {
        title: 'France',
        flag: '🇫🇷',
        value: 'fr'
    },
    {
        title: 'Spanish',
        flag: '🇪🇸',
        value: 'es'
    },
]

export const sayLanguageList:ISayLanguageList = {
    en: {
        language: ['en_US', 'en_GB', 'en_AU', 'en_IE', 'en_IN', 'en_ZA', 'en_IN'],
        voice: ['Alex', 'Fred', 'Samantha', 'Victoria', 'Daniel','Karen', 'Moira', 'Rishi', 'Tessa', 'Veena']
    },
    'zh-CHS': {
        language: ['zh_CN', 'zh_TW', 'zh_HK'],
        voice: ['Ting-Ting', 'Mei-Jia', 'Sin-ji']
    }
}

export const LANGUAGE_LIST:ILanguageListItem2[] = [
    {
        languageId: 'zh-CHS',
        languageTitle: 'Chinese-Simplified',
        languageVoice: ['Ting-Ting']
    },
    {
        languageId: 'en',
        languageTitle: 'English',
        languageVoice: ['Alex', 'Fred', 'Samantha', 'Victoria', 'Daniel','Karen', 'Moira', 'Rishi', 'Tessa', 'Veena']
    },
    {
        languageId: 'ja',
        languageTitle: 'Japan',
        languageVoice: ['Kyoko']
    },
    {
        languageId: 'ko',
        languageTitle: 'Korea',
        languageVoice: ['Yuna']
    },
    {
        languageId: 'fr',
        languageTitle: 'French',
        languageVoice: ['Amelie'],
    },
    {
        languageId: 'es',
        languageTitle: 'Spanish',
        languageVoice: ['Diego', 'Jorge', 'Juan', 'Monica', 'Paulina']
    },
    {
        languageId: 'pt',
        languageTitle: 'Portuguese',
        languageVoice: ['Joana', 'Luciana']
    },
    {
        languageId: 'it',
        languageTitle: 'Italian',
        languageVoice: ['Alice', 'Luca']
    },
    {
        languageId: 'ru',
        languageTitle: 'Russian',
        languageVoice: ['Milena', 'Yuri']
    },
    {
        languageId: 'de',
        languageTitle: 'German',
        languageVoice: ['Anna']
    },
    {
        languageId: 'ar',
        languageTitle: 'Arabic',
        languageVoice: ['Maged']
    }, {
        languageId: '',
        languageTitle: '',
        languageVoice: ['']
    }, {
        languageId: '',
        languageTitle: '',
        languageVoice: ['']
    }, {
        languageId: '',
        languageTitle: '',
        languageVoice: ['']
    },
]

// 111种语言
// 印尼文	id
// 南非荷兰语	af
// 波斯尼亚语	bs
// 保加利亚语	bg
// 粤语	yue 需要测试
// 加泰隆语	ca
// 克罗地亚语	hr
// 捷克语	cs
// 丹麦语	da
// 荷兰语	nl
// 爱沙尼亚语	et
// 斐济语	fj
// 芬兰语	fi
// 希腊语	el
// 海地克里奥尔语	ht
// 希伯来语	he
// 印地语	hi
// 白苗语	mww
// 匈牙利语	hu
// 斯瓦希里语	sw
// 克林贡语	tlh
// 拉脱维亚语	lv
// 立陶宛语	lt
// 马来语	ms
// 马耳他语	mt
// 挪威语	no
// 波斯语	fa
// 波兰语	pl
// 克雷塔罗奥托米语	otq
// 罗马尼亚语	ro
// 塞尔维亚语(西里尔文)	sr-Cyrl
// 塞尔维亚语(拉丁文)	sr-Latn
// 斯洛伐克语	sk
// 斯洛文尼亚语	sl
// 瑞典语	sv
// 塔希提语	ty
// 泰语	th
// 汤加语	to
// 土耳其语	tr
// 乌克兰语	uk
// 乌尔都语	ur
// 威尔士语	cy
// 尤卡坦玛雅语	yua
// 阿尔巴尼亚语	sq
// 阿姆哈拉语	am
// 亚美尼亚语	hy
// 阿塞拜疆语	az
// 孟加拉语	bn
// 巴斯克语	eu
// 白俄罗斯语	be
// 宿务语	ceb
// 科西嘉语	co
// 世界语	eo
// 菲律宾语	tl
// 弗里西语	fy
// 加利西亚语	gl
// 格鲁吉亚语	ka
// 古吉拉特语	gu
// 豪萨语	ha
// 夏威夷语	haw
// 冰岛语	is
// 伊博语	ig
// 爱尔兰语	ga
// 爪哇语	jw
// 卡纳达语	kn
// 哈萨克语	kk
// 高棉语	km
// 库尔德语	ku
// 柯尔克孜语	ky
// 老挝语	lo
// 拉丁语	la
// 卢森堡语	lb
// 马其顿语	mk
// 马尔加什语	mg
// 马拉雅拉姆语	ml
// 毛利语	mi
// 马拉地语	mr
// 蒙古语	mn
// 缅甸语	my
// 尼泊尔语	ne
// 齐切瓦语	ny
// 普什图语	ps
// 旁遮普语	pa
// 萨摩亚语	sm
// 苏格兰盖尔语	gd
// 塞索托语	st
// 修纳语	sn
// 信德语	sd
// 僧伽罗语	si
// 索马里语	so
// 巽他语	su
// 塔吉克语	tg
// 泰米尔语	ta
// 泰卢固语	te
// 乌兹别克语	uz
// 南非科萨语	xh
// 意第绪语	yi
// 约鲁巴语	yo
// 南非祖鲁语	zu

//     | Syntax      | Description | Des |
//     | ----------- | ----------- | ----------- |
//     |Alex |                en_US|  # Most people recognize me by my voice.
// |Alva|                sv_SE|    # Hej, jag heter Alva. Jag är en svensk röst.
// |Carmit|              he_IL|    # שלום. קוראים לי כרמית, ואני קול בשפה העברית.
// |Damayanti|           id_ID|    # Halo, nama saya Damayanti. Saya berbahasa Indonesia.
// |Ellen|               nl_BE|    # Hallo, mijn naam is Ellen. Ik ben een Belgische stem.
// |Fiona|               en-scotland| # Hello, my name is Fiona. I am a Scottish-English voice.
// |Ioana|               ro_RO|    # Bună, mă cheamă Ioana . Sunt o voce românească.
// |Kanya|               th_TH|    # สวัสดีค่ะ ดิฉันชื่อKanya
// |Laura|               sk_SK |   # Ahoj. Volám sa Laura . Som hlas v slovenskom jazyku.
// |Lekha|              hi_IN |   # नमस्कार, मेरा नाम लेखा है. मैं हिन्दी में बोलने वाली आवाज़ हूँ.
// |Maged               |ar_SA|    # مرحبًا اسمي Maged. أنا عربي من السعودية.
// |Mariska             |hu_HU|    # Üdvözlöm! Mariska vagyok. Én vagyok a magyar hang.
// |Melina              |el_GR|    # Γεια σας, ονομάζομαι Melina. Είμαι μια ελληνική φωνή.
// |Nora                |nb_NO|    # Hei, jeg heter Nora. Jeg er en norsk stemme.
// |Sara                |da_DK|    # Hej, jeg hedder Sara. Jeg er en dansk stemme.
// |Satu                |fi_FI|    # Hei, minun nimeni on Satu. Olen suomalainen ääni.
// |Thomas              |fr_FR   | # Bonjour, je m’appelle Thomas. Je suis une voix française.
// |Xander              |nl_NL   | # Hallo, mijn naam is Xander. Ik ben een Nederlandse stem.
// |Yelda|               tr_TR|    # Merhaba, benim adım Yelda. Ben Türkçe bir sesim.
// |Zosia|               pl_PL|    # Witaj. Mam na imię Zosia, jestem głosem kobiecym dla języka polskiego.
// |Zuzana|              cs_CZ|    # Dobrý den, jmenuji se Zuzana. Jsem český hlas.