// ════════════════════════════════════════════════════════════════════
// Pure calculation logic — copied VERBATIM from public/script.js (lines 417-594).
// Nothing in here touches the DOM; only the `export` lines were added.
// ════════════════════════════════════════════════════════════════════
const INPUT_IDS = ['L','Ffw','Fin','Cba','Cfa','Pfa','Pba','M','A','VM','FC','GCV','S',
  'O2in','CO2in','COin','O2out','CO2out','COout','Tgi','Tgo','Tpai','Tpao',
  'Tsai','Tsao','Fsa','Fpa','Tref',
  'Md','Ad','VMd','FCd','Cd','Sd','Hd','Md2','Nd','Od','Ad2','GCVd','Trad','Mwvd'];
const INPUT_LABELS = {
  L:'Unit Load (MW)',Ffw:'Steam Flow (T/hr)',Fin:'Total Coal Flow (T/hr)',
  Cba:'Unburnt C Bottom Ash (%)',Cfa:'Unburnt C Fly Ash (%)',
  Pfa:'% Fly Ash',Pba:'% Bottom Ash',
  M:'Moisture (%)',A:'Ash (%)',VM:'Volatile Matter (%)',
  FC:'Fixed Carbon (%)',GCV:'GCV (kcal/kg)',S:'Sulfur (%)',
  O2in:'O2 APH In (%)',CO2in:'CO2 APH In (%)',COin:'CO APH In (ppm)',
  O2out:'O2 APH Out (%)',CO2out:'CO2 APH Out (%)',COout:'CO APH Out (ppm)',
  Tgi:'FG Temp APH In (°C)',Tgo:'FG Temp APH Out (°C)',
  Tpai:'PA Temp In (°C)',Tpao:'PA Temp Out (°C)',
  Tsai:'SA Temp In (°C)',Tsao:'SA Temp Out (°C)',
  Fsa:'SA Flow (TPH)',Fpa:'PA Flow (TPH)',Tref:'Ambient Temp (°C)',
  Md:'Moisture Design (%)',Ad:'Ash Design (%)',VMd:'VM Design (%)',FCd:'FC Design (%)',
  Cd:'Carbon Design (%)',Sd:'Sulfur Design (%)',Hd:'Hydrogen Design (%)',
  Md2:'Moisture Design Ultimate (%)',Nd:'Nitrogen Design (%)',Od:'Oxygen Design (%)',
  Ad2:'Ash Design Ultimate (%)',GCVd:'GCV Design (kcal/kg)',
  Trad:'Ref Air Temp Design (°C)',Mwvd:'Moisture in Air Design (kg/kg)'
};
const g = (obj, id) => { const n = parseFloat(obj[id]); return isNaN(n) ? 0 : n; };

// Plain object snapshot of every input currently sitting in the form
// (used by the no-process / "normal" path — identical to what collectInputs()
// used to read straight off the DOM).


// Mirrors autoCalcCO2() + autoCalcDesignUltimate() below, but on a plain
// {id: value} object instead of the DOM — this is what lets a per-process
// result be computed without repeatedly overwriting the shared form fields.
function computeDerivedInputs(raw) {
  const inputs = { ...raw };
  const O2in = g(inputs,'O2in'), O2out = g(inputs,'O2out');
  inputs.CO2in  = 19.3 - O2in;
  inputs.CO2out = 19.3 - O2out;

  const Md = g(inputs,'Md'), Ad = g(inputs,'Ad'), VMd = g(inputs,'VMd'),
        FCd = g(inputs,'FCd'), Sd = g(inputs,'Sd');
  const FcDc = FCd / (1 - (1.1*Ad/100) - (Md/100));
  const VmDf = 100 - FcDc;
  const Cdf  = FcDc + 0.9*(VmDf - 14);
  const Hdf  = VmDf * ((7.35/(VmDf+10)) - 0.013);
  const Ndf  = 2.1 - (0.012*VmDf);
  const k    = (VMd + FCd) / (VmDf + FcDc);

  inputs.Cd  = Cdf * k;
  inputs.Hd  = Hdf * k;
  inputs.Nd  = Ndf * k;
  inputs.Md2 = Md;
  inputs.Ad2 = Ad;
  inputs.Od  = 100 - inputs.Cd - Sd - inputs.Hd - inputs.Md2 - inputs.Nd - inputs.Ad2;
  return inputs;
}

