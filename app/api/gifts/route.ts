import OpenAI from "openai";
import { NextResponse } from 'next/server'


const openai = new OpenAI({
  apiKey: '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',
});

export const POST = async (req: Request, res:Response) => {
  const body = await req.json();
  console.log(body)
  const ocassion = body.ocassion
  const gender = body.gender
  const priceRange = body.priceRange
  const age = body.age
  const description = body.description

  const systemMessage = `
  You are a helpful assistant tasked with providing gift suggestions considering the following factors: 
  ocassion, gender, age, price range and a breif description about the gift reciever that will be provided. 
  The gift ideas should be strictly within the price range and should be well-suited considering all the factors. 
  Provide 5 gift ideas in the following format: "giftName: [Name], brandPage: [Link to Brand Website Main page. Not the product page], retailerPage: [Link to a similar Retailer website homepage], price: [Price], Reason: [One-line Reason]". 
  Links and price should be Canadian and gift ideas should strickly fall in the price range. Output in JSON`;

  const userMessage = `
  ocassion: ${ocassion}, gender: ${gender}, age: ${age}, priceRange: ${priceRange},
  description: ${description}
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
    model: "gpt-3.5-turbo-1106",
    response_format: {"type": "json_object"}
  });

  return NextResponse.json( completion.choices[0].message.content )
}
