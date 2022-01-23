import crypto from 'crypto'
import axios from "axios";
import { useEffect, useState } from 'react'
import { List } from '@raycast/api'
import querystring from 'querystring'

export default () => {
    const [inputState, setInputState] = useState<string>()

    useEffect(() => {
        const APP_ID = '0d68776be7e9be0b'
        const APP_KEY = 'MIbu7DGsOPdbatL9KmgycGx0qDOzQWCM'

        const inputQueryText = inputState
        const salt = 1039057373 // change to UUID
        const timestamp = Math.round(new Date().getTime() / 1000)
        const sha256 = crypto.createHash('sha256')
        const sign = sha256.update(APP_ID + inputQueryText + salt + timestamp + APP_KEY).digest('hex')

        axios.post('https://openapi.youdao.com/api', querystring.stringify({
            sign,
            signType: 'v3',
            salt, // UUID
            q: inputQueryText,
            from: 'en',
            to: 'zh-CHS',
            appKey: APP_ID,
            curtime: timestamp
        }))
        .then( (res) => {
            console.log(res.data, 'res')
        })
    }, [inputState])

    return (
        <List onSearchTextChange={ inputText => setInputState(inputText) }>
            <List.Item title={'red'}/>
        </List>
    )
}