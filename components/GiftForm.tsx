'use client'

import React from 'react'
import { useState } from 'react'
import { Wand2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"

import { useForm, SubmitHandler } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

type Gift = {
  giftName: string,
  brandPage: string,
  retailerPage: string,
  price: string,
  Reason: string
}

type InputValues = {
  ocassion: string,
  gender: string,
  age: number,
  description: string,
  priceRange: string
}

type Props = {
  setGifts: React.Dispatch<React.SetStateAction<Array<Gift>>>;
  setCard: React.Dispatch<React.SetStateAction<string>>;
  setInputValues: React.Dispatch<React.SetStateAction<InputValues | undefined>>;
}

const formSchema = z.object({
  ocassion: z.string().min(2).max(50),
  gender: z.string(),
  age: z.number(),
  description: z.string(),
  priceRange: z.string()
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: Partial<FormValues> = {
  ocassion: "",
  gender: "Male",
  age: 25,
  description: "",
  priceRange: ""
}

const GiftForm: React.FC<Props> = ({ setGifts, setCard, setInputValues }) => {

  const [displayAge, setDisplayAge] = useState<Number>(25)
  const [displayPrice, setDisplayPrice] = useState<Array<Number>>([0,50])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  const onSubmit = async (data: InputValues) => {
    setCard("loading")
    setInputValues(data)
    try {
      const response = await fetch('/api/gifts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        const gifts = JSON.parse(result)
        console.log('API response:', gifts.giftIdeas);
        setGifts(gifts.giftIdeas)
        setCard("gifts")
      } else {
        console.error('API error:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
      <Card className='bg-transparent shadow-none border-0'>
        <CardHeader>
          <CardTitle>Start Your Gift Search</CardTitle>
          <CardDescription>Tell us more about the person you are gifting</CardDescription>
        </CardHeader>
        <CardContent className=''>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className='flex gap-2 justify-between'>
                <FormField 
                  control={form.control}
                  name="ocassion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ocassion</FormLabel>
                      <FormControl>
                        <Input placeholder="Birthday" {...field} className='text-base'/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className='text-base'>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='text-base'>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex justify-between'>
                      <div>Age</div>
                      <div>{String(displayAge)}</div>
                    </FormLabel>
                    <FormControl>
                      <Slider defaultValue={[25]} max={100} step={1} onValueChange={(e) => {field.onChange(e[0]); setDisplayAge(e[0])}}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell us more about the person you are gifting'
                        className='resize-none text-base'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Gifts generated will be revevent to the information you provide
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex justify-between'>
                      <div>Price</div>
                      <div>CAD {String(displayPrice[0])} - {String(displayPrice[1])}</div>
                    </FormLabel>
                    <FormControl>
                      <Slider defaultValue={[0, 50]} max={1000} step={25} onValueChange={(e) => {field.onChange(e.join('-')); setDisplayPrice(e)}}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className='flex'>
                <Button type="submit" className='flex text-lg gap-2 bg-purple-600 text-white hover:bg-purple-500 p-8 w-full'>
                  <div>
                    <Wand2 size={22}/>
                  </div>
                  Generate Gifts
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
  )
}

export default GiftForm