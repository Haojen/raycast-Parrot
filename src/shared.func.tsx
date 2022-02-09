import {exec} from "child_process";

export function truncate(q: string){
    const len = q.length
    return len<=20 ? q : q.substring(0, 10) + len + q.substring(len-10, len)
}

export function playTextSound(text: string) {
    exec(`say ${text}`)
}