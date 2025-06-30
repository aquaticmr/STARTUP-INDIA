import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import SearchForm from "../components/SearchForm";
import Searchbtn from "../components/Searchbtn";
import { StartupCard } from "../components/StartupCard";
import { StartupTypeCard } from "../components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query;
  const params={search: query|| null};

  const Session=await auth();
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY,params });

 

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit your ideas, vote on pitches
        </p>
        <div className="search-form-container">
          <SearchForm query={query} />
          {query && <Searchbtn />}
        </div>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "Latest Pitches"}
        </p>
        <ul className="card_grid mt-7">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={index} post={post} />
            ))
          ) : (
            <p className="no-results">No startup found</p>
          )}


        </ul>
      </section>
      <SanityLive />
    </>
  );
}