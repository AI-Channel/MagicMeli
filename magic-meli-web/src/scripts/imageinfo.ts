import { ref, type Ref } from 'vue'

interface imgObj {
  src: string
  title?: string
  alt?: string
}
const EmptyImageSet: Ref<imgObj[]> = ref([
  {
    src: '/src/assets/graphs/Image Not Found.png',
    title: 'Image Not Found'
  }
])
const fanartImages: Ref<imgObj[]> = ref([
  {
    src: '/src/assets/graphs/Rebecca.jpg',
    title: 'Rebecca'
  },
  {
    src: '/src/assets/graphs/Lucy.jpg',
    title: 'Lucy'
  },
  {
    src: '/src/assets/graphs/Edgerunners.jpg',
    title: ''
  },
  {
    src: '/src/assets/graphs/Edgerunners-in-Afterlife.jpg',
    title: ''
  },
  {
    src: '/src/assets/graphs/David-and-Lucy.png',
    title: ''
  },
  {
    src: '/src/assets/graphs/Lucy-Cyberware.jpg',
    title: ''
  },
  {
    src: '/src/assets/graphs/David-and-Lucy-Moon.jpg',
    title: ''
  },
  {
    src: '/src/assets/graphs/Rebecca-Swimsuit.jpg',
    title: ''
  },
  {
    src: 'http://localhost:5000/image/079e7569-59ad-4e5b-9795-d1d99f9c7dc6/raw',
    title: 'test'
  }
])
function getImages(imageSet: string) {
  if (imageSet.toLowerCase() == 'fanart') {
    return fanartImages
  } else {
    return EmptyImageSet
  }
}
export { getImages }
export type { imgObj }
