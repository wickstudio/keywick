import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import HotkeyList from './components/HotkeyList';
import HotkeyEditor from './components/HotkeyEditor';
import HotkeyProfileManager from './components/HotkeyProfileManager';
import { HotkeyManager } from '../core/HotkeyManager';
import { Hotkey } from '../types';
import { validateShortcut } from '../core/utils';
import './styles.css';

// Initialize the HotkeyManager instance
const hotkeyManager = new HotkeyManager();

/**
 * The main App component that integrates all UI components for managing hotkeys.
 */
const App: React.FC = () => {
  const [hotkeys, setHotkeys] = useState<Hotkey[]>([]);
  const [editingHotkey, setEditingHotkey] = useState<Hotkey | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Refreshes the list of hotkeys from the HotkeyManager.
   */
  const refreshHotkeys = () => {
    setHotkeys(hotkeyManager.getAllHotkeys());
  };

  // Load the initial list of hotkeys when the component mounts
  useEffect(() => {
    refreshHotkeys();
  }, []);

  /**
   * Handles the addition of a new hotkey by setting the editing state.
   */
  const handleAddHotkey = () => {
    setEditingHotkey({ shortcut: '', callback: () => {}, global: true });
  };

  /**
   * Handles editing an existing hotkey by setting the editing state.
   * @param hotkey The hotkey to be edited.
   */
  const handleEditHotkey = (hotkey: Hotkey) => {
    setEditingHotkey(hotkey);
  };

  /**
   * Handles saving a hotkey after creation or editing.
   * @param hotkey The hotkey to be saved.
   */
  const handleSaveHotkey = (hotkey: Hotkey) => {
    if (!hotkey.shortcut) {
      setError('Shortcut cannot be empty.');
      return;
    }

    if (!validateShortcut(hotkey.shortcut)) {
      setError('Invalid shortcut format.');
      return;
    }

    const success = hotkeyManager.register(hotkey.shortcut, hotkey.callback, hotkey.global);
    if (success) {
      setError(null);
      refreshHotkeys();
      setEditingHotkey(null);
    } else {
      setError(`Failed to register shortcut: ${hotkey.shortcut}`);
    }
  };

  /**
   * Handles deleting a hotkey.
   * @param shortcut The shortcut string of the hotkey to be deleted.
   */
  const handleDeleteHotkey = (shortcut: string) => {
    hotkeyManager.unregister(shortcut);
    refreshHotkeys();
  };

  /**
   * Cancels the hotkey editing or creation process.
   */
  const handleCancel = () => {
    setEditingHotkey(null);
    setError(null);
  };

  /**
   * Refreshes the hotkeys when a profile is switched.
   */
  const handleProfileSwitch = () => {
    refreshHotkeys();
  };

  return (
    <div className="container">
      <h1>KeyWick Hotkey Manager</h1>
      {error && <div className="error">{error}</div>}
      <HotkeyProfileManager hotkeyManager={hotkeyManager} onProfileSwitch={handleProfileSwitch} />
      <HotkeyList hotkeys={hotkeys} onEdit={handleEditHotkey} onDelete={handleDeleteHotkey} />
      <button onClick={handleAddHotkey} className="add-button">
        Add Hotkey
      </button>
      {editingHotkey && (
        <HotkeyEditor
          existingHotkey={editingHotkey.shortcut ? editingHotkey : undefined}
          onSave={handleSaveHotkey}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

// Render the App component into the DOM
ReactDOM.render(<App />, document.getElementById('root'));