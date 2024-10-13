!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("electron"),require("react")):"function"==typeof define&&define.amd?define(["electron","react"],t):"object"==typeof exports?exports.KeyWick=t(require("electron"),require("react")):e.KeyWick=t(e.electron,e.react)}(this,((e,t)=>(()=>{"use strict";var r={564:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ConflictResolver=void 0;const o=r(163);t.ConflictResolver=class{constructor(e){this.manager=e,this.logger=new o.Logger}resolve(e){try{this.manager.isRegistered(e)&&(this.logger.warn(`Conflict detected for shortcut: ${e}. Unregistering existing hotkey.`),this.manager.unregister(e))}catch(t){this.logger.error(`Error resolving conflict for "${e}": ${t}`)}}}},967:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.HotkeyManager=void 0;const o=r(894),l=r(564),n=r(163);t.HotkeyManager=class{constructor(){this.hotkeys=new Map,this.profiles=new Map,this.activeProfile=null,this.conflictResolver=new l.ConflictResolver(this),this.logger=new n.Logger,o.app.on("will-quit",(()=>{this.unregisterAll()}))}register(e,t,r=!0){try{if(this.hotkeys.has(e)&&this.conflictResolver.resolve(e),!o.globalShortcut.register(e,t))return this.logger.error(`Failed to register hotkey: ${e}`),!1;const l={shortcut:e,callback:t,global:r};return this.hotkeys.set(e,l),this.logger.info(`Registered hotkey: ${e}`),!0}catch(t){return this.logger.error(`Error registering hotkey "${e}": ${t}`),!1}}unregister(e){try{this.hotkeys.has(e)&&(o.globalShortcut.unregister(e),this.hotkeys.delete(e),this.logger.info(`Unregistered hotkey: ${e}`))}catch(t){this.logger.error(`Error unregistering hotkey "${e}": ${t}`)}}unregisterAll(){try{o.globalShortcut.unregisterAll(),this.hotkeys.clear(),this.logger.info("Unregistered all hotkeys")}catch(e){this.logger.error(`Error unregistering all hotkeys: ${e}`)}}getAllHotkeys(){return Array.from(this.hotkeys.values())}isRegistered(e){return this.hotkeys.has(e)}createProfile(e){if(this.profiles.has(e))return this.logger.warn(`Profile "${e}" already exists.`),!1;const t=this.getAllHotkeys();return this.profiles.set(e,{name:e,hotkeys:t}),this.logger.info(`Created profile: ${e}`),!0}switchProfile(e){if(!this.profiles.has(e))return this.logger.error(`Profile "${e}" does not exist.`),!1;this.unregisterAll();const t=this.profiles.get(e);for(const e of t.hotkeys)this.register(e.shortcut,e.callback,e.global);return this.activeProfile=e,this.logger.info(`Switched to profile: ${e}`),!0}deleteProfile(e){return this.profiles.has(e)?(this.profiles.delete(e),this.logger.info(`Deleted profile: ${e}`),!0):(this.logger.error(`Profile "${e}" does not exist.`),!1)}getAllProfiles(){return Array.from(this.profiles.values())}renameProfile(e,t){if(!this.profiles.has(e))return this.logger.error(`Profile "${e}" does not exist.`),!1;if(this.profiles.has(t))return this.logger.warn(`Profile "${t}" already exists.`),!1;const r=this.profiles.get(e);return this.profiles.delete(e),this.profiles.set(t,{name:t,hotkeys:r.hotkeys}),this.logger.info(`Renamed profile "${e}" to "${t}"`),!0}}},163:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validateShortcut=t.Logger=void 0,t.Logger=class{info(e){console.log(`[KeyWick INFO]: ${e}`)}warn(e){console.warn(`[KeyWick WARN]: ${e}`)}error(e){console.error(`[KeyWick ERROR]: ${e}`)}},t.validateShortcut=function(e){const t=e.split("+");if(t.length<2)return!1;const r=["Command","Control","Alt","Shift","Super"],o=t[t.length-1],l=new Set(t.slice(0,-1));for(const e of l)if(!r.includes(e))return!1;return/^[A-Za-z0-9]+$/.test(o)||/^F[1-9][0-9]?$/.test(o)}},156:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.validateShortcut=t.HotkeyProfileManager=t.HotkeyEditor=t.HotkeyList=t.HotkeyManager=void 0;var l=r(967);Object.defineProperty(t,"HotkeyManager",{enumerable:!0,get:function(){return l.HotkeyManager}});var n=r(648);Object.defineProperty(t,"HotkeyList",{enumerable:!0,get:function(){return o(n).default}});var i=r(667);Object.defineProperty(t,"HotkeyEditor",{enumerable:!0,get:function(){return o(i).default}});var a=r(796);Object.defineProperty(t,"HotkeyProfileManager",{enumerable:!0,get:function(){return o(a).default}});var s=r(163);Object.defineProperty(t,"validateShortcut",{enumerable:!0,get:function(){return s.validateShortcut}})},667:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var l=Object.getOwnPropertyDescriptor(t,r);l&&!("get"in l?!t.__esModule:l.writable||l.configurable)||(l={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,l)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return l(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(155)),a=r(163);t.default=({existingHotkey:e,onSave:t,onCancel:r})=>{var o;const[l,n]=(0,i.useState)((null==e?void 0:e.shortcut)||""),[s,u]=(0,i.useState)(null===(o=null==e?void 0:e.global)||void 0===o||o),[c,f]=(0,i.useState)(null);return i.default.createElement("div",{className:"hotkey-editor"},i.default.createElement("h2",null,e?"Edit Hotkey":"Add Hotkey"),c&&i.default.createElement("div",{className:"error"},c),i.default.createElement("label",null,"Shortcut:",i.default.createElement("input",{type:"text",value:l,onChange:e=>n(e.target.value),placeholder:"e.g., CommandOrControl+X"})),i.default.createElement("label",null,i.default.createElement("input",{type:"checkbox",checked:s,onChange:e=>u(e.target.checked)}),"Global Hotkey"),i.default.createElement("div",{className:"buttons"},i.default.createElement("button",{onClick:()=>{l.trim()?(0,a.validateShortcut)(l)?t({shortcut:l,callback:()=>alert(`Hotkey ${l} activated!`),global:s}):f("Invalid shortcut format."):f("Shortcut cannot be empty.")},className:"save-button"},"Save"),i.default.createElement("button",{onClick:r,className:"cancel-button"},"Cancel")))}},109:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=o(r(155));t.default=({hotkey:e,onEdit:t,onDelete:r})=>l.default.createElement("li",{className:"hotkey-item"},l.default.createElement("span",{className:"shortcut"},e.shortcut),l.default.createElement("span",{className:"type"},e.global?"Global":"Local"),l.default.createElement("button",{onClick:()=>t(e),className:"edit-button","aria-label":`Edit hotkey ${e.shortcut}`},"Edit"),l.default.createElement("button",{onClick:()=>r(e.shortcut),className:"delete-button","aria-label":`Delete hotkey ${e.shortcut}`},"Delete"))},648:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const l=o(r(155)),n=o(r(109));t.default=({hotkeys:e,onEdit:t,onDelete:r})=>l.default.createElement("div",{className:"hotkey-list"},l.default.createElement("h2",null,"Registered Hotkeys"),0===e.length?l.default.createElement("p",null,"No hotkeys registered."):l.default.createElement("ul",null,e.map((e=>l.default.createElement(n.default,{key:e.shortcut,hotkey:e,onEdit:t,onDelete:r})))))},796:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r);var l=Object.getOwnPropertyDescriptor(t,r);l&&!("get"in l?!t.__esModule:l.writable||l.configurable)||(l={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,o,l)}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&o(t,e,r);return l(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(155));t.default=({hotkeyManager:e,onProfileSwitch:t})=>{const[r,o]=(0,i.useState)([]),[l,n]=(0,i.useState)(""),[a,s]=(0,i.useState)(null);return(0,i.useEffect)((()=>{o(e.getAllProfiles())}),[e]),i.default.createElement("div",{className:"profile-manager"},i.default.createElement("h2",null,"Hotkey Profiles"),a&&i.default.createElement("div",{className:"error"},a),i.default.createElement("ul",null,r.map((r=>i.default.createElement("li",{key:r.name,className:"profile-item"},i.default.createElement("span",null,r.name),i.default.createElement("button",{onClick:()=>{return l=r.name,void(e.switchProfile(l)?(o(e.getAllProfiles()),t()):s(`Failed to switch to profile "${l}".`));var l}},"Switch"),i.default.createElement("button",{onClick:()=>{return t=r.name,void(e.deleteProfile(t)?o(e.getAllProfiles()):s(`Failed to delete profile "${t}".`));var t}},"Delete"),i.default.createElement("button",{onClick:()=>{return t=r.name,void((l=prompt("Enter new profile name:",r.name)||r.name).trim()?e.renameProfile(t,l)?(o(e.getAllProfiles()),s(null)):s(`Failed to rename profile "${t}" to "${l}".`):s("New profile name cannot be empty."));var t,l}},"Rename"))))),i.default.createElement("div",{className:"create-profile"},i.default.createElement("input",{type:"text",value:l,onChange:e=>n(e.target.value),placeholder:"New Profile Name"}),i.default.createElement("button",{onClick:()=>{l.trim()?e.createProfile(l)?(o(e.getAllProfiles()),n(""),s(null)):s(`Failed to create profile "${l}".`):s("Profile name cannot be empty.")}},"Create Profile")))}},894:t=>{t.exports=e},155:e=>{e.exports=t}},o={};return function e(t){var l=o[t];if(void 0!==l)return l.exports;var n=o[t]={exports:{}};return r[t].call(n.exports,n,n.exports,e),n.exports}(156)})()));