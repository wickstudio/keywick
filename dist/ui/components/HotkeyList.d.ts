import React from 'react';
import { Hotkey } from '../../types';
interface HotkeyListProps {
    hotkeys: Hotkey[];
    onEdit: (hotkey: Hotkey) => void;
    onDelete: (shortcut: string) => void;
}
declare const HotkeyList: React.FC<HotkeyListProps>;
export default HotkeyList;
