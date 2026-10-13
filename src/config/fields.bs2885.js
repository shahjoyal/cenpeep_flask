// Generated from the original HTML pages (calculator.html / tab1-3.html): every field's
// id, name, symbol, unit, default value, MANUAL/AUTO/INFO tag and readonly state.
// Nothing was retyped by hand.
export const cards = [
  {
    "target": "grid-water",
    "icon": "WS",
    "title": "Feedwater & Steam",
    "sub": "20 parameters"
  },
  {
    "target": "grid-solid",
    "icon": "SF",
    "title": "Solid Fuel — Ultimate Analysis & Firing",
    "sub": "17 parameters"
  },
  {
    "target": "grid-oil",
    "icon": "OF",
    "title": "Oil Fuel — Analysis & Firing",
    "sub": "13 parameters"
  },
  {
    "target": "grid-gas",
    "icon": "GF",
    "title": "Gaseous Fuel — Firing & CV",
    "sub": "6 parameters"
  },
  {
    "target": "grid-air",
    "icon": "AA",
    "title": "Air & Ambient Conditions",
    "sub": "4 parameters"
  },
  {
    "target": "grid-residue",
    "icon": "SR",
    "title": "Solid Residue — Ash, Dust & Riddlings",
    "sub": "14 parameters"
  },
  {
    "target": "grid-hopper",
    "icon": "WH",
    "title": "Water-Filled Ash Hopper / Quenching",
    "sub": "6 parameters"
  },
  {
    "target": "grid-extras",
    "icon": "HB",
    "title": "Heat Balance & Method B Extras",
    "sub": "11 parameters"
  }
];

