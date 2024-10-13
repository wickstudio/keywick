import React from 'react';
import { Hotkey } from '../../types';

interface HotkeyItemProps {
  hotkey: Hotkey;
  onEdit: (hotkey: Hotkey) => void;
  onDelete: (shortcut: string) => void;
}

const HotkeyItem: React.FC<HotkeyItemProps> = ({ hotkey, onEdit, onDelete }) => {
  return (
    <li className="hotkey-item">
      <span className="shortcut">{hotkey.shortcut}</span>
      <span className="type">{hotkey.global ? 'Global' : 'Local'}</span>
      <button
        onClick={() => onEdit(hotkey)}
        className="edit-button"
        aria-label={`Edit hotkey ${hotkey.shortcut}`}
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(hotkey.shortcut)}
        className="delete-button"
        aria-label={`Delete hotkey ${hotkey.shortcut}`}
      >
        Delete
      </button>
    </li>
  );
};

export default HotkeyItem;