import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'dish',
  title: 'Dishes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Dish Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Dish description',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of the dish',
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price of the dish in USD',
      validation: (rule) => rule.required().positive(),
    }),
  ],
});
