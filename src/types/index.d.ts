export interface Hotkey {
    shortcut: string;
    callback: () => void;
    global: boolean;
  }  