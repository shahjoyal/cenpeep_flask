// Generated from the original HTML pages (calculator.html / tab1-3.html): every field's
// id, name, symbol, unit, default value, MANUAL/AUTO/INFO tag and readonly state.
// Nothing was retyped by hand.
export const cards = [
  {
    "target": "grid-general",
    "icon": "GD",
    "title": "General Data",
    "sub": "4 parameters"
  },
  {
    "target": "grid-proximate",
    "icon": "PA",
    "title": "Proximate Analysis — As Fired",
    "sub": "6 parameters"
  },
  {
    "target": "grid-plant",
    "icon": "PP",
    "title": "Plant Parameters — Flue Gas & Temps",
    "sub": "4 parameters"
  }
];

export const grids = {
  "grid-general": [
    {
      "id": "Cba",
      "name": "Unburnt Carbon in Bottom Ash",
      "sym": "Cba",
      "uom": "%",
      "kind": "",
      "value": "1.2",
      "readonly": false
    },
    {
      "id": "Cfa",
      "name": "Unburnt Carbon in Fly Ash",
      "sym": "Cfa",
      "uom": "%",
      "kind": "",
      "value": "0.4",
      "readonly": false
    },
    {
      "id": "Pfa",
      "name": "% of Fly Ash in Total Ash",
      "sym": "Pfa",
      "uom": "%",
      "kind": "field-manual",
      "value": "80",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "Pba",
      "name": "% of Bottom Ash in Total Ash",
      "sym": "Pba",
      "uom": "%",
      "kind": "field-manual",
      "value": "20",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    }
  ],
  "grid-proximate": [
    {
      "id": "M",
      "name": "Moisture",
      "sym": "M",
      "uom": "%",
      "kind": "",
      "value": "12.2",
      "readonly": false
    },
    {
      "id": "A",
      "name": "Ash",
      "sym": "A",
      "uom": "%",
      "kind": "",
      "value": "40",
      "readonly": false
    },
    {
      "id": "VM",
      "name": "Volatile Matter",
      "sym": "VM",
      "uom": "%",
      "kind": "",
      "value": "22.9",
      "readonly": false
    },
    {
      "id": "FC",
      "name": "Fixed Carbon",
      "sym": "FC",
      "uom": "%",
      "kind": "",
      "value": "24.9",
      "readonly": false
    },
    {
      "id": "GCV",
      "name": "Gross Calorific Value (GCV)",
      "sym": "GCV",
      "uom": "kcal/kg",
      "kind": "",
      "value": "3320",
      "readonly": false
    },
    {
      "id": "S",
      "name": "Sulfur",
      "sym": "S",
      "uom": "%",
      "kind": "field-manual",
      "value": "0.6",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    }
  ],
  "grid-plant": [
    {
      "id": "O2out",
      "name": "Avg. Flue Gas O₂, dry",
      "sym": "O2out",
      "uom": "%",
      "kind": "",
      "value": "5",
      "readonly": false,
      "tag": {
        "cls": "formula-tag",
        "text": "Item 33"
      }
    },
    {
      "id": "COout",
      "name": "Avg. Flue Gas CO, dry",
      "sym": "COout",
      "uom": "ppm",
      "kind": "",
      "value": "50",
      "readonly": false,
      "tag": {
        "cls": "formula-tag",
        "text": "Item 34"
      }
    },
    {
      "id": "Tgo",
      "name": "Flue Gas Temp Leaving Boiler",
      "sym": "Tgo",
      "uom": "°C",
      "kind": "",
      "value": "135",
      "readonly": false,
      "tag": {
        "cls": "formula-tag",
        "text": "Item 13"
      }
    },
    {
      "id": "Tref",
      "name": "Reference Air Temp",
      "sym": "Tref",
      "uom": "°C",
      "kind": "field-manual",
      "value": "30",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    }
  ]
};
