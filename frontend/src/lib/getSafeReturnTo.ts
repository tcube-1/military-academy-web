export default function getSafeReturnTo(value: string | null) {
  if (!value) return '/';

  if (!value.startsWith('/')) return '/';

  if (value.startsWith('//')) return '/';

  return value;
}
