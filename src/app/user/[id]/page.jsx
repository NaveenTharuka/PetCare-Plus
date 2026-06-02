import PetCard from '@/components/PetCard';
import getUserById from '@/apiServices/user.api';
import Link from 'next/link';

export default async function UserProfile({ params }) {
  const { id } = await params;
  const user = await getUserById(id);
  const pets = user?.pets;

  return (
    user ? (

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        {/* Profile Header Section */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-high shadow-xl rotate-2 max-w-[320px] mx-auto lg:mx-0">
              <img
                alt={`portrait of ${user.name}`}
                className="w-full h-full object-cover -rotate-2 scale-110"
                src={user.image_url || "https://picsum.photos/500/500"}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:right-4 bg-tertiary-container p-4 rounded-lg shadow-lg">
              <span className="material-symbols-outlined text-on-tertiary-container text-3xl" data-icon="verified_user">verified_user</span>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-center h-full">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface tracking-tight">{user.name}</h1>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-surface-container-lowest px-6 py-3 rounded-full flex items-center gap-3 border border-outline-variant/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary" data-icon="mail">mail</span>
                  <span className="font-medium text-on-surface-variant">{user.email}</span>
                </div>
                <div className="bg-surface-container-lowest px-6 py-3 rounded-full flex items-center gap-3 border border-outline-variant/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary" data-icon="call">call</span>
                  <span className="font-medium text-on-surface-variant">{user.phone}</span>
                </div>
                <div className="bg-surface-container-lowest px-6 py-3 rounded-full flex items-center gap-3 border border-outline-variant/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary" data-icon="home_pin">home_pin</span>
                  <span className="font-medium text-on-surface-variant">{user.address}</span>
                </div>
                <div className="bg-surface-container-lowest px-6 py-3 rounded-full flex items-center gap-3 border border-outline-variant/20 shadow-sm">
                  <span className="material-symbols-outlined text-primary" data-icon="calendar_today">calendar_today</span>
                  <span className="font-medium text-on-surface-variant">Joined June 2021</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar: Quick Insights */}
          <aside className="lg:w-1/3">
            <div className="bg-surface-container-low p-8 rounded-lg border border-outline-variant/10 sticky top-32">
              <h3 className="font-headline text-xl font-bold mb-6 text-on-surface">Quick Insights</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary-container" data-icon="pets">pets</span>
                    </div>
                    <span className="font-medium text-on-surface-variant">Total Pets</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{pets.length}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Panel: Pet List */}
          <div className="lg:w-2/3 space-y-8">
            <div className="flex justify-between items-center px-2">
              <h2 className="font-headline text-3xl font-bold text-on-surface">Your Furry Family</h2>
              <Link href={`/user/${user.id}/pets/new`} className="flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-all">
                <span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
                <span>Add New Pet</span>
              </Link>
            </div>

            {pets.length > 0 ? (
              pets.map((pet) => (
                <PetCard key={pet.id} {...pet} />
              ))
            ) : (
              <p className="text-on-surface-variant">No pets found</p>
            )}
          </div>
        </div>
      </main>
    ) : (
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="font-headline text-5xl md:text-xl font-extrabold text-on-surface tracking-tight">User Not Found</h1>
        </div>
      </main>
    )
  )
}