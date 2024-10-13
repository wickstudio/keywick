import React from 'react';
import { HotkeyManager } from '../../core/HotkeyManager';
interface HotkeyProfileManagerProps {
    hotkeyManager: HotkeyManager;
    onProfileSwitch: () => void;
}
declare const HotkeyProfileManager: React.FC<HotkeyProfileManagerProps>;
export default HotkeyProfileManager;
