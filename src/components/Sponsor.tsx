import { currentSponsor } from "@/lib/data";
import Image from "next/image";

export function SponsorBanner() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 p-4">
        <div className="relative w-12 h-12">
          <Image src={currentSponsor.logo} alt={currentSponsor.name} fill className="object-cover rounded-full" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">Weekly Sponsor: {currentSponsor.name}</h3>
          <p className="text-sm text-muted-foreground">{currentSponsor.message}</p>
        </div>
        <a href={currentSponsor.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
          Learn More →
        </a>
      </div>
    </div>
  );
}
