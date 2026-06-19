export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pin shape */}
      <path d="M50 5C32.3 5 18 19.3 18 37C18 58.5 50 95 50 95C50 95 82 58.5 82 37C82 19.3 67.7 5 50 5Z" fill="#f97316"/>
      {/* Inner white circle */}
      <circle cx="50" cy="37" r="18" fill="white"/>
      {/* Clock hands / L shape representing LocalHelp */}
      <circle cx="50" cy="37" r="11" fill="#f97316"/>
      <rect x="48" y="27" width="3" height="11" rx="1.5" fill="white"/>
      <rect x="48" y="36" width="8" height="3" rx="1.5" fill="white"/>
    </svg>
  );
}
