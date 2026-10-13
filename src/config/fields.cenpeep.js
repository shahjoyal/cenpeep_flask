// Generated from the original HTML pages (calculator.html / tab1-3.html): every field's
// id, name, symbol, unit, default value, MANUAL/AUTO/INFO tag and readonly state.
// Nothing was retyped by hand.
export const cards = [
  {
    "target": "grid-general",
    "icon": "GD",
    "title": "General Data",
    "sub": "7 parameters"
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
    "title": "Plant Parameters — APH",
    "sub": "15 parameters"
  },
  {
    "target": "grid-design-prox",
    "icon": "DP",
    "title": "Design Conditions — Proximate",
    "sub": "4 parameters"
  },
  {
    "target": "grid-design-ult",
    "icon": "DU",
    "title": "Design Conditions — Ultimate Analysis",
    "sub": "10 parameters"
  }
];

export const grids = {
  "grid-general": [
    {
      "id": "L",
      "name": "Unit Load",
      "sym": "L",
      "uom": "MW",
      "kind": "",
      "value": "210",
      "readonly": false
    },
    {
      "id": "Ffw",
      "name": "Steam Flow",
      "sym": "Ffw",
      "uom": "T/hr",
      "kind": "",
      "value": "615",
      "readonly": false
    },
    {
      "id": "Fin",
      "name": "Total Coal Flow",
      "sym": "Fin",
      "uom": "T/hr",
      "kind": "",
      "value": "140",
      "readonly": false
    },
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
      "id": "O2in",
      "name": "Avg. Flue Gas O₂ — APH In",
      "sym": "O2in",
      "uom": "%",
      "kind": "",
      "value": "3.5",
      "readonly": false
    },
    {
      "id": "CO2in",
      "name": "Avg. Flue Gas CO₂ — APH In",
      "sym": "CO2in",
      "uom": "%",
      "kind": "field-formula",
      "value": null,
      "readonly": true,
      "tag": {
        "cls": "formula-tag",
        "text": "AUTO"
      },
      "formula": true
    },
    {
      "id": "COin",
      "name": "Avg. Flue Gas CO — APH In",
      "sym": "COin",
      "uom": "ppm",
      "kind": "field-manual",
      "value": "39",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "O2out",
      "name": "Avg. Flue Gas O₂ — APH Out",
      "sym": "O2out",
      "uom": "%",
      "kind": "",
      "value": "5",
      "readonly": false
    },
    {
      "id": "CO2out",
      "name": "Avg. Flue Gas CO₂ — APH Out",
      "sym": "CO2out",
      "uom": "%",
      "kind": "field-formula",
      "value": null,
      "readonly": true,
      "tag": {
        "cls": "formula-tag",
        "text": "AUTO"
      },
      "formula": true
    },
    {
      "id": "COout",
      "name": "Avg. Flue Gas CO — APH Out",
      "sym": "COout",
      "uom": "ppm",
      "kind": "",
      "value": "50",
      "readonly": false
    },
    {
      "id": "Tgi",
      "name": "Avg. Flue Gas Temp — APH In",
      "sym": "Tgi",
      "uom": "°C",
      "kind": "",
      "value": "350",
      "readonly": false
    },
    {
      "id": "Tgo",
      "name": "Avg. Flue Gas Temp — APH Out",
      "sym": "Tgo",
      "uom": "°C",
      "kind": "",
      "value": "135",
      "readonly": false
    },
    {
      "id": "Tpai",
      "name": "Primary Air to APH Temp In",
      "sym": "Tpai",
      "uom": "°C",
      "kind": "",
      "value": "40",
      "readonly": false
    },
    {
      "id": "Tpao",
      "name": "Primary Air from APH Temp Out",
      "sym": "Tpao",
      "uom": "°C",
      "kind": "",
      "value": "325",
      "readonly": false
    },
    {
      "id": "Tsai",
      "name": "Secondary Air to APH Temp In",
      "sym": "Tsai",
      "uom": "°C",
      "kind": "",
      "value": "34",
      "readonly": false
    },
    {
      "id": "Tsao",
      "name": "Secondary Air from APH Temp Out",
      "sym": "Tsao",
      "uom": "°C",
      "kind": "",
      "value": "325",
      "readonly": false
    },
    {
      "id": "Fsa",
      "name": "Total Secondary Air Flow",
      "sym": "Fsa",
      "uom": "TPH",
      "kind": "",
      "value": "450",
      "readonly": false
    },
    {
      "id": "Fpa",
      "name": "Total Primary Air Flow",
      "sym": "Fpa",
      "uom": "TPH",
      "kind": "",
      "value": "250",
      "readonly": false
    },
    {
      "id": "Tref",
      "name": "Design Ambient / Ref Air Temp",
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
  ],
  "grid-design-prox": [
    {
      "id": "Md",
      "name": "Moisture — Design",
      "sym": "Md",
      "uom": "%",
      "kind": "field-manual",
      "value": "13",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "Ad",
      "name": "Ash — Design",
      "sym": "Ad",
      "uom": "%",
      "kind": "field-manual",
      "value": "40",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "VMd",
      "name": "Volatile Matter — Design",
      "sym": "VMd",
      "uom": "%",
      "kind": "field-manual",
      "value": "24",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "FCd",
      "name": "Fixed Carbon — Design",
      "sym": "FCd",
      "uom": "%",
      "kind": "field-manual",
      "value": "23",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    }
  ],
  "grid-design-ult": [
    {
      "id": "Cd",
      "name": "Carbon — Design",
      "sym": "Cd",
      "uom": "%",
      "kind": "field-formula",
      "value": null,
      "readonly": true,
      "tag": {
        "cls": "formula-tag",
        "text": "AUTO"
      },
      "formula": true
    },
    {
      "id": "Sd",
      "name": "Sulfur — Design",
      "sym": "Sd",
      "uom": "%",
      "kind": "field-manual",
      "value": "0.3",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "Hd",
      "name": "Hydrogen — Design",
      "sym": "Hd",
      "uom": "%",
      "kind": "field-formula",
      "value": null,
      "readonly": true,
      "tag": {
        "cls": "formula-tag",
        "text": "AUTO"
      },
      "formula": true
    },
    {
      "id": "Md2",
      "name": "Moisture — Design (Ultimate)",
      "sym": "Md2",
      "uom": "%",
      "kind": "field-formula",
      "value": null,
      "readonly": true,
      "tag": {
        "cls": "formula-tag",
        "text": "AUTO"
      },
      "formula": true
    },
    {
      "id": "Nd",
      "name": "Nitrogen — Design",
      "sym": "Nd",
      "uom": "%",
      "kind": "field-formula",
      "value": null,
      "readonly": true,
      "tag": {
        "cls": "formula-tag",
        "text": "AUTO"
      },
      "formula": true
    },
    {
      "id": "Od",
      "name": "Oxygen — Design",
      "sym": "Od",
      "uom": "%",
      "kind": "field-formula",
      "value": null,
      "readonly": true,
      "tag": {
        "cls": "formula-tag",
        "text": "AUTO"
      },
      "formula": true
    },
    {
      "id": "Ad2",
      "name": "Ash — Design (Ultimate)",
      "sym": "Ad2",
      "uom": "%",
      "kind": "field-formula",
      "value": null,
      "readonly": true,
      "tag": {
        "cls": "formula-tag",
        "text": "AUTO"
      },
      "formula": true
    },
    {
      "id": "GCVd",
      "name": "GCV — Design",
      "sym": "GCVd",
      "uom": "kcal/kg",
      "kind": "field-manual",
      "value": "3300",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "Trad",
      "name": "Ref. Air Temp — Design",
      "sym": "Trad",
      "uom": "°C",
      "kind": "field-manual",
      "value": "38",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    },
    {
      "id": "Mwvd",
      "name": "Moisture in Air — Design",
      "sym": "Mwvd",
      "uom": "kg/kg",
      "kind": "field-manual",
      "value": "0.013",
      "readonly": false,
      "tag": {
        "cls": "manual-tag",
        "text": "MANUAL"
      }
    }
  ]
};
