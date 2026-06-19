export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Orange circle background */}
      <circle cx="50" cy="50" r="50" fill="#f97316" />

      {/* Sun */}
      <circle cx="50" cy="30" r="12" fill="#FFF9C4" />

      {/* Sun rays */}
      <line x1="50" y1="12" x2="50" y2="6"  stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="48" x2="50" y2="54" stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="30" x2="26" y2="30" stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" />
      <line x1="68" y1="30" x2="74" y2="30" stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="18" x2="34" y2="14" stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" />
      <line x1="62" y1="18" x2="66" y2="14" stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="42" x2="34" y2="46" stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" />
      <line x1="62" y1="42" x2="66" y2="46" stroke="#FFF9C4" strokeWidth="3" strokeLinecap="round" />

      {/* Godavari wave 1 */}
      <path
        d="M10 62 Q22 54 34 62 Q46 70 58 62 Q70 54 90 62"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Godavari wave 2 */}
      <path
        d="M10 75 Q22 67 34 75 Q46 83 58 75 Q70 67 90 75"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      {/* Godavari wave 3 */}
      <path
        d="M10 88 Q22 80 34 88 Q46 96 58 88 Q70 80 90 88"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
