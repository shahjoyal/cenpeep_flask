"""
IS-13890 field-classifier tests.   Run:  python -m pytest tests -q    (or: python tests/test_is13890_ml.py)

HELD_OUT labels are deliberately NOT in ml/training_data_is13890.py (the test
asserts that), so the accuracy figure is a genuine generalisation measure, not
a memory test. `None` means "must NOT be read as an input field".
"""
import os, sys, warnings
warnings.filterwarnings("ignore")
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ml.field_classifier import IS13890_CONFIDENCE_THRESHOLD, get_is13890_classifier
from ml.training_data_is13890 import get_training_data, get_field_ids

HELD_OUT = [
    # fresh wordings, as they might appear on other plants' sheets
    ("ASH % (AF)", "A"), ("Ash in bagasse (lab)", "A"), ("Volatile Matter (dry)", "VM"), ("Vol matter %", "VM"),
    ("Moisture in bagasse %", "M"), ("Total Moisture (AR)", "M"), ("Fixed carbon in fuel", "FC"),
    ("GCV of bagasse sample", "GCV"), ("Gross heat value kcal/kg", "GCV"), ("GCV on as-received basis", "GCV"),
    ("Flue gas temperature APH outlet", "T"), ("FG temp at APH O/L", "T"), ("Stack temp", "T"),
    ("Dry bulb temperature (ambient)", "Tdb"), ("Ambient dry-bulb temp", "Tdb"),
    ("WBT ambient", "Twb"), ("Wet-bulb temp ambient", "Twb"),
    ("O2 (%) at air-heater inlet", "O2"), ("O2 measured in flue gases", "O2"), ("Carbon dioxide percentage, flue gas", "CO2"),
    ("CO (%) at APH inlet duct", "CO"), ("Nitrogen content flue gas", "N2"), ("N2 (balance)", "N2"),
    ("Boiler steam flow rate kg/h", "BL"), ("Steam generated, tonnes per hour", "BL"),
    ("Evap. ratio", "ER"), ("Steam/bagasse ratio", "ER"),
    ("Atomising steam, kg/h", "Wze"), ("LOI - bottom ash", "UBA"), ("LOI-Fly ash %", "UFA"),
    ("Fly ash carbon (unburnt)", "UFA"), ("Sulphur in fuel", "S"), ("Fuel sulfur content", "S"),
    # must be rejected: calculated rows, headings, look-alikes from other standards
    ("Loss due to dry gas", None), ("Total loss (kcal/kg)", None), ("Efficiency (%)", None),
    ("Weight of dry refuse", None), ("Main steam temp", None), ("Feed water flow TPH", None),
    ("Flue gas inlet temp", None), ("Remarks / notes", None), ("Sl. No.", None),
]


def test_held_out_labels_are_really_held_out():
    train = {t.lower() for t in get_training_data()[0]}
    leaked = [l for l, _ in HELD_OUT if l.lower() in train]
    assert not leaked, f"these 'held-out' labels are in the training set: {leaked}"


def test_held_out_accuracy():
    clf = get_is13890_classifier()
    preds = clf.predict_batch([l for l, _ in HELD_OUT], threshold=IS13890_CONFIDENCE_THRESHOLD)
    misses = [(l, exp, p, round(s, 2)) for (l, exp), (p, s, _m) in zip(HELD_OUT, preds) if p != exp]
    acc = 1 - len(misses) / len(HELD_OUT)
    print(f"\nheld-out accuracy: {acc:.0%} ({len(HELD_OUT) - len(misses)}/{len(HELD_OUT)})")
    for m in misses:
        print("  miss:", m)
    assert acc >= 0.90, misses


def test_calculated_rows_never_become_inputs():
    clf = get_is13890_classifier()
    calc_rows = ["Carbon", "Hydrogen", "Nitrogen", "Oxygen", "Bagasse Consumption", "Loss due to Dry flue gas",
                 "Total Loss %", "Boiler Efficiency", "Ambient Temp (Dry bulb + Wet bulb)/2",
                 "Enthalpy of saturated liquid at t", "kg of moisture/kg of AF fuel"]
    for lab, (p, s, _m) in zip(calc_rows, clf.predict_batch(calc_rows, threshold=IS13890_CONFIDENCE_THRESHOLD)):
        assert p is None, f"{lab!r} was read as input {p} ({s:.2f})"


def test_all_19_fields_have_training_examples():
    assert len(get_field_ids()) == 19


if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn(); print("ok", name)
