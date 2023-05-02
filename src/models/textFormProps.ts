export interface Texts {
  textToTranslate: string
  translatedText: string
  generatedTextEngVerFromWanikani: string
  sliderValues: number | number[]
}

export interface TextFormProps {
    onSubmitTexts: (texts: Texts) => void;
    onHandleHint: (texts: Texts) => void;
    hint: string;
  }