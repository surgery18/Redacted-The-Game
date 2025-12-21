
import { ChapterConfig } from '../types';
import { DAYS } from './days/index';

export { DAYS };

export const CHAPTERS: ChapterConfig[] = [
  {
    id: 'chap_1',
    number: 1,
    title: "THE EPSTEIN FILES",
    description: "A cache of flight logs and financial records has been recovered. High-profile names are implicated. Contain the fallout.",
    startDayIndex: 0,
    endDayIndex: 4
  },
  {
    id: 'chap_2',
    number: 2,
    title: "THE MARROW CLINIC",
    description: "Public scrutiny turns to our medical infrastructure. Ensure the 'experiments' look like standard care. Flag anomalies for internal review.",
    startDayIndex: 5,
    endDayIndex: 9
  },
  {
    id: 'chap_3',
    number: 3,
    title: "PROJECT LANTERN",
    description: "Surveillance operations are live. To maintain public trust, we must DECLASSIFY harmless data while burying the surveillance state.",
    startDayIndex: 10,
    endDayIndex: 14
  },
  {
    id: 'chap_4',
    number: 4,
    title: "TOTAL CONTROL",
    description: "The EIDOLON meme-hazard threatens reality. Contaminated documents must be VOIDED immediately. Sanitize the record.",
    startDayIndex: 15,
    endDayIndex: 19
  }
];
