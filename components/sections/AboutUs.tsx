import { getAboutUs } from '@/lib/sanity'
import AboutUsClient from './AboutUsClient'

export default async function AboutUs() {
  const data = await getAboutUs()
  return <AboutUsClient data={data} />
}