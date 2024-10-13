import React from 'react';
import { Hotkey } from '../../types';
interface HotkeyItemProps {
    hotkey: Hotkey;
    onEdit: (hotkey: Hotkey) => void;
    onDelete: (shortcut: string) => void;
}
declare const HotkeyItem: React.FC<HotkeyItemProps>;
export default HotkeyItem;
