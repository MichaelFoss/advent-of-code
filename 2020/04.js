const main = require('../utils/main.js');

class Passport {
  birthYear = undefined;
  issueYear = undefined;
  expirationYear = undefined;
  height = undefined;
  hairColor = undefined;
  eyeColor = undefined;
  passportId = undefined;
  countryId = undefined;

  constructor(s) {
    const parts = s.replace(/\n/gi, ' ').split(' ');
    parts.forEach(part => {
      const keyVal = part.split(':');
      switch (keyVal[0]) {
        case 'byr':
          this.birthYear = keyVal[1];
          break;
        case 'iyr':
          this.issueYear = keyVal[1];
          break;
        case 'eyr':
          this.expirationYear = keyVal[1];
          break;
        case 'hgt':
          this.height = keyVal[1];
          break;
        case 'hcl':
          this.hairColor = keyVal[1];
          break;
        case 'ecl':
          this.eyeColor = keyVal[1];
          break;
        case 'pid':
          this.passportId = keyVal[1];
          break;
        case 'cid':
          this.countryId = keyVal[1];
          break;
      }
    });
  }

  isValid(useStrict = false) {
    if (!useStrict) {
      return (
        this.birthYear !== undefined &&
        this.issueYear !== undefined &&
        this.expirationYear !== undefined &&
        this.height !== undefined &&
        this.hairColor !== undefined &&
        this.eyeColor !== undefined &&
        this.passportId !== undefined
      );
    }
    else {
      if (!this.isValid()) {
        return false;
      }
      const validBirthYear = Boolean(this.birthYear.match(/^[\d]{4}$/) && Number(this.birthYear) >= 1920 && Number(this.birthYear) <= 2020);
      const validIssueYear = Boolean(this.issueYear.match(/^[\d]{4}$/) && Number(this.issueYear) >= 2010 && Number(this.issueYear) <= 2020);
      const validExpirationYear = Boolean(this.expirationYear.match(/^[\d]{4}$/) && Number(this.expirationYear) >= 2020 && Number(this.expirationYear) <= 2030);
      const heightNum = Number(this.height.substring(0, this.height.length - 2));
      const validHeight = Boolean(
        this.height.match(/^[\d]+cm$/) && heightNum >= 150 && heightNum <= 193 ||
        this.height.match(/^[\d]+in$/) && heightNum >= 59 && heightNum <= 76
      );
      const validHairColor = Boolean(this.hairColor.match(/\#[0-9a-f]{6}$/));
      const validEyeColor = Boolean(this.eyeColor.match(/^amb|blu|brn|gry|grn|hzl|oth$/));
      const validPassportId = Boolean(this.passportId.match(/^[\d]{9}$/));

      const validStrict = (
        validBirthYear &&
        validIssueYear &&
        validExpirationYear &&
        validHeight &&
        validHairColor &&
        validEyeColor &&
        validPassportId
      );

/*
      console.log(
        `${validBirthYear}: validBirthYear\n` +
        `${validIssueYear}: validIssueYear\n` +
        `${validExpirationYear}: validExpirationYear\n` +
        `${validHeight}: validHeight\n` +
        `${validHairColor}: validHairColor\n` +
        `${validEyeColor}: validEyeColor\n` +
        `${validPassportId}: validPassportId\n` +
        `--------\n` +
        `${validStrict}: validStrict\n`
      );
*/

      return validStrict;
    }
  }
}

main(input => {
  const passportStrings = input.split('\n\n');
  const passports = passportStrings.map(s => new Passport(s));
  const validPassportCount = passports.reduce((sum, passport) => sum + (passport.isValid() ? 1 : 0), 0);
  const strictValidPassportCount = passports.reduce((sum, passport) => sum + (passport.isValid(true) ? 1 : 0), 0);
  return {
    part1: `${validPassportCount} / ${passports.length}`,
    part2: `${strictValidPassportCount} / ${passports.length}`,
  };
});
