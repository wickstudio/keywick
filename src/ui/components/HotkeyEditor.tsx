import React, { useState } from 'react';
import { Hotkey } from '../../types';
import { validateShortcut } from '../../core/utils';

interface HotkeyEditorProps {
  existingHotkey?: Hotkey;
  onSave: (hotkey: Hotkey) => void;
  onCancel: () => void;
}

const HotkeyEditor: React.FC<HotkeyEditorProps> = ({ existingHotkey, onSave, onCancel }) => {
  const [shortcut, setShortcut] = useState<string>(existingHotkey?.shortcut || '');
  const [isGlobal, setIsGlobal] = useState<boolean>(existingHotkey?.global ?? true);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!shortcut.trim()) {
      setError('Shortcut cannot be empty.');
      return;
    }

    if (!validateShortcut(shortcut)) {
      setError('Invalid shortcut format.');
      return;
    }

    onSave({ shortcut, callback: () => alert(`Hotkey ${shortcut} activated!`), global: isGlobal });
  };

  return (
    <div className="hotkey-editor">
      <h2>{existingHotkey ? 'Edit Hotkey' : 'Add Hotkey'}</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Shortcut:
        <input
          type="text"
          value={shortcut}
          onChange={(e) => setShortcut(e.target.value)}
          placeholder="e.g., CommandOrControl+X"
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={isGlobal}
          onChange={(e) => setIsGlobal(e.target.checked)}
        />
        Global Hotkey
      </label>
      <div className="buttons">
        <button onClick={handleSave} className="save-button">
          Save
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default HotkeyEditor;