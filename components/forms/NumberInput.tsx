/**
 * 재사용 가능한 숫자 입력 컴포넌트
 * 검증 및 접근성 포함
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { normalizeInput } from '@/lib/validation';
import { useCallback } from 'react';

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  step?: number;
  unit?: string;
  ariaLabel?: string;
}

export default function NumberInput({
  id,
  label,
  value,
  onChange,
  placeholder = '0',
  min = 0,
  step = 0.01,
  unit,
  ariaLabel,
}: NumberInputProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeInput(e.target.value);
    onChange(normalized);
  }, [onChange]);

  const displayLabel = unit ? `${label} (${unit})` : label;
  const ariaLabelText = ariaLabel || displayLabel;

  return (
    <div>
      <Label htmlFor={id}>{displayLabel}</Label>
      <Input
        id={id}
        type="number"
        min={min}
        step={step}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabelText}
      />
    </div>
  );
}

