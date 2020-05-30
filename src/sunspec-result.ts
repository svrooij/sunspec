import { SunspecStatus } from "./sunspec-status";

export interface SunspecResult {
   manufacturer:string;
   model: string;
   serial: string;
   version: string;

    did: number;
    temperature: number;
    lifetimeProduction: number;
    status: SunspecStatus;
    acTotalCurrent: number;
    acCurrentPhaseA: number;
    acCurrentPhaseB: number;
    acCurrentPhaseC: number;

    acPower: number;
    acFrequency: number;

    apparentPower: number;
    reactivePower: number;
    powerFactor: number;

    dcCurrent: number;
    dcVoltage: number;
    dcPower: number;
}