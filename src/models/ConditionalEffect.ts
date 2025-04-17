export class ConditionalEffect {
    triggerEffect: string;
    resultingEffect: string;
    secondaryCondition?: string;
    secondaryMustExist?: boolean;
  
    constructor(
      triggerEffect: string,
      resultingEffect: string,
      secondaryCondition?: string,
      secondaryMustExist?: boolean
    ) {
      this.triggerEffect = triggerEffect;
      this.resultingEffect = resultingEffect;
      this.secondaryCondition = secondaryCondition;
      this.secondaryMustExist = secondaryMustExist;
    }
  }