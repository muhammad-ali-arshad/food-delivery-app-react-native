import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'restaurant',
  title: 'Restaurants',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: (rule) => rule.max(200),
    }),

    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of the restaurant',
      options: {
        hotspot: true, // ✅ correct image handling
      },
    }),

    defineField({
      name: 'lat',
      type: 'number',
      title: 'Latitude of the restaurant',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'lng',
      type: 'number',
      title: 'Longitude of the restaurant',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'address',
      type: 'string',
      title: 'Restaurant address',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating (1 to 5)',
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(5)
          .error('Please enter a value between 1 and 5'),
    }),

    defineField({
      name: 'reviews',
      type: 'string',
      title: 'Reviews',
    }),

    defineField({
      name: 'type',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [
        {
          type: 'reference',
          to: [{ type: 'dish' }],
        },
      ],
    }),
  ],
});
