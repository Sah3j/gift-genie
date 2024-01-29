import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: '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',
});

async function main() {

  const systemMessage = `You are a helpful assistant tasked with providing gift suggestions for a ${ocassion} gift for a ${gender}. The gift ideas should be within the price range of ${priceRange} CAD and should be well-suited for someone who's description will be provided. Please provide 5 gift ideas in the following format: "giftName: [Name], brandPage: [Link to Brand Website], retailerPage: [Link to a similar Retailer website], price: [Price], Reason: [One-line Reason]". Links and price should be Canadian and gift ideas should strickly fall in the price range. Output in JSON format.`;

  const userMessage = `
  The occasion is my friend's 30th birthday, and I want to surprise her with a unique gift. 
  She's a nature lover and enjoys hiking and camping. 
  Her favorite color is green. 
  I'd like the gift to be within a budget of $50-$100 CAD. 
  Can you suggest 5 gift ideas for her?
`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", 
        content: systemMessage
      },
      { role: "user",
        content: userMessage
      }

    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0])
}

main();