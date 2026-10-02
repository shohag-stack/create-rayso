import {
  BarChart3,
  Calendar,
  Clock,
  Coffee,
  Gift,
  Globe,
  Heart,
  Leaf,
  Lock,
  Map,
  MessageCircle,
  ScanLine,
  Search,
  Shield,
  Sparkles,
  Star,
  Sun,
  Users,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

// The icon set editors pick from (studio/schemaTypes/fields/section.ts iconOptions)
const icons: Record<string, LucideIcon> = {
  search: Search,
  sparkles: Sparkles,
  scan: ScanLine,
  zap: Zap,
  shield: Shield,
  heart: Heart,
  star: Star,
  leaf: Leaf,
  globe: Globe,
  clock: Clock,
  users: Users,
  chart: BarChart3,
  calendar: Calendar,
  map: Map,
  chat: MessageCircle,
  lock: Lock,
  gift: Gift,
  sun: Sun,
  wave: Waves,
  coffee: Coffee,
};

export function IconByName({ name, className = "size-5", strokeWidth = 1.5 }: { name?: string; className?: string; strokeWidth?: number }) {
  const Icon = name ? icons[name] : undefined;
  return Icon ? <Icon aria-hidden className={className} strokeWidth={strokeWidth} /> : null;
}
