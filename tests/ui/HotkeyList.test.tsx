import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HotkeyList from '../../src/ui/components/HotkeyList';
import { Hotkey } from '../../src/types';

describe('HotkeyList Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const hotkeys: Hotkey[] = [
    { shortcut: 'CommandOrControl+X', callback: jest.fn(), global: true },
    { shortcut: 'CommandOrControl+Y', callback: jest.fn(), global: false },
  ];

  beforeEach(() => {
    render(<HotkeyList hotkeys={hotkeys} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
  });

  it('should display all hotkeys', () => {
    expect(screen.getByText('CommandOrControl+X')).toBeInTheDocument();
    expect(screen.getByText('Global')).toBeInTheDocument();
    expect(screen.getByText('CommandOrControl+Y')).toBeInTheDocument();
    expect(screen.getByText('Local')).toBeInTheDocument();
  });

  it('should call onEdit when Edit button is clicked', () => {
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(hotkeys[0]);
  });

  it('should call onDelete when Delete button is clicked', () => {
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[1]);
    expect(mockOnDelete).toHaveBeenCalledWith('CommandOrControl+Y');
  });
});