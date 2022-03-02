/*global chrome*/
import {
  Readability,
  isProbablyReaderable,
  minContentLength,
} from "@mozilla/readability";
import DOMPurify from "dompurify";

export async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export function setCurrentURL(tabURL) {
  chrome.storage.local.set({tabURL: tabURL });
}

export async function getCurrentURL() {
const value = await chrome.storage.local.get("tabURL")
return value.tabURL;
}

export async function getNativeLanguage() {
  const value = await chrome.storage.local.get("userInfo")
  return value.userInfo.native_language;
  }
  

//We have to remenber to delete sessionId from localStorage, when we logout
export async function getSessionId() {
  const value = await chrome.storage.local.get("sessionId")
  return value.sessionId;
  }

export function reading(currentTabURL) {
  const documentFromTab = getSourceAsDOM(currentTabURL);
  const documentClone = documentFromTab.cloneNode(true);
  if (isProbablyReaderable(documentClone, minContentLength)) {
    const article = new Readability(documentClone).parse();
    chrome.storage.local.set({ article: article });
    chrome.storage.local.set({ isProbablyReaderable: true })
  } else {
    chrome.storage.local.set({ article: undefined });
    chrome.storage.local.set({ isProbablyReaderable: false });
  }
}

export function getSourceAsDOM(url) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  const parser = new DOMParser();
  //const clean = DOMPurify.sanitize(xmlhttp.responseText);
  return parser.parseFromString(xmlhttp.responseText, "text/html");
}
