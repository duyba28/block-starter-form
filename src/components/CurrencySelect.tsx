import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const CurrencySelect: React.FC<Props> = ({ name, value, onChange }) => {
  const currencies = ["USD", "EUR", "BTC"]; // Example currencies

  return (
    <FormControl fullWidth>
      <InputLabel>Currency</InputLabel>
      <Select name={name} value={value} onChange={onChange} label="Currency">
        {currencies.map(currency => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelect;