import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <Button variant="default" size="lg" className="bg-foodhub-maroon text-white hover:bg-orange-600">
       Default Button
     </Button>
    </div>
  );
}
