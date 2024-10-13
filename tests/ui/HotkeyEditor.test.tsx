import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HotkeyEditor from '../../src/ui/components/HotkeyEditor';
import { Hotkey } from '../../src/core/Hotkey';

describe('HotkeyEditor Component', () => {
  test('renders correctly with initial state', () => {
    render(<HotkeyEditor onSave={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByText('Add Hotkey')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., CommandOrControl+X')).toBeInTheDocument();
    expect(screen.getByText('Global Hotkey')).toBeInTheDocument();
  });

});