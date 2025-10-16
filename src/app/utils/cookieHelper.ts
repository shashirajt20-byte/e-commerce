'use client'
import Cookies from "js-cookie"

export function getCookie(name : string){
    return Cookies.get(name)
}
export function setCookie(name:string, value:string){
    return Cookies.set(name, value, {expires: 21});
}
export function removeCookie(name:string){
    return Cookies.remove(name);
}