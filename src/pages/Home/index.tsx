import { useProjects } from '@/contexts/ProjectsContext';
import { ProjectCard } from '@/components/ProjectCard';
import { About } from '@/components/About';

export const Home = () => {
  const { projects } = useProjects();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[20%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <About />
      {/* Render projects  */}
      <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Top Submissions
      </h2>

      <div className="pageTop grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* {projects?.map((d, index) => (  */}
        {projects?.filter(d => d.donationAddress).map((d, index) => (
          <ProjectCard key={index} Project={d} />
        ))}
      </div>

      <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        All past Submissions
      </h2>

      <div className="pageTop">
        {projects?.map((d, index) => ( 
          <ProjectCard key={index} Project={d} />
        ))}
      </div>
    </main>
  );
};