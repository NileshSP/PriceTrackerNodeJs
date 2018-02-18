import { prompt, Questions, Answers  } from "inquirer";
import { PriceTracker } from "./extensions";
import extensions = PriceTracker.extensions;

export abstract class userInput{
    constructor() {

    }
    
    //function to get responses from user
    static async getUserInputAsync(question: string, defaultAnswer: string|null) {
        let answer = "";
        try {
            const query = [
                {
                    name: 'question',
                    type: 'input',
                    message: `${question} :`,
                    default: defaultAnswer,
                    validate: (ans: string) => {
                        if(ans.length) {
                            return true;
                        }
                        else
                        {
                            return `Please try again : `;
                        }
                    }
                }
            ];
            
            answer = (await prompt(query)).question;            
        } catch (error) {
            extensions.logMessagesAsync("",error);                            
        }
        finally{
            return answer;
        }
    }
}