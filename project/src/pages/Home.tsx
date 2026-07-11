import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import FeaturedJobs from '../components/home/FeaturedJobs';
import Categories from '../components/home/Categories';
import TopCompanies from '../components/home/TopCompanies';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import { jobs } from '../data/jobs';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedJobs jobs={jobs} />
      <Categories />
      <TopCompanies />
      <Testimonials />
      <Newsletter />
    </>
  );
}
