import {
  PromiseModbus
} from './promise-modbus';
import {
  SunspecResult
} from './sunspec-result';
import {
  SunspecConverter
} from './sunspec-converter';
export class SunspecReader {
  private client: PromiseModbus;
  private data: Partial<SunspecResult> = {};
  constructor(private host: string, private port: number) {
    this.client = new PromiseModbus(host, port);
  }

  public async readInverterInfo(): Promise <Partial<SunspecResult>> {
    await this.client.waitOpenAsync();
    // Read the registers starting at 0 (= 40001) and read 69 items
    const result = await this.client.readHoldingRegisters(0, 69);
    // console.log('Converter info: ', result.data)
    return this.updateInfo(result.data);
  }

  public async readData(): Promise<Partial<SunspecResult>> {
    await this.client.waitOpenAsync();
    // Read the registers starting at 69 (= 40070) and read 40 items
    const result = await this.client.readHoldingRegisters(69, 40)
    return this.updateData(result.data);
  }

  private updateData(reading: number[]): Partial<SunspecResult> {
    // Replace override some value of this.data
    this.data = {
      ...this.data,
      ...{
        did: reading[0],
        lifetimeProduction: (reading[24] * Math.pow(2, 16)) + reading[25],
        temperature: SunspecConverter.computeWithFactor(reading[34], reading[37]),
        status: reading[38],
        acTotalCurrent: SunspecConverter.computeWithFactor(reading[2], reading[6]),
        acPower: SunspecConverter.computeWithFactor(reading[14], reading[15]),
        acFrequency: SunspecConverter.computeWithFactor(reading[16], reading[17]),
        apparentPower: SunspecConverter.computeWithFactor(reading[18], reading[19]),
        reactivePower: SunspecConverter.computeWithFactor(reading[20], reading[21]),
        powerFactor: SunspecConverter.computeWithFactor(reading[22], reading[23]),
        dcCurrent: SunspecConverter.computeWithFactor(reading[27], reading[28]),
        dcVoltage: SunspecConverter.computeWithFactor(SunspecConverter.int16(reading[29]), reading[30]),
        dcPower: SunspecConverter.computeWithFactor(reading[31], reading[32]),
      }
    }

    if (this.data === 103) { // add three phase data
      this.data = {
        ...this.data,
        ...{
          acCurrentPhaseA: SunspecConverter.computeWithFactor(reading[3], reading[6]),
          acCurrentPhaseB: SunspecConverter.computeWithFactor(reading[4], reading[6]),
          acCurrentPhaseC: SunspecConverter.computeWithFactor(reading[5], reading[6])
        }
      }
    }

    // console.log(this.data);

    // reading.forEach((val, i) => {
    //     console.log('Index %d (addr. %d) => %d', i, i + 70, val)
    // })

    return this.data;

  }

  private updateInfo(uints: number[]): Partial<SunspecResult> {
    // The info are strings saved as uints, so 2 letters in one number.
    // Slice takes a porting ot the string from start index until end index (excluding the item in end index)
    this.data = {
      ...this.data,
      ...{
        // manufacturer: SunspecConverter.chars(uints[4])
        manufacturer: SunspecConverter.string(uints.slice(4, 20)),
        model: SunspecConverter.string(uints.slice(20, 36)),
        version: SunspecConverter.string(uints.slice(44, 52)),
        serial: SunspecConverter.string(uints.slice(52, 68))
      }
    }

    return this.data;
  }
}