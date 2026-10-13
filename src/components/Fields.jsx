// Section cards + input grids. Markup/classes are identical to the original
// HTML (.section-card, .input-grid.is-collapsed, .field …); the field lists
// themselves come from src/config/fields.*.js (generated from that HTML).
export function SectionCards({ cards, open, onToggle }) {
  return (
    <div className="section-cards-grid">
      {cards.map((c) => (
        <div key={c.target} className={'section-card' + (open[c.target] ? ' open' : '')} data-target={c.target} onClick={() => onToggle(c.target)}>
          <div className="section-card-icon">{c.icon}</div>
          <div className="section-card-body">
            <div className="section-card-title">{c.title}</div>
            <div className="section-card-sub">{c.sub}</div>
          </div>
          <span className="section-toggle">▸</span>
        </div>
      ))}
    </div>
  );
}

// values: {id: string}; derived: {id: string} for the readonly AUTO fields
export function FieldGrid({ id, fields, open, values, derived = {}, onChange, detected, missing }) {
  return (
    <div className={'input-grid' + (open ? '' : ' is-collapsed')} id={id}>
      {fields.map((f) => {
        const cls = ['field-input'];
        if (f.formula) cls.push('formula-input');
        if (detected.has(f.id)) cls.push('field-detected');
        if (missing.has(f.id)) cls.push('field-missing');
        const value = f.readonly ? (derived[f.id] ?? '') : (values[f.id] ?? '');
        return (
          <div key={f.id} className={'field' + (f.kind ? ' ' + f.kind : '')}>
            <div className="field-top">
              <span className="field-name">
                {f.name}{f.tag && <> <span className={f.tag.cls}>{f.tag.text}</span></>}
              </span>
              <span className="field-sym">{f.sym}</span>
            </div>
            <div className="field-bottom">
              <input className={cls.join(' ')} id={f.id} type="number" value={value}
                step={f.step} readOnly={f.readonly}
                onChange={f.readonly ? undefined : (e) => onChange(f.id, e.target.value)} />
              <span className="field-uom">{f.uom}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
