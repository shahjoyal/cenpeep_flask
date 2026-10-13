// Generated from the original HTML pages (calculator.html / tab1-3.html): every field's
// id, name, symbol, unit, default value, MANUAL/AUTO/INFO tag and readonly state.
// Nothing was retyped by hand.
export const cards = [
  {
    "target": "grid-general",
    "icon": "GD",
    "title": "General Data",
    "sub": "2 parameters"
  },
  {
    "target": "grid-fluegas",
    "icon": "FG",
    "title": "Flue Gas & Atmospheric Air",
    "sub": "6 parameters"
  },
  {
    "target": "grid-fuel",
    "icon": "FA",
    "title": "Fuel Analysis — Ultimate",
    "sub": "8 parameters"
  },
  {
    "target": "grid-ash",
    "icon": "AA",
    "title": "Ash Analysis",
    "sub": "4 parameters"
  },
  {
    "target": "grid-other",
    "icon": "OL",
    "title": "Other Losses",
    "sub": "1 parameter"
  }
];

export const grids = {
  "grid-general": [
    {
      "id": "BL",
      "name": "Boiler Load",
      "sym": "BL",
      "uom": "TPH",
      "kind": "field-info",
      "value": "20",
      "readonly": false,
      "tag": {
        "cls": "info-tag",
        "text": "INFO ONLY"
      }
    },
    {
      "id": "SP",
      "name": "Steam Pressure",
      "sym": "SP",
      "uom": "kg/cm²",
      "kind": "field-info",
      "value": "66",
      "readonly": false,
      "tag": {
        "cls": "info-tag",
        "text": "INFO ONLY"
      }
    }
  ],
  "grid-fluegas": [
    {
      "id": "O2fg",
      "name": "O₂ in Flue Gas",
      "sym": "O2fg",
      "uom": "%",
      "kind": "",
      "value": "9",
      "readonly": false
    },
    {
      "id": "COfg",
      "name": "CO in Flue Gas",
      "sym": "COfg",
      "uom": "ppm",
      "kind": "",
      "value": "800",
      "readonly": false
    },
    {
      "id": "CO2fg",
      "name": "CO₂ in Flue Gas",
      "sym": "CO2fg",
      "uom": "%",
      "kind": "",
      "value": "10.67",
      "readonly": false
    },
    {
      "id": "Tfg",
      "name": "Average Flue Gas Temperature",
      "sym": "Tfg",
      "uom": "°C",
      "kind": "",
      "value": "180",
      "readonly": false
    },
    {
      "id": "Tamb",
      "name": "Ambient Temperature",
      "sym": "Tamb",
      "uom": "°C",
      "kind": "",
      "value": "29.3",
      "readonly": false
    },
    {
      "id": "Hum",
      "name": "Humidity in Ambient Air",
      "sym": "Hum",
      "uom": "kg/kg dry air",
      "kind": "",
      "value": "0.1977",
      "readonly": false,
      "step": "0.0001"
    }
  ],
  "grid-fuel": [
    {
      "id": "C",
      "name": "Carbon",
      "sym": "C",
      "uom": "%",
      "kind": "",
      "value": "53.65",
      "readonly": false
    },
    {
      "id": "H2",
      "name": "Hydrogen",
      "sym": "H2",
      "uom": "%",
      "kind": "",
      "value": "3.25",
      "readonly": false
    },
    {
      "id": "N2",
      "name": "Nitrogen",
      "sym": "N2",
      "uom": "%",
      "kind": "",
      "value": "1.11",
      "readonly": false
    },
    {
      "id": "O2f",
      "name": "Oxygen",
      "sym": "O2f",
      "uom": "%",
      "kind": "",
      "value": "8.68",
      "readonly": false
    },
    {
      "id": "S",
      "name": "Sulphur",
      "sym": "S",
      "uom": "%",
      "kind": "",
      "value": "0.34",
      "readonly": false
    },
    {
      "id": "M",
      "name": "Moisture",
      "sym": "M",
      "uom": "%",
      "kind": "",
      "value": "14.43",
      "readonly": false
    },
    {
      "id": "A",
      "name": "Ash Content",
      "sym": "A",
      "uom": "%",
      "kind": "",
      "value": "18.54",
      "readonly": false
    },
    {
      "id": "GCV",
      "name": "GCV of Coal",
      "sym": "GCV",
      "uom": "kcal/kg",
      "kind": "",
      "value": "4291",
      "readonly": false
    }
  ],
  "grid-ash": [
    {
      "id": "Cba",
      "name": "Unburnt in Bottom Ash",
      "sym": "Cba",
      "uom": "%",
      "kind": "",
      "value": "0.11",
      "readonly": false
    },
    {
      "id": "Cfa",
      "name": "Unburnt in Fly Ash",
      "sym": "Cfa",
      "uom": "%",
      "kind": "",
      "value": "4.89",
      "readonly": false
    },
    {
      "id": "GCVba",
      "name": "GCV of Bottom Ash",
      "sym": "GCVba",
      "uom": "kcal/kg",
      "kind": "field-manual",
      "value": "0",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "GCVfa",
      "name": "GCV of Fly Ash",
      "sym": "GCVfa",
      "uom": "kcal/kg",
      "kind": "field-manual",
      "value": "0",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    }
  ],
  "grid-other": [
    {
      "id": "L6",
      "name": "Radiation & Unaccounted Losses",
      "sym": "L6",
      "uom": "%",
      "kind": "field-manual",
      "value": "1",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    }
  ]
};
