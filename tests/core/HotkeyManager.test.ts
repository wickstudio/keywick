import { HotkeyManager } from '../../src/core/HotkeyManager';
import { globalShortcut, app } from 'electron';
import { Hotkey } from '../../src/types';

jest.mock('electron', () => ({
  app: {
    on: jest.fn(),
  },
  globalShortcut: {
    register: jest.fn(),
    unregister: jest.fn(),
    unregisterAll: jest.fn(),
  },
}));

describe('HotkeyManager', () => {
  let manager: HotkeyManager;

  beforeEach(() => {
    manager = new HotkeyManager();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a global hotkey successfully', () => {
    (globalShortcut.register as jest.Mock).mockReturnValue(true);
    const callback = jest.fn();
    const result = manager.register('CommandOrControl+X', callback, true);

    expect(globalShortcut.register).toHaveBeenCalledWith('CommandOrControl+X', callback);
    expect(result).toBe(true);
    expect(manager.getAllHotkeys()).toHaveLength(1);
  });

  it('should handle failed hotkey registration', () => {
    (globalShortcut.register as jest.Mock).mockReturnValue(false);
    const callback = jest.fn();
    const result = manager.register('CommandOrControl+Y', callback, true);

    expect(globalShortcut.register).toHaveBeenCalledWith('CommandOrControl+Y', callback);
    expect(result).toBe(false);
    expect(manager.getAllHotkeys()).toHaveLength(0);
  });

  it('should unregister a registered hotkey', () => {
    (globalShortcut.register as jest.Mock).mockReturnValue(true);
    const callback = jest.fn();
    manager.register('CommandOrControl+Z', callback, true);

    manager.unregister('CommandOrControl+Z');

    expect(globalShortcut.unregister).toHaveBeenCalledWith('CommandOrControl+Z');
    expect(manager.getAllHotkeys()).toHaveLength(0);
  });

  it('should unregister all hotkeys on quit', () => {
    (globalShortcut.register as jest.Mock).mockReturnValue(true);
    manager.register('CommandOrControl+A', jest.fn(), true);
    manager.register('CommandOrControl+B', jest.fn(), true);

    manager.unregisterAll();

    expect(globalShortcut.unregisterAll).toHaveBeenCalled();
    expect(manager.getAllHotkeys()).toHaveLength(0);
  });

  it('should resolve conflicts by unregistering existing hotkey', () => {
    (globalShortcut.register as jest.Mock).mockReturnValue(true);
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    manager.register('CommandOrControl+X', callback1, true);
    manager.register('CommandOrControl+X', callback2, true);

    expect(globalShortcut.unregister).toHaveBeenCalledWith('CommandOrControl+X');
    expect(globalShortcut.register).toHaveBeenCalledWith('CommandOrControl+X', callback2);
    expect(manager.getAllHotkeys()).toHaveLength(1);
    expect(manager.getAllHotkeys()[0].callback).toBe(callback2);
  });
});