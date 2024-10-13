export class Logger {
    info(message: string): void {
      console.log(`[KeyWick INFO]: ${message}`);
    }
  
    warn(message: string): void {
      console.warn(`[KeyWick WARN]: ${message}`);
    }
  
    error(message: string): void {
      console.error(`[KeyWick ERROR]: ${message}`);
    }
  }
  
  /**
   * Validates a shortcut string.
   * @param shortcut The shortcut string to validate.
   * @returns Boolean indicating if the shortcut is valid.
   */
  export function validateShortcut(shortcut: string): boolean {
    const parts = shortcut.split('+');
    if (parts.length < 2) return false;
  
    const modifiers = ['Command', 'Control', 'Alt', 'Shift', 'Super'];
    const mainKey = parts[parts.length - 1];
  
    const modifierSet = new Set(parts.slice(0, -1));
    for (const mod of modifierSet) {
      if (!modifiers.includes(mod)) {
        return false;
      }
    }
  
    // Main key validation: alphanumeric or function keys
    const mainKeyPattern = /^[A-Za-z0-9]+$/;
    const functionKeyPattern = /^F[1-9][0-9]?$/; // F1 to F12
    return mainKeyPattern.test(mainKey) || functionKeyPattern.test(mainKey);
  }  