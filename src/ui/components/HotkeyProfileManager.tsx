import React, { useState, useEffect } from 'react';
import { HotkeyManager, HotkeyProfile } from '../../core/HotkeyManager';

interface HotkeyProfileManagerProps {
  hotkeyManager: HotkeyManager;
  onProfileSwitch: () => void;
}

const HotkeyProfileManager: React.FC<HotkeyProfileManagerProps> = ({
  hotkeyManager,
  onProfileSwitch,
}) => {
  const [profiles, setProfiles] = useState<HotkeyProfile[]>([]);
  const [newProfileName, setNewProfileName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProfiles(hotkeyManager.getAllProfiles());
  }, [hotkeyManager]);

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) {
      setError('Profile name cannot be empty.');
      return;
    }

    const success = hotkeyManager.createProfile(newProfileName);
    if (success) {
      setProfiles(hotkeyManager.getAllProfiles());
      setNewProfileName('');
      setError(null);
    } else {
      setError(`Failed to create profile "${newProfileName}".`);
    }
  };

  const handleSwitchProfile = (profileName: string) => {
    const success = hotkeyManager.switchProfile(profileName);
    if (success) {
      setProfiles(hotkeyManager.getAllProfiles());
      onProfileSwitch();
    } else {
      setError(`Failed to switch to profile "${profileName}".`);
    }
  };

  const handleDeleteProfile = (profileName: string) => {
    const success = hotkeyManager.deleteProfile(profileName);
    if (success) {
      setProfiles(hotkeyManager.getAllProfiles());
    } else {
      setError(`Failed to delete profile "${profileName}".`);
    }
  };

  const handleRenameProfile = (oldName: string, newName: string) => {
    if (!newName.trim()) {
      setError('New profile name cannot be empty.');
      return;
    }

    const success = hotkeyManager.renameProfile(oldName, newName);
    if (success) {
      setProfiles(hotkeyManager.getAllProfiles());
      setError(null);
    } else {
      setError(`Failed to rename profile "${oldName}" to "${newName}".`);
    }
  };

  return (
    <div className="profile-manager">
      <h2>Hotkey Profiles</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {profiles.map((profile) => (
          <li key={profile.name} className="profile-item">
            <span>{profile.name}</span>
            <button onClick={() => handleSwitchProfile(profile.name)}>Switch</button>
            <button onClick={() => handleDeleteProfile(profile.name)}>Delete</button>
            <button
              onClick={() =>
                handleRenameProfile(
                  profile.name,
                  prompt('Enter new profile name:', profile.name) || profile.name
                )
              }
            >
              Rename
            </button>
          </li>
        ))}
      </ul>
      <div className="create-profile">
        <input
          type="text"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          placeholder="New Profile Name"
        />
        <button onClick={handleCreateProfile}>Create Profile</button>
      </div>
    </div>
  );
};

export default HotkeyProfileManager;