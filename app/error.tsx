"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-svh place-items-center">
      <Container className="py-24">
        <p className="font-mono text-step-n1 tracking-[0.25em] text-tertiary uppercase">
          Fault detected
        </p>
        <h1 className="mt-6 font-display text-step-6 leading-[0.95] font-light tracking-[-0.02em]">
          The instrument tripped.
        </h1>
        <p className="mt-6 max-w-[42ch] text-step-0 leading-[1.6] text-secondary">
          Something failed on our side, not yours. A reset usually clears
          it.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button variant="ghost" onClick={() => reset()}>
            Reset and retry
          </Button>
          <Button variant="ghost" href="/">
            Back to SB-01
          </Button>
        </div>
      </Container>
    </main>
  );
}
