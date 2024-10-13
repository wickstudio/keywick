import { HotkeyManager } from './HotkeyManager';
import { Logger } from './utils';

/**
 * Handles conflicts when registering hotkeys.
 */
export class ConflictResolver {
  private manager: HotkeyManager;
  private logger: Logger;

  constructor(manager: HotkeyManager) {
    this.manager = manager;
    this.logger = new Logger();
  }

  /**
   * Resolves a conflict for a given shortcut.
   * @param shortcut The conflicting key combination.
   */
  resolve(shortcut: string): void {
    try {
      if (this.manager.isRegistered(shortcut)) {
        this.logger.warn(`Conflict detected for shortcut: ${shortcut}. Unregistering existing hotkey.`);
        this.manager.unregister(shortcut);
      }
    } catch (error) {
      this.logger.error(`Error resolving conflict for "${shortcut}": ${error}`);
    }
  }
}