export const grids = {
  "grid-water": [
    {
      "id": "bs203",
      "name": "Feedwater Quantity",
      "sym": "Item 203",
      "uom": "kg/s",
      "kind": "",
      "value": "45",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs206",
      "name": "Feedwater Enthalpy",
      "sym": "Item 206",
      "uom": "kJ/kg",
      "kind": "",
      "value": "950",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs211",
      "name": "Drum Water Enthalpy",
      "sym": "Item 211",
      "uom": "kJ/kg",
      "kind": "",
      "value": "1650",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs215",
      "name": "Drum Level — Rate of Increase",
      "sym": "Item 215",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs216",
      "name": "Blow-down Rate",
      "sym": "Item 216",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs217",
      "name": "Main Steam Spray Water Quantity",
      "sym": "Item 217",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs220",
      "name": "Main Steam Spray Water Enthalpy",
      "sym": "Item 220",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs221",
      "name": "Reheater-1 Spray Water Quantity",
      "sym": "Item 221",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs224",
      "name": "Reheater-1 Spray Water Enthalpy",
      "sym": "Item 224",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs225",
      "name": "Reheater-2 Spray Water Quantity",
      "sym": "Item 225",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs228",
      "name": "Reheater-2 Spray Water Enthalpy",
      "sym": "Item 228",
      "uom": "kJ/kg",
      "kind": "",
      "value": "950",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs246",
      "name": "Steam Leaving Unit — Enthalpy",
      "sym": "Item 246",
      "uom": "kJ/kg",
      "kind": "",
      "value": "3400",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs247",
      "name": "Reheater-1 Inlet Steam Quantity",
      "sym": "Item 247",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs250",
      "name": "Reheater-1 Inlet Steam Enthalpy",
      "sym": "Item 250",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs251",
      "name": "Reheater-1 Outlet Steam Quantity",
      "sym": "Item 251",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs254",
      "name": "Reheater-1 Outlet Steam Enthalpy",
      "sym": "Item 254",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs255",
      "name": "Reheater-2 Inlet Steam Quantity",
      "sym": "Item 255",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs258",
      "name": "Reheater-2 Inlet Steam Enthalpy",
      "sym": "Item 258",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs259",
      "name": "Reheater-2 Outlet Steam Quantity",
      "sym": "Item 259",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs262",
      "name": "Reheater-2 Outlet Steam Enthalpy",
      "sym": "Item 262",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    }
  ],
  "grid-solid": [
    {
      "id": "bs271",
      "name": "Moisture (Ultimate, As Fired)",
      "sym": "Item 271",
      "uom": "%",
      "kind": "",
      "value": "12",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs272",
      "name": "Ash (Ultimate, As Fired)",
      "sym": "Item 272",
      "uom": "%",
      "kind": "",
      "value": "38",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs273",
      "name": "Carbon (Ultimate, As Fired)",
      "sym": "Item 273",
      "uom": "%",
      "kind": "",
      "value": "38",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs274",
      "name": "Hydrogen (Ultimate, As Fired)",
      "sym": "Item 274",
      "uom": "%",
      "kind": "",
      "value": "2.5",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs275",
      "name": "Nitrogen (Ultimate, As Fired)",
      "sym": "Item 275",
      "uom": "%",
      "kind": "",
      "value": "1.0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs276",
      "name": "Sulphur (Ultimate, As Fired)",
      "sym": "Item 276",
      "uom": "%",
      "kind": "",
      "value": "0.4",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs278",
      "name": "GCV of Coal — Gross",
      "sym": "Item 278",
      "uom": "kJ/kg",
      "kind": "",
      "value": "13900",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs279",
      "name": "GCV of Coal — Net",
      "sym": "Item 279",
      "uom": "kJ/kg",
      "kind": "",
      "value": "13300",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs280",
      "name": "Mechanical Stoker Firing Rate",
      "sym": "Item 280",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs291",
      "name": "Pulverized Fuel — Total Weighed",
      "sym": "Item 291",
      "uom": "kg/s",
      "kind": "",
      "value": "9.2",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs295",
      "name": "Pulverized Fuel — Mill Rejects (Total)",
      "sym": "Item 295",
      "uom": "kg/s",
      "kind": "",
      "value": "0.05",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs301",
      "name": "Calorific Value of Mill Rejects — Gross",
      "sym": "Item 301",
      "uom": "kJ/kg",
      "kind": "",
      "value": "2000",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs323",
      "name": "Heat Expended in Drying Fuel",
      "sym": "Item 323",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs325",
      "name": "Dryer Gas Analysis — CO2",
      "sym": "Item 325",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs326",
      "name": "Dryer Gas Analysis — CO",
      "sym": "Item 326",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs328",
      "name": "Ashpit Refuse Quantity",
      "sym": "Item 328",
      "uom": "kg/s",
      "kind": "",
      "value": "0.05",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs329",
      "name": "Ashpit Refuse — % Combustible",
      "sym": "Item 329",
      "uom": "%",
      "kind": "",
      "value": "5",
      "readonly": false,
      "step": "any"
    }
  ],
  "grid-oil": [
    {
      "id": "bs332",
      "name": "Moisture (Oil, Ultimate)",
      "sym": "Item 332",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs333",
      "name": "Ash (Oil, Ultimate)",
      "sym": "Item 333",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs334",
      "name": "Carbon (Oil, Ultimate)",
      "sym": "Item 334",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs335",
      "name": "Hydrogen (Oil, Ultimate)",
      "sym": "Item 335",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs336",
      "name": "Sulphur (Oil, Ultimate)",
      "sym": "Item 336",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs343",
      "name": "Specific Heat of Oil",
      "sym": "Item 343",
      "uom": "kJ/(kg·K)",
      "kind": "",
      "value": "2.1",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs344",
      "name": "GCV of Oil — Gross",
      "sym": "Item 344",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs345",
      "name": "GCV of Oil — Net",
      "sym": "Item 345",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs349",
      "name": "Oil Firing Rate",
      "sym": "Item 349",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs350",
      "name": "Temperature of Oil as Weighed",
      "sym": "Item 350",
      "uom": "°C",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs352",
      "name": "Temperature of Oil Delivered to Burner",
      "sym": "Item 352",
      "uom": "°C",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs357",
      "name": "Atomizing Air/Steam Quantity",
      "sym": "Item 357",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs360",
      "name": "Heat Used in Atomizing Oil",
      "sym": "Item 360",
      "uom": "kW",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    }
  ],
  "grid-gas": [
    {
      "id": "bs362",
      "name": "Gas Firing Rate — Volume",
      "sym": "Item 362",
      "uom": "m³/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs363",
      "name": "Gas Firing Rate — Mass",
      "sym": "Item 363",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs390",
      "name": "GCV of Gas — Gross (Volume basis)",
      "sym": "Item 390",
      "uom": "kJ/m³",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs391",
      "name": "GCV of Gas — Net (Volume basis)",
      "sym": "Item 391",
      "uom": "kJ/m³",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs392",
      "name": "GCV of Gas — Gross (Mass basis)",
      "sym": "Item 392",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs393",
      "name": "GCV of Gas — Net (Mass basis)",
      "sym": "Item 393",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    }
  ],
  "grid-air": [
    {
      "id": "bs397",
      "name": "Ambient Air Humidity",
      "sym": "Item 397",
      "uom": "%",
      "kind": "",
      "value": "60",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs398",
      "name": "Temperature at Entry to Air Intakes",
      "sym": "Item 398",
      "uom": "°C",
      "kind": "",
      "value": "30",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs399",
      "name": "Moisture per Unit Mass of Dry Air",
      "sym": "Item 399",
      "uom": "kg/kg",
      "kind": "",
      "value": "0.018",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs427",
      "name": "Flue Gas Exit Temperature (LTAH/Economizer Outlet)",
      "sym": "Item 427",
      "uom": "°C",
      "kind": "",
      "value": "135",
      "readonly": false,
      "step": "any"
    }
  ],
  "grid-residue": [
    {
      "id": "bs450",
      "name": "Bottom Ash — Proportion of Fuel (Dry Basis)",
      "sym": "Item 450",
      "uom": "%",
      "kind": "",
      "value": "8",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs451",
      "name": "Bottom Ash — Combustible Content",
      "sym": "Item 451",
      "uom": "%",
      "kind": "",
      "value": "1.2",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs453",
      "name": "Bottom Ash — Temperature as Discharged",
      "sym": "Item 453",
      "uom": "°C",
      "kind": "",
      "value": "200",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs454",
      "name": "Bottom Ash — Specific Heat",
      "sym": "Item 454",
      "uom": "kJ/(kg·K)",
      "kind": "",
      "value": "0.84",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs460",
      "name": "Coarse Dust — Proportion of Fuel (Dry Basis)",
      "sym": "Item 460",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs461",
      "name": "Coarse Dust — Combustible Content",
      "sym": "Item 461",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs463",
      "name": "Coarse Dust — Temperature as Discharged",
      "sym": "Item 463",
      "uom": "°C",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs464",
      "name": "Coarse Dust — Specific Heat",
      "sym": "Item 464",
      "uom": "kJ/(kg·K)",
      "kind": "",
      "value": "0.84",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs466",
      "name": "Fine Dust (Fly Ash) — Proportion of Fuel (Dry Basis)",
      "sym": "Item 466",
      "uom": "%",
      "kind": "",
      "value": "30",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs467",
      "name": "Fine Dust (Fly Ash) — Combustible Content",
      "sym": "Item 467",
      "uom": "%",
      "kind": "",
      "value": "0.4",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs469",
      "name": "Fine Dust (Fly Ash) — Temperature as Discharged",
      "sym": "Item 469",
      "uom": "°C",
      "kind": "",
      "value": "135",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs470",
      "name": "Fine Dust (Fly Ash) — Specific Heat",
      "sym": "Item 470",
      "uom": "kJ/(kg·K)",
      "kind": "",
      "value": "0.84",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs472",
      "name": "Riddlings — Proportion of Fuel (Dry Basis)",
      "sym": "Item 472",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs473",
      "name": "Riddlings — Combustible Content",
      "sym": "Item 473",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    }
  ],
  "grid-hopper": [
    {
      "id": "bs475",
      "name": "Hopper Water Inlet Temperature",
      "sym": "Item 475",
      "uom": "°C",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs476",
      "name": "Hopper Water Inlet Quantity",
      "sym": "Item 476",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs477",
      "name": "Hopper Water Outlet Temperature",
      "sym": "Item 477",
      "uom": "°C",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs478",
      "name": "Hopper Water Outlet Quantity",
      "sym": "Item 478",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs479",
      "name": "Quenching Spray Water Temperature",
      "sym": "Item 479",
      "uom": "°C",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs480",
      "name": "Quenching Spray Water Quantity",
      "sym": "Item 480",
      "uom": "kg/s",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    }
  ],
  "grid-extras": [
    {
      "id": "bs519",
      "name": "Heat Added from Separate External Air Source",
      "sym": "Item 519",
      "uom": "kW",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs601",
      "name": "Calorific Value of Carbon",
      "sym": "Item 601",
      "uom": "kJ/kg",
      "kind": "",
      "value": "33820",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs701",
      "name": "CO in Flue Gases per Unit Mass of Fuel",
      "sym": "Item 701",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs702",
      "name": "Calorific Value of CO",
      "sym": "Item 702",
      "uom": "kJ/kg",
      "kind": "",
      "value": "10120",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs704",
      "name": "Hydrocarbons in Flue Gases per Unit Mass of Fuel",
      "sym": "Item 704",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs705",
      "name": "Calorific Value of Hydrocarbons",
      "sym": "Item 705",
      "uom": "kJ/kg",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs708",
      "name": "Dry Flue Gases per Unit Mass of Fuel",
      "sym": "Item 708",
      "uom": "kg mol/kg",
      "kind": "",
      "value": "0.35",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs807",
      "name": "Combustion Air per Unit Mass of Fuel",
      "sym": "Item 807",
      "uom": "kg/kg",
      "kind": "",
      "value": "10.2",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs907",
      "name": "Loss in Heating Fuel up to Air Supply Temp",
      "sym": "Item 907",
      "uom": "%",
      "kind": "",
      "value": "0",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs909",
      "name": "Radiation & Convection Loss (Method B)",
      "sym": "Item 909",
      "uom": "%",
      "kind": "",
      "value": "1.2",
      "readonly": false,
      "step": "any"
    },
    {
      "id": "bs910",
      "name": "Heat Equivalent of Auxiliary Power (Method B)",
      "sym": "Item 910",
      "uom": "%",
      "kind": "",
      "value": "0.3",
      "readonly": false,
      "step": "any"
    }
  ]
};
