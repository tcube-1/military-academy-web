import pandas as pd, json, re, unicodedata

UP = '/mnt/user-data/uploads'
OUT = '/mnt/user-data/outputs'

def slugify(name):
    s = unicodedata.normalize('NFKD', str(name)).encode('ascii','ignore').decode()
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s

# ---------- DISTRICTS ----------
d = pd.read_excel(f'{UP}/Districtof_Specific_State_2026-08-25_17-08-00.xlsx', header=1)
d = d.rename(columns={'District Code':'code','District Name(In English)':'name'})
d['slug'] = d['name'].apply(slugify)
assert d['slug'].is_unique, "district slug collision"
assert d['code'].is_unique, "district code collision"

code_to_slug = dict(zip(d['code'], d['slug']))
code_to_name = dict(zip(d['code'], d['name']))

districts_out = []
for _, r in d.sort_values('name').iterrows():
    districts_out.append({
        "id": r['slug'],
        "name": r['name'],
        "stateId": "telangana",
        "lgdCode": str(r['code'])
    })

with open(f'{OUT}/districts.json','w',encoding='utf-8') as f:
    json.dump(districts_out, f, ensure_ascii=False, indent=2)

# ---------- MANDALS ----------
sd = pd.read_excel(f'{UP}/Sub_Districtof_Specific_State_2026-08-25_17-08-58.xlsx', header=1)
sd = sd.rename(columns={'District Code':'dcode','Sub-district Code':'code','Sub-district Name (In English)':'name'})
sd['base_slug'] = sd['name'].apply(slugify)

# disambiguate mandal slugs only where base_slug collides across the whole state
counts = sd['base_slug'].value_counts()
dupe_slugs = set(counts[counts > 1].index)

mandal_code_to_slug = {}
mandals_out = []
seen_slugs = set()
for _, r in sd.sort_values(['dcode','name']).iterrows():
    dslug = code_to_slug.get(r['dcode'])
    if dslug is None:
        raise ValueError(f"Mandal {r['name']} ({r['code']}) has unmapped district code {r['dcode']}")
    slug = r['base_slug']
    if slug in dupe_slugs:
        slug = f"{slug}-{dslug}"
    # final safety: ensure global uniqueness even after suffixing
    final_slug = slug
    n = 2
    while final_slug in seen_slugs:
        final_slug = f"{slug}-{n}"
        n += 1
    seen_slugs.add(final_slug)
    mandal_code_to_slug[r['code']] = final_slug
    mandals_out.append({
        "id": final_slug,
        "name": r['name'],
        "districtId": dslug,
        "lgdCode": str(r['code'])
    })

with open(f'{OUT}/mandals.json','w',encoding='utf-8') as f:
    json.dump(mandals_out, f, ensure_ascii=False, indent=2)

# ---------- VILLAGES ----------
v = pd.read_excel(f'{UP}/Villageof_Specific_State_2026-08-25_17-09-28.xlsx', header=1)
v = v.rename(columns={
    'District Code':'dcode',
    'Sub-District Code':'scode',
    'Village Code':'code',
    'Village Name (In English)':'name',
    'Village Status':'status',
    'Village Category':'category'
})
v['base_slug'] = v['name'].apply(slugify)
vcounts = v['base_slug'].value_counts()
vdupe_slugs = set(vcounts[vcounts > 1].index)

villages_out = []
seen_v_slugs = set()
skipped = []
for _, r in v.sort_values(['dcode','scode','name']).iterrows():
    dslug = code_to_slug.get(r['dcode'])
    mslug = mandal_code_to_slug.get(r['scode'])
    if dslug is None or mslug is None:
        skipped.append((r['name'], r['dcode'], r['scode']))
        continue
    slug = r['base_slug']
    if slug in vdupe_slugs:
        slug = f"{slug}-{mslug}"
    final_slug = slug
    n = 2
    while final_slug in seen_v_slugs:
        final_slug = f"{slug}-{n}"
        n += 1
    seen_v_slugs.add(final_slug)
    villages_out.append({
        "id": final_slug,
        "name": r['name'],
        "districtId": dslug,
        "mandalId": mslug,
        "lgdCode": str(r['code']),
        "status": r['status'],
        "category": r['category']
    })

with open(f'{OUT}/villages.json','w',encoding='utf-8') as f:
    json.dump(villages_out, f, ensure_ascii=False, indent=2)

print("districts:", len(districts_out))
print("mandals:", len(mandals_out))
print("villages:", len(villages_out))
print("skipped villages (unmapped FK):", len(skipped))
if skipped:
    print(skipped[:20])

# records per district
from collections import Counter
mc = Counter(m['districtId'] for m in mandals_out)
vc = Counter(vv['districtId'] for vv in villages_out)
print()
print(f"{'district':30s} {'mandals':>8s} {'villages':>9s}")
for r in districts_out:
    did = r['id']
    print(f"{did:30s} {mc.get(did,0):>8d} {vc.get(did,0):>9d}")
