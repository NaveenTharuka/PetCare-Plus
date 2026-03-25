export default async function Services() {

    const res = await fetch("https://json-placeholder.mock.beeceptor.com/users");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div style={{ textAlign: "center", marginTop: "40px" }}>
                <h1 className="text-4xl font-bold text-brown-800 mb-8" style={{ color: "#92633a", fontFamily: "'Catamaran', sans-serif" }}>Our Services</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map(user => (
                    <div key={user.id} className="p-6 bg-white rounded-2xl shadow-sm border border-orange-100 hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-semibold mb-2" style={{ color: "#92633a" }}>{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}