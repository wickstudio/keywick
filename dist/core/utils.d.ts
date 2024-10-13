export declare class Logger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
/**
 * Validates a shortcut string.
 * @param shortcut The shortcut string to validate.
 * @returns Boolean indicating if the shortcut is valid.
 */
export declare function validateShortcut(shortcut: string): boolean;
