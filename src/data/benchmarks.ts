// JCache JMH results (Zipfian workload). These are the measured numbers from the
// project's benchmark suite: don't add a row here unless it was actually measured.

export interface BenchRow {
  label: string;
  value: number;
  /** The variant being argued for; it's drawn in the accent colour */
  highlight?: boolean;
}

export interface BenchPanel {
  title: string;
  unit: string;
  max: number;
  format: (v: number) => string;
  rows: BenchRow[];
}

export const jcacheBenchmarks: BenchPanel[] = [
  {
    title: 'Hit rate, skewed (Zipfian) access',
    unit: '%',
    max: 100,
    format: (v) => `${v}%`,
    rows: [
      { label: 'LRU', value: 76 },
      { label: 'ARC', value: 87, highlight: true },
    ],
  },
  {
    title: 'Throughput by locking strategy',
    unit: 'M ops/sec',
    max: 5,
    format: (v) => `${v}M ops/s`,
    rows: [
      { label: 'Coarse lock', value: 1.1 },
      { label: '16 segments', value: 4.8, highlight: true },
    ],
  },
];
