export interface IProfileData {
  id: string;
  name: string | null;
  lastname: string | null;
  image: string | null;
  surveyAnswered: boolean;
  financialProfileResults: string | null;
  itemsSaved: string[];
};
