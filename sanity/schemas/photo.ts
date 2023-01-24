import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(30),
    }),
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'retrato', value: 'retrato'},
          {title: 'paisaje', value: 'paisaje'},
          {title: 'edificio', value: 'edificio'},
          {title: 'random', value: 'random'},
        ],
        layout: 'dropdown',
      },
    },
  ],
})
