import { ShieldCheck } from 'lucide-react'

export default function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <ShieldCheck size={20} />
      </div>

      <div>
        <strong>
          PharmaTrace<span>-AI</span>
        </strong>

        <small>SUPPLY CHAIN INTELLIGENCE</small>
      </div>
    </div>
  )
}