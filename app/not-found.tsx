import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Mark } from "@/components/mark";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center">
      <Container className="py-24">
        <Mark size={40} colorway="ink" className="text-n-500" />
        <p className="mt-8 font-mono text-step-n1 tracking-[0.25em] text-tertiary uppercase">
          Signal lost
        </p>
        <h1 className="tnum mt-6 font-display text-step-7 leading-[0.92] font-bold tracking-[-0.03em]">
          404
        </h1>
        <p className="mt-6 max-w-[42ch] text-step-0 leading-[1.6] text-secondary">
          This address is outside the calibrated range. The instrument you
          want is on the main line.
        </p>
        <div className="mt-10">
          <Button href="/" variant="ghost">
            Back to SB-01
          </Button>
        </div>
      </Container>
    </main>
  );
}
