export interface ConfigI {
  field?: {
    size?: number;
    textSize?: number;
    color?: string;
    activeColor?: string;
    validColor?: string;
    backgroudColor?: string;
    activeBackgroudColor?: string;
    validBackgroudColor?: string;
  },
  scanword?: {
    backgroudColor?: string;
  }
}

export const CONFIG: ConfigI = {
  field: {
    size: 36,
    textSize: 16,
    color: '#000',
    activeColor: '#000',
    validColor: '#65B741',
    backgroudColor: 'white',
    activeBackgroudColor: '#F6F193',
    validBackgroudColor: 'transparent',
  },
  scanword: {
    backgroudColor: '#747264',
  },
}
