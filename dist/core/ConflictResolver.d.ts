import { HotkeyManager } from './HotkeyManager';
/**
 * Handles conflicts when registering hotkeys.
 */
export declare class ConflictResolver {
    private manager;
    private logger;
    constructor(manager: HotkeyManager);
    /**
     * Resolves a conflict for a given shortcut.
     * @param shortcut The conflicting key combination.
     */
    resolve(shortcut: string): void;
}
