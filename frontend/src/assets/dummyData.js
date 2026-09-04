export const dummyPosts = [

  {
    id: 1,
    username: 'oceanlover22',
    imageUrl: 'https://placehold.co/600x400/0E9488/F4F8FB?text=Post+1',
    description: 'Golden hour at the harbour today 🌅',
    hashtags: ['#sunset', '#harbour'],
    comments: [
      { id: 1, username: 'sarahk', text: 'Stunning shot!' },
      { id: 2, username: 'mike_t', text: 'Where is this?' },
    ],
    likes: 24,
    createdAt: '2026-08-30T10:00:00Z',
  },
  {
    id: 2,
    username: 'travelwithnile',
    imageUrl: 'https://placehold.co/600x400/2166B5/F4F8FB?text=Post+2',
    description: 'Found this hidden cove on our trip.',
    hashtags: ['#travel', '#ocean'],
    comments: [{ id: 3, username: 'oceanlover22', text: 'Adding to my list!' }],
    likes: 41,
    createdAt: '2026-08-29T14:30:00Z',
  },
  {
    id: 3,
    username: 'photobyzee',
    imageUrl: 'https://placehold.co/600x400/0B1150/F4F8FB?text=Post+3',
    description: 'Testing out a new lens.',
    hashtags: ['#photography'],
    comments: [],
    likes: 8,
    createdAt: '2026-08-28T09:15:00Z',
  },

];

export const dummyUser = {

  id: '1',
  username: 'oceanlover22',
  fullName: 'Nile Muhammad',
  bio: 'Photographer chasing golden hour and good waves.',
  avatarUrl: 'https://placehold.co/150x150/2166B5/F4F8FB?text=PFP',
  links: ['https://instagram.com/oceanlover22'],
  
};

export const dummyFriends = [

  {
    id: '2',
    username: 'travelwithnile',
    fullName: 'Zee Travels',
    avatarUrl: 'https://placehold.co/80x80/0E9488/F4F8FB?text=ZT',
  },
  {
    id: '3',
    username: 'photobyzee',
    fullName: 'Zee Photography',
    avatarUrl: 'https://placehold.co/80x80/0B1150/F4F8FB?text=PZ',
  },

];