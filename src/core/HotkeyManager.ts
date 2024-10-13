import { globalShortcut, app } from 'electron';
import { Hotkey } from '../types';
import { ConflictResolver } from './ConflictResolver';
import { Logger } from './utils';

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
export class HotkeyManager {
  private hotkeys: Map<string, Hotkey> = new Map();
  private conflictResolver: ConflictResolver;
  private logger: Logger;
  private profiles: Map<string, HotkeyProfile> = new Map();
  private activeProfile: string | null = null;

  constructor() {
    this.conflictResolver = new ConflictResolver(this);
    this.logger = new Logger();

    app.on('will-quit', () => {
      this.unregisterAll();
    });
  }

  /**
   * Registers a new hotkey.
   * @param shortcut The key combination (e.g., 'CommandOrControl+X').
   * @param callback The function to execute when the hotkey is activated.
   * @param global Whether the hotkey is global. Defaults to true.
   * @returns Boolean indicating success.
   */
  register(shortcut: string, callback: () => void, global: boolean = true): boolean {
    try {
      if (this.hotkeys.has(shortcut)) {
        this.conflictResolver.resolve(shortcut);
      }

      const success = globalShortcut.register(shortcut, callback);
      if (!success) {
        this.logger.error(`Failed to register hotkey: ${shortcut}`);
        return false;
      }

      const hotkey: Hotkey = { shortcut, callback, global };
      this.hotkeys.set(shortcut, hotkey);
      this.logger.info(`Registered hotkey: ${shortcut}`);
      return true;
    } catch (error) {
      this.logger.error(`Error registering hotkey "${shortcut}": ${error}`);
      return false;
    }
  }

  /**
   * Unregisters an existing hotkey.
   * @param shortcut The key combination to unregister.
   */
  unregister(shortcut: string): void {
    try {
      if (this.hotkeys.has(shortcut)) {
        globalShortcut.unregister(shortcut);
        this.hotkeys.delete(shortcut);
        this.logger.info(`Unregistered hotkey: ${shortcut}`);
      }
    } catch (error) {
      this.logger.error(`Error unregistering hotkey "${shortcut}": ${error}`);
    }
  }

  /**
   * Unregisters all hotkeys.
   */
  unregisterAll(): void {
    try {
      globalShortcut.unregisterAll();
      this.hotkeys.clear();
      this.logger.info('Unregistered all hotkeys');
    } catch (error) {
      this.logger.error(`Error unregistering all hotkeys: ${error}`);
    }
  }

  /**
   * Retrieves all registered hotkeys.
   * @returns Array of Hotkey objects.
   */
  getAllHotkeys(): Hotkey[] {
    return Array.from(this.hotkeys.values());
  }

  /**
   * Checks if a hotkey is already registered.
   * @param shortcut The key combination to check.
   * @returns Boolean indicating if the hotkey is registered.
   */
  isRegistered(shortcut: string): boolean {
    return this.hotkeys.has(shortcut);
  }

  /**
   * Creates a new profile with the current hotkeys.
   * @param profileName Name of the new profile.
   */
  createProfile(profileName: string): boolean {
    if (this.profiles.has(profileName)) {
      this.logger.warn(`Profile "${profileName}" already exists.`);
      return false;
    }

    const hotkeys = this.getAllHotkeys();
    this.profiles.set(profileName, { name: profileName, hotkeys });
    this.logger.info(`Created profile: ${profileName}`);
    return true;
  }

  /**
   * Switches to a specified profile.
   * @param profileName Name of the profile to switch to.
   */
  switchProfile(profileName: string): boolean {
    if (!this.profiles.has(profileName)) {
      this.logger.error(`Profile "${profileName}" does not exist.`);
      return false;
    }

    this.unregisterAll();

    const profile = this.profiles.get(profileName)!;
    for (const hotkey of profile.hotkeys) {
      this.register(hotkey.shortcut, hotkey.callback, hotkey.global);
    }

    this.activeProfile = profileName;
    this.logger.info(`Switched to profile: ${profileName}`);
    return true;
  }

  /**
   * Deletes a specified profile.
   * @param profileName Name of the profile to delete.
   */
  deleteProfile(profileName: string): boolean {
    if (!this.profiles.has(profileName)) {
      this.logger.error(`Profile "${profileName}" does not exist.`);
      return false;
    }

    this.profiles.delete(profileName);
    this.logger.info(`Deleted profile: ${profileName}`);
    return true;
  }

  /**
   * Retrieves all profiles.
   * @returns Array of HotkeyProfile objects.
   */
  getAllProfiles(): HotkeyProfile[] {
    return Array.from(this.profiles.values());
  }

  /**
   * Renames an existing profile.
   * @param oldName Current name of the profile.
   * @param newName New name for the profile.
   */
  renameProfile(oldName: string, newName: string): boolean {
    if (!this.profiles.has(oldName)) {
      this.logger.error(`Profile "${oldName}" does not exist.`);
      return false;
    }

    if (this.profiles.has(newName)) {
      this.logger.warn(`Profile "${newName}" already exists.`);
      return false;
    }

    const profile = this.profiles.get(oldName)!;
    this.profiles.delete(oldName);
    this.profiles.set(newName, { name: newName, hotkeys: profile.hotkeys });
    this.logger.info(`Renamed profile "${oldName}" to "${newName}"`);
    return true;
  }
}
