import { Hotkey } from '../types';
/**
 * Interface representing a Hotkey Profile.
 */
export interface HotkeyProfile {
    name: string;
    hotkeys: Hotkey[];
}
/**
 * Manages registration, unregistration, and management of hotkeys.
 */
export declare class HotkeyManager {
    private hotkeys;
    private conflictResolver;
    private logger;
    private profiles;
    private activeProfile;
    constructor();
    /**
     * Registers a new hotkey.
     * @param shortcut The key combination (e.g., 'CommandOrControl+X').
     * @param callback The function to execute when the hotkey is activated.
     * @param global Whether the hotkey is global. Defaults to true.
     * @returns Boolean indicating success.
     */
    register(shortcut: string, callback: () => void, global?: boolean): boolean;
    /**
     * Unregisters an existing hotkey.
     * @param shortcut The key combination to unregister.
     */
    unregister(shortcut: string): void;
    /**
     * Unregisters all hotkeys.
     */
    unregisterAll(): void;
    /**
     * Retrieves all registered hotkeys.
     * @returns Array of Hotkey objects.
     */
    getAllHotkeys(): Hotkey[];
    /**
     * Checks if a hotkey is already registered.
     * @param shortcut The key combination to check.
     * @returns Boolean indicating if the hotkey is registered.
     */
    isRegistered(shortcut: string): boolean;
    /**
     * Creates a new profile with the current hotkeys.
     * @param profileName Name of the new profile.
     */
    createProfile(profileName: string): boolean;
    /**
     * Switches to a specified profile.
     * @param profileName Name of the profile to switch to.
     */
    switchProfile(profileName: string): boolean;
    /**
     * Deletes a specified profile.
     * @param profileName Name of the profile to delete.
     */
    deleteProfile(profileName: string): boolean;
    /**
     * Retrieves all profiles.
     * @returns Array of HotkeyProfile objects.
     */
    getAllProfiles(): HotkeyProfile[];
    /**
     * Renames an existing profile.
     * @param oldName Current name of the profile.
     * @param newName New name for the profile.
     */
    renameProfile(oldName: string, newName: string): boolean;
}
