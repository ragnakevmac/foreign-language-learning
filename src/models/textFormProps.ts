export interface Texts {
  textToTranslate: string
  translatedText: string
  generatedTextEngVerFromWanikani: string
}

export interface TextFormProps {
    onSubmitTexts: (texts: Texts) => void;
  }