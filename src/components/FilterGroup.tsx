import { ANY, type FilterValue } from '../utils/filters';

interface FilterGroupProps {
  label: string;
  anyLabel: string;
  options: string[];
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

const FilterGroup = ({ label, anyLabel, options, value, onChange }: FilterGroupProps) => (
  <div className="flex__small--12">
    <p className="section__label">{label}</p>
    <div className="flex--center">
      {[ANY, ...options].map((opt) => (
        <button
          key={opt}
          className={`button__chip${value === opt ? ' button__chip--active' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt === ANY ? anyLabel : opt}
        </button>
      ))}
    </div>
  </div>
);

export default FilterGroup;