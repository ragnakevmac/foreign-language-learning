export interface Texts {
  textToTranslate: string
  translatedText: string
}

export interface TextFormProps {
    onSubmitTexts: (texts: Texts) => void;
  }