// ── Core calculation (pure — takes a plain {id: value} object, returns the
//    results object; no DOM reads/writes) ────────────────────────────────────
// NOTE: this follows the CENPEEP / IS 8753 "indirect (heat loss) method" —
// O2-based excess air, empirical proximate→ultimate regression, fixed
// 1.09% radiation loss, fixed 20/80 bottom/fly ash split — matching the
// reference "Boiler Efficiency Calculation by Heat Loss Method" workbook
// (Efficiency overall / Effi. >570 sheets) formula-for-formula, so results
// reproduce the workbook to the same input data. This replaced an earlier
// CO2/Ostwald-based formulation that used a different (non-CENPEEP) loss
// methodology and did not reconcile with the workbook.
function runCalculation(rawInputs) {
  const inputs = computeDerivedInputs(rawInputs);
  const gv = id => g(inputs, id);

  const M=gv('M'),A=gv('A'),VM=gv('VM'),FC=gv('FC'),GCV=gv('GCV');
  const S=gv('S') || 0.3;                 // workbook fixes Sulphur at 0.3% (D13/E13)
  const O2in=gv('O2in'),O2out=gv('O2out'),COout=gv('COout'),COin=gv('COin');
  const Tgi=gv('Tgi'),Tgo=gv('Tgo'),Tpai=gv('Tpai'),Tpao=gv('Tpao');
  const Tsai=gv('Tsai'),Tsao=gv('Tsao'),Fsa=gv('Fsa'),Fpa=gv('Fpa');
  const Cba=gv('Cba'),Cfa=gv('Cfa');
  const Pfa=gv('Pfa') || 80, Pba=gv('Pba') || 20;   // workbook's fixed fly/bottom ash split (0.8 / 0.2)
  const Lrad=gv('Lrad') || 1.09;          // workbook fixes Radiation & Unaccounted Loss at 1.09% (D41/E41)
  const Trad=gv('Trad') || 35;            // design/reference ambient air temp (D27/E27, fixed 35°C)
  const Cp=30.6, CVc=8077.8, Mwv=0.0166;
  const COoutp=(COout/1000000)*100;       // convert ppm -> % (workbook's CO term is a %)

  // Ultimate analysis — empirical regression from Proximate Analysis (AFB),
  // matching Efficiency overall!D11:D15 exactly.
  const Ca=0.97*FC+0.7*(VM+0.1*A)-M*(0.6-0.01*M);
  const H =0.036*FC+0.086*(VM-0.1*A)-0.0035*M*M*(1-0.02*M);
  const N =2.1-0.02*VM;
  const O =100-M-A-Ca-H-S-N;

  // Reference/ambient air temp = SA-inlet temp reading directly (no PA blend) — matches D28/E28.
  const Trai=Tsai;

  // CO2 at APH outlet from the workbook's O2-based relation (D17='18.5-O2out').
  const CO2in=19.3-O2in;   // kept for the design-correction branch below (unchanged there)
  const CO2out=18.5-O2out;
  const N2out=100-(O2out+CO2out+COoutp);

  // Ash & carbon — unburnt-in-ash uses the fixed 20% bottom / 80% fly split.
  const Cash=Pfa/100*Cfa+Pba/100*Cba, U=A/100*Cash/(100-Cash);

  // Air Heater Leakage & corrected APH-outlet gas temperature (D23:D25).
  const AL=(O2out-O2in)/(21-O2out)*0.9*100;
  const Tc0=(AL*0.24*(Tgo-Trai))/(100*0.13286)+Tgo;
  const Tgc=(Trad*(Tgi-Tc0)+Tgi*(Tc0-Trai))/(Tgi-Trai);
  const dT=Tgc-Trad;

  // Theoretical Air Requirement & Actual Air Supplied (D32:D35).
  const TAR=((11.6*Ca)+(34.8*(H-O/8))+(4.35*S))/100;
  const EA=O2out/(21-O2out)*100;
  const AAS=(1+EA/100)*TAR;
  const MassDFG=(Ca/100)*44/12+(N/100)+AAS*77/100+(AAS-TAR)*23/100;

  // Losses L1..L7 (D36:D42) — kept under the app's existing Ldg/Luc/Lmf/Lhf/Lco/Lma/Lrad names.
  const Ldg=MassDFG*0.24*dT/GCV*100;                              // L1 Dry Flue Gas
  const Lhf=9*(H/100)*(584+0.45*dT)/GCV*100;                      // L2 Hydrogen in Fuel
  const Lmf=(M/100)*(584+0.45*dT)/GCV*100;                        // L3 Moisture in Fuel
  const Lma=AAS*0.01765*0.45*dT/GCV*100;                          // L4 Moisture in Air
  const Lco=(CO2out+COoutp)>0 ? (COoutp*Ca/100/(COoutp+CO2out))*5744/GCV*100 : 0; // L5 CO
  const Luc=((A*Pba/100*Cba)/(100*(100-Cba))+(A*Pfa/100*Cfa)/(100*(100-Cfa)))*8084*100/GCV; // L7 Unburnt combustibles
  const BoilerEff=100-(Ldg+Lhf+Lmf+Lma+Lco+Lrad+Luc);

  // Kept for the "Intermediate Values" panel and the design-correction branch below.
  const Sa=(2.66*(Ca-U*100)+7.937*H+0.996*S-O)/23.2;
  const Ea=1+(O2out-COoutp/2)/(0.2682*N2out-(O2out-COoutp));
  const Ma=Sa*Ea*Mwv;
  const Wd=(Ca+S/2.67-100*U)/(12*CO2out);
  const Sh=Wd*Cp*(Tgo-Trai), Sw=1.88*(Tgo-25)+2442+4.2*(25-Trai);
  const Tgnl=Tc0;

  // Design conditions (separate "correct-to-design-coal" branch, unrelated to
  // the workbook's Corrected column — see comment on BoilerEffCorr below).
  const Cd=gv('Cd'),Sd=gv('Sd'),Hd=gv('Hd'),Od=gv('Od');
  const Ad2=gv('Ad2'),GCVd=gv('GCVd'),Mwvd=gv('Mwvd');
  const Md=gv('Md2');
  const CVco=2415;

  // Corrected gas temp
  const ALd=(CO2in-CO2out)*0.9*100/CO2out;
  const Tgcd=(Trad*(Tgi-Tgo)+Tgi*(Tgo-Trai))/(Tgi-Trai);

  // Corrected losses
  const Wdc=(Cd+Sd/2.67-100*U)/(12*CO2out);
  const Shc=Wdc*Cp*(Tgcd-Trad);
  const Ldgc=Shc*100/(GCVd*4.186);

  const Kc=Math.exp(0.225*Cd/Hd)-Math.exp(0.225*Ca/H);
  const V_corr=(gv('VMd')<17)?0.013*(Ad2*GCV/(A*GCVd))*Kc:0;
  const Lucc=Luc*((Ad2*GCV)/(A*GCVd))+V_corr;

  const Swd=1.88*(Tgcd-25)+2442+4.2*(25-Trad);
  const Lmfc=Swd*Md/(GCVd*4.186);
  const Lhfc=9*Hd*Swd/(GCVd*4.186);
  const Lcoc=COoutp*7*CVco*(Cd-100*U)/3/(CO2out+COoutp)/GCVd;

  const Sad=(2.66*(Cd-U*100)+7.937*Hd+0.996*Sd-Od)/23.2;
  const Ead=1+(O2out-COoutp/2)/(0.2682*N2out-(O2out-COoutp));
  const Mad=Sad*Ead*Mwvd;
  const Lmac=Mad*1.88*(Tgcd-Trad)*100/(GCVd*4.186);

  const BoilerEffCorr=100-(Ldgc+Lucc+Lmfc+Lhfc+Lcoc+Lmac+Lrad);

  return {
    CO2in,CO2out,COoutp,Trai,Cash,U,
    N2out,Sa,Ea,Ma,Wd,Sh,Sw,
    Ldg,Luc,Lmf,Lhf,Lco,Lma,Lrad,BoilerEff,
    AL,Tgnl,Tgc,ALd,Tgcd,Ldgc,Lucc,Lmfc,Lhfc,Lcoc,Lmac,BoilerEffCorr,
    inputs: INPUT_IDS.map(id => ({ id, label: INPUT_LABELS[id] || id, value: inputs[id] })),
  };
}

export { INPUT_IDS, INPUT_LABELS, g, computeDerivedInputs, runCalculation };
