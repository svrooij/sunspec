export class SunspecConverter {
  public static computeWithFactor(value: number, factor: number): number {
    const decimals = SunspecConverter.int16(factor);
    const actualValue = value * SunspecConverter.factor(decimals);

    if(decimals < 0) {
      const rounding = Math.pow(10, decimals * -1)
      return Math.round(actualValue * rounding) / rounding;
    }
    return actualValue;
  }
  public static int16(uint: number): number {
    return (uint << 16) >> 16;
  }

  public static factor(int16: number): number {
    return Math.pow(10, int16)
  }

  /**
   * Convert a uint to 2 letters
   *
   * @static
   * @param {number} uint Value from a register
   * @returns {string}
   * @memberof SunspecConverter
   */
  public static chars(uint: number): string {
    if(uint === 0){
      return "";
    }

    // Sample input: 21359 becomes 'So'
    // Take the first letter by shifting 8 bytes 
    const first = uint >> 8; // holds 83 = ascii 'S'
    let last = uint % 256; // Take the remainder holds 111 = ascii 'o'
    if(last === 0) {
      return String.fromCharCode(first);
    }
    return String.fromCharCode(first, last);
  }

  /**
   * Converts multiple numbers containing a string to the original string
   *
   * @static
   * @param {number[]} uints
   * @returns {string}
   * @memberof SunspecConverter
   */
  public static string(uints: number[]): string {
    let output = "";
    uints.forEach(v => {
      output += SunspecConverter.chars(v);
    })
    return output.trim();
  }

}