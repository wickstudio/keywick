import { ConflictResolver } from '../../src/core/ConflictResolver';
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

describe('ConflictResolver', () => {
  let manager: HotkeyManager;
  let resolver: ConflictResolver;

  beforeEach(() => {
    manager = new HotkeyManager();
    resolver = new ConflictResolver(manager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should unregister existing hotkey when resolving conflict', () => {
    (globalShortcut.register as jest.Mock).mockReturnValue(true);
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    manager.register('CommandOrControl+X', callback1, true);
    resolver.resolve('CommandOrControl+X');

    expect(globalShortcut.unregister).toHaveBeenCalledWith('CommandOrControl+X');
    expect(manager.getAllHotkeys()).toHaveLength(0);
  });

  it('should not throw error if hotkey does not exist', () => {
    expect(() => resolver.resolve('CommandOrControl+Y')).not.toThrow();
    expect(globalShortcut.unregister).not.toHaveBeenCalled();
  });
});