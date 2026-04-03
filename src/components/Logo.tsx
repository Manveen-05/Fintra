import logoImg from '../assets/logo.png';

export default function Logo({ className }: { className?: string }) {
  return (
    <img 
      src={logoImg} 
      alt="Fintra Logo" 
      className={className}
      style={{ width: '44px', height: '44px', borderRadius: '12px' }}
    />
  );
}
