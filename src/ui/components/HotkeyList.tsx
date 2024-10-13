import React from 'react';
import { Hotkey } from '../../types';
import HotkeyItem from './HotkeyItem';

interface HotkeyListProps {
  hotkeys: Hotkey[];
  onEdit: (hotkey: Hotkey) => void;
  onDelete: (shortcut: string) => void;
}

const HotkeyList: React.FC<HotkeyListProps> = ({ hotkeys, onEdit, onDelete }) => {
  return (
    <div className="hotkey-list">
      <h2>Registered Hotkeys</h2>
      {hotkeys.length === 0 ? (
        <p>No hotkeys registered.</p>
      ) : (
        <ul>
          {hotkeys.map((hk) => (
            <HotkeyItem key={hk.shortcut} hotkey={hk} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default HotkeyList;