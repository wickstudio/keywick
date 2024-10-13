/**
 * KeyWick - A Universal Hotkey Manager for Electron Applications
 *
 * This file serves as the main entry point for the KeyWick package.
 * It exports the core functionalities and UI components, allowing developers
 * to easily integrate and manage hotkeys within their Electron applications.
 */

export { HotkeyManager } from './core/HotkeyManager';
export { Hotkey } from './core/Hotkey';
export { default as HotkeyList } from './ui/components/HotkeyList';
export { default as HotkeyEditor } from './ui/components/HotkeyEditor';
export { default as HotkeyProfileManager } from './ui/components/HotkeyProfileManager';
export { validateShortcut } from './core/utils';
export type { HotkeyProfile } from './core/HotkeyManager';