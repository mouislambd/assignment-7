import {
  Home,
  Clock,
  BarChart3,
  UserPlus,
  Phone,
  MessageCircle,
  Video,
  Archive,
  Trash2,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  Heart,
  Mail,
  Star,
  Users,
  Activity,
  Bell,
  CircleArrowRight,
  Menu,
  X,
} from "lucide-react";

export function HomeIcon({ className = "h-4 w-4" }) {
  return <Home className={className} />;
}

export function TimelineIcon({ className = "h-4 w-4" }) {
  return <Clock className={className} />;
}

export function StatsIcon({ className = "h-4 w-4" }) {
  return <BarChart3 className={className} />;
}

export function AddFriendIcon({ className = "h-4 w-4" }) {
  return <UserPlus className={className} />;
}

export function CallIcon({ className = "h-5 w-5" }) {
  return <Phone className={className} />;
}

export function TextIcon({ className = "h-5 w-5" }) {
  return <MessageCircle className={className} />;
}

export function VideoIcon({ className = "h-5 w-5" }) {
  return <Video className={className} />;
}

export function SnoozeIcon({ className = "h-4 w-4" }) {
  return <Bell className={className} />;
}

export function MenuIcon({ className = "h-4 w-4" }) {
  return <Menu className={className} />;
}

export function XIcon({ className = "h-4 w-4" }) {
  return <X className={className} />;
}

export function ArchiveIcon({ className = "h-4 w-4" }) {
  return <Archive className={className} />;
}

export function DeleteIcon({ className = "h-4 w-4" }) {
  return <Trash2 className={className} />;
}

export function ArrowRightIcon({ className = "h-4 w-4" }) {
  return <CircleArrowRight className={className} />;
}

export function SearchIcon({ className = "h-4 w-4" }) {
  return <Search className={className} />;
}

export function FilterIcon({ className = "h-4 w-4" }) {
  return <Filter className={className} />;
}

export function CalendarIcon({ className = "h-4 w-4" }) {
  return <Calendar className={className} />;
}

export function HeartIcon({ className = "h-4 w-4" }) {
  return <Heart className={className} />;
}

export function MailIcon({ className = "h-4 w-4" }) {
  return <Mail className={className} />;
}

export function StarIcon({ className = "h-4 w-4" }) {
  return <Star className={className} />;
}

export function FriendsIcon({ className = "h-4 w-4" }) {
  return <Users className={className} />;
}

export function ActivityIcon({ className = "h-4 w-4" }) {
  return <Activity className={className} />;
}