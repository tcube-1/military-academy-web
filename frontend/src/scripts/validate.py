"""
Validation script for districts.json / mandals.json / villages.json
Run: python3 validate.py
Checks: id uniqueness, FK integrity (mandal->district, village->mandal/district), slug format.
"""
import json, re, sys

SLUG = re.compile(r'^[a-z0-9]+(-[a-z0-9]+)*$')

def load(path):
    with open(path) as f:
        return json.load(f)

def check_slugs(records, label):
    bad = [r['id'] for r in records if not SLUG.match(r.get('id',''))]
    if bad:
        print(f"  [FAIL] {label}: non-slug ids -> {bad[:10]}{' ...' if len(bad)>10 else ''}")
    else:
        print(f"  [OK]   {label}: all ids are valid slugs")

def check_dupes(records, label):
    ids = [r['id'] for r in records]
    dupes = set(x for x in ids if ids.count(x) > 1)
    if dupes:
        print(f"  [FAIL] {label}: duplicate ids -> {sorted(dupes)[:10]}")
    else:
        print(f"  [OK]   {label}: no duplicate ids ({len(ids)} records)")

def main():
    districts = load('districts.json')
    mandals = load('mandals.json')
    villages = load('villages.json')

    print(f"Counts: districts={len(districts)}  mandals={len(mandals)}  villages={len(villages)}\n")

    print("Slug format checks:")
    check_slugs(districts, 'districts')
    check_slugs(mandals, 'mandals')
    check_slugs(villages, 'villages')

    print("\nDuplicate checks:")
    check_dupes(districts, 'districts')
    check_dupes(mandals, 'mandals')
    check_dupes(villages, 'villages')

    print("\nForeign key checks:")
    district_ids = {d['id'] for d in districts}
    mandal_ids = {m['id'] for m in mandals}

    bad_mandal_fk = [m['id'] for m in mandals if m.get('districtId') not in district_ids]
    if mandals:
        print(f"  [{'FAIL' if bad_mandal_fk else 'OK'}]   mandals -> districtId: {len(bad_mandal_fk)} orphaned" if bad_mandal_fk else "  [OK]   mandals -> districtId: all valid")
    else:
        print("  [SKIP] mandals.json is empty (scaffold only)")

    bad_village_district_fk = [v['id'] for v in villages if v.get('districtId') not in district_ids]
    bad_village_mandal_fk = [v['id'] for v in villages if v.get('mandalId') not in mandal_ids]
    if villages:
        print(f"  [{'FAIL' if bad_village_district_fk else 'OK'}]   villages -> districtId: {len(bad_village_district_fk)} orphaned")
        print(f"  [{'FAIL' if bad_village_mandal_fk else 'OK'}]   villages -> mandalId: {len(bad_village_mandal_fk)} orphaned")
    else:
        print("  [SKIP] villages.json is empty (scaffold only)")

    # Cross-check village.districtId matches its mandal's districtId
    if villages and mandals:
        mandal_to_district = {m['id']: m['districtId'] for m in mandals}
        mismatches = [v['id'] for v in villages
                      if v.get('mandalId') in mandal_to_district
                      and mandal_to_district[v['mandalId']] != v.get('districtId')]
        print(f"  [{'FAIL' if mismatches else 'OK'}]   village.districtId matches parent mandal.districtId: {len(mismatches)} mismatches")

if __name__ == '__main__':
    main()
