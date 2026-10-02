import Image from "next/image";
import { imageSrc } from "@/(core)/sanity/lib/image";
import type { Person } from "@/types/sanity";

// Name, role and company, with an optional round photo
export function Author({ person, avatar = true, className = "" }: { person: Person; avatar?: boolean; className?: string }) {
  const src = avatar ? imageSrc(person.photo, 160) : undefined;
  const role = [person.role, person.company].filter(Boolean).join(", ");
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {src && <Image src={src} alt={person.photo?.alt ?? ""} width={64} height={64} className="size-14 shrink-0 rounded-full object-cover" />}
      <div>
        <p className="font-medium">{person.name}</p>
        {role && <p className="text-sm opacity-65">{role}</p>}
      </div>
    </div>
  );
}
