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
