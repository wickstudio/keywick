import React from 'react';
import { Hotkey } from '../../types';
interface HotkeyEditorProps {
    existingHotkey?: Hotkey;
    onSave: (hotkey: Hotkey) => void;
    onCancel: () => void;
}
declare const HotkeyEditor: React.FC<HotkeyEditorProps>;
export default HotkeyEditor